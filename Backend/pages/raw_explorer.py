import dash
import pandas
import copy
from dash import html, dcc, callback
from dash.dependencies import Input, Output, State, ClientsideFunction
import pages.raw_explorer_layout as raw_explorer_layout
import pages.visualizer_utilities as visualizer_utilities
import datashader as ds
import numpy as np


import plotly.figure_factory as ff
import plotly.express as px

dash.register_page(__name__)

#https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features



# Load data
df = visualizer_utilities.load_data("../../Resources/")


layout = dict(
    autosize=True,
    automargin=True,
    margin=dict(l=30, r=30, b=20, t=40),
    hovermode="closest",
    plot_bgcolor="#F9F9F9",
    paper_bgcolor="#F9F9F9",
    legend=dict(font=dict(size=10), orientation="h"),
    title="Legend",
)

page_layout = raw_explorer_layout

# Create app layout
layout = html.Div(
    [
        dcc.Store(id="aggregate_data"),
        html.Div(id="output-clientside"),
        page_layout.page_header(),
        page_layout.filter_menu(),
        page_layout.client_area_test(),
        page_layout.client_area_test_b(),

    ],
    id="mainContainer",
    style={"display": "flex", "flex-direction": "column"},
)

########################################################################################################################
@callback(
    [
        Output("song_count", "children"),
        Output("gasText", "children"),        # Output is the div-id
        Output("oilText", "children"),
        Output("waterText", "children"),
    ],
    [
        Input("year_slider", "value"),
        Input("keys_filter", "value"),
        Input("tempo_slider", "value"),
        Input("danceability_slider", "value"),
        Input("energy_slider", "value"),
        Input("valence_slider", "value"),
        Input("loudness_slider", "value"),
    ],
)
def update_production_text(year_slider, keys_filter, tempo_slider, danceability, energy, valence, loudness):

    # Filter our dataframe
    fdf = visualizer_utilities.filter_dataframe(df, year_slider, keys_filter, tempo_slider, danceability, energy, valence, loudness)

    song_count = fdf.id.count()

    key_index = fdf.groupby("key")['id'].count().sort_values(ascending=False).index[0]
    prevailing_key = list(visualizer_utilities.tonal_key_names.values())[key_index]

    modes = fdf.groupby("mode")['id'].count()
    ratio = "inf"
    if(modes[0] != 0):
        ratio = modes[1] / modes[0]
        ratio = f'{ratio:.2f}'

    avg_column_name = "tempo"
    avg = fdf[avg_column_name].mean()
    avg = f'{avg:.0f}'

    return [format(song_count, ','), prevailing_key, ratio, avg]
########################################################################################################################

@callback(
    Output("main_graph", "figure"),
    [
        Input("year_slider", "value"),
        Input("keys_filter", "value"),
        Input("tempo_slider", "value"),
        Input("danceability_slider", "value"),
        Input("energy_slider", "value"),
        Input("valence_slider", "value"),
        Input("loudness_slider", "value"),
    ],
)
def make_main_graph(year_slider, keys_filter, tempo_slider, danceability, energy, valence, loudness):
    mylayout = copy.deepcopy(layout)
    mylayout["title"] = "Yearly Song Count"

    # Filter our dataframe
    fdf = visualizer_utilities.filter_dataframe(df, year_slider, keys_filter, tempo_slider, danceability, energy, valence, loudness)

    fdf = fdf.groupby("year").id.count().reset_index()
    fdf.rename(columns={"id": "song_count"}, inplace=True)

    traces = []
    trace = dict(
        type="bar",
        x=fdf["year"],
        y=fdf["song_count"]
    )
    traces.append(trace)

    figure = dict(data=traces, layout=mylayout)
    return figure
########################################################################################################################

@callback(
    Output("scatter_graph", "figure"),
    [
        Input("year_slider", "value"),
        Input("keys_filter", "value"),
        Input("tempo_slider", "value"),
        Input("danceability_slider", "value"),
        Input("energy_slider", "value"),
        Input("valence_slider", "value"),
        Input("loudness_slider", "value"),
        Input("s_xaxis", "value"),
        Input("s_yaxis", "value"),
        Input("s_caxis", "value"),
        Input("s_saxis", "value"),
    ],
)
def make_scatter_graph(year_slider, keys_filter, tempo_slider, danceability, energy, valence, loudness, x_axis, y_axis, c_axis, s_axis):
    mylayout = copy.deepcopy(layout)
    mylayout["title"] = "Scatter"


    # Filter our dataframe
    fdf = visualizer_utilities.filter_dataframe(df, year_slider, keys_filter, tempo_slider, danceability, energy, valence, loudness)

    # Some additional filtering for bad data
    fdf = fdf[fdf.tempo > 0]

    # Take a sample of our data. Here we are going with 10000
    n = 1500
    if(fdf.tempo.count() > n):
        fdf = fdf.sample(n)

    #TODO: Display Legend

    traces = []
    trace = dict(
        type="scattergl",
        x=fdf[x_axis],
        y=fdf[y_axis],
        mode="markers",
        marker=dict(
            size=fdf[s_axis] * 18,
            color=fdf[c_axis],
            line_width=0,
            colorscale='Viridis',
        ),
    )
    traces.append(trace)

    figure = dict(data=traces, layout=mylayout)
    return figure

########################################################################################################################
@callback(
    Output("density_graph", "figure"),
    [
        Input("year_slider", "value"),
        Input("keys_filter", "value"),
        Input("tempo_slider", "value"),
        Input("danceability_slider", "value"),
        Input("energy_slider", "value"),
        Input("valence_slider", "value"),
        Input("loudness_slider", "value"),
    ],
)
def make_density_graph(year_slider, keys_filter, tempo_slider, danceability, energy, valence, loudness):
    mylayout = copy.deepcopy(layout)
    mylayout["title"] = "Density"

    column_name = ['tempo']
    curve_type= "kde"
    group_labels = [column_name[0]]


    # Filter our dataframe
    fdf = visualizer_utilities.filter_dataframe(df, year_slider, keys_filter, tempo_slider, danceability, energy, valence, loudness)

    # Take a sample of our data. Here we are going with
    fdf = fdf.sample(100000)

    #TODO: Display Legend
    #TODO Add multiple. Have our input be a list

    traces = []
    trace = dict(
        type="histogram",
        x=fdf[column_name[0]],
        nbinsx=20,
        show_curve=True,
        group_labels=group_labels
    )
    traces.append(trace)


    figure = dict(data=traces, layout=mylayout)
    return figure

########################################################################################################################
@callback(
    Output("histogram", "figure"),
    [
        Input("year_slider", "value"),
        Input("keys_filter", "value"),
        Input("tempo_slider", "value"),
        Input("danceability_slider", "value"),
        Input("energy_slider", "value"),
        Input("valence_slider", "value"),
        Input("loudness_slider", "value"),
        Input("hm_xaxis", "value"),
        Input("hm_yaxis", "value"),
    ],
)
def make_heatmap(year_slider, keys_filter, tempo_slider, danceability, energy, valence, loudness, x_axis, y_axis):
    mylayout = copy.deepcopy(layout)
    mylayout["title"] = "Histogram"


    fdf = visualizer_utilities.filter_dataframe(df, year_slider, keys_filter, tempo_slider, danceability, energy, valence, loudness)

    cvs = ds.Canvas(plot_width=100, plot_height=100)
    agg = cvs.points(fdf, x_axis, y_axis)
    zero_mask = agg.values == 0
    agg.values = np.log10(agg.values, where=np.logical_not(zero_mask))
    agg.values[zero_mask] = np.nan

    #TODO: Display Legend

    fig = px.imshow(agg, origin='lower',
                    labels=
                    {'color':'Log10(count)'})

    #fig.update_traces(hoverongaps=False)
    fig.update_layout(coloraxis_colorbar=dict(title='Count', tickprefix='1.e'))
    return fig

