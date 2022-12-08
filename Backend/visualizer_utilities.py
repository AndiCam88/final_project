import pandas as pd
import os.path
import pandas as pd

def filter_dataframe(original_df, year_slider, keys_filter, tempo_slider, danceability, energy, valence, loudness):
    # Filter by year
    if(year_slider[0] <= 1900):
        year_slider[0] = 0
    fdf = original_df[original_df.year.between(year_slider[0], year_slider[1])]

    # Filter by key
    # TODO: Error when keys without representation are selected.
    keys_filter = [eval(i) for i in keys_filter]
    fdf = fdf[fdf["key"].isin(keys_filter)]

    # Filter by tempo
    if tempo_slider[1] >= 225:
        tempo_slider[1] = 500
    if tempo_slider[0] <= 50:
        tempo_slider[0] = 0
    fdf = fdf[fdf.tempo.between(tempo_slider[0], tempo_slider[1])]

    fdf = fdf[fdf.danceability.between(danceability[0] / 100, danceability[1] / 100)]
    fdf = fdf[fdf.energy.between(energy[0] / 100, energy[1] / 100)]
    fdf = fdf[fdf.valence.between(valence[0] / 100, valence[1] / 100)]
    fdf = fdf[fdf.loudness.between(loudness[0], loudness[1])]

    return fdf

def intial_convert_to_parquet(directory_str):
    if os.path.exists(f"{directory_str}/tracks_features.parquet"):
        return

    df = pd.read_csv(f'{directory_str}/tracks_features.csv', engine="pyarrow")
    df.to_parquet(f"{directory_str}/tracks_features.parquet")

def load_data(directory_str):

    # Remove potential trailing slash. We are going to put it in ourselves
    if directory_str[-1] == '/' or directory_str[-1] == '\\':
        directory_str = directory_str[:-1]

    intial_convert_to_parquet(directory_str)

    table = pd.read_parquet(f'{directory_str}/tracks_features.parquet', engine="fastparquet")

    # Get rid of year 0 stuff
    table = table[table.year != 0]

    # Convert milliseconds to seconds
    table["duration"] = table["duration_ms"].apply(lambda x: x/1000)

    # Drop the ms column
    table.drop(columns="duration_ms", inplace=True)

    # Convert years to ints
    table['year'] = table['year'].astype(int)

    return table

tonal_key_names = { '0': 'none',
                    '1': 'C',
                    '2': 'C#',
                    '3': "D",
                    '4': "D#",
                    '5': "E",
                    '6': "E#",
                    '7': "F",
                    '8': "F#",
                    '9': "G",
                    '10': "G#",
                    '11': "A",
                    '12': "A#",
                    '13': "B"}

hm_axis_options = {
    'energy': 'energy',
    'tempo': 'tempo',
    'valence': 'valence',
    'danceability': 'danceability',
    'loudness': 'loudness',
}

sm_axis_options = {
    'energy': 'energy',
    'tempo': 'tempo',
    'valence': 'valence',
    'danceability': 'danceability',
    'loudness': 'loudness',
    'key': 'key',
}