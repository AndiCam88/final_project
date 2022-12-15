from pathlib import Path

import dash
import pandas as pd
from dash import html, dcc, callback
from dash.dependencies import Input, Output, State, ClientsideFunction
import pages.visualizer_utilities as visualizer_utilities
from dash.exceptions import PreventUpdate

dash.register_page(__name__, path='/')

test_options = [
    "apple",
    "pear",
    "orange",
    "pomegranate",
    "kumquat"
]

# Load data
parquet_path = (f'{Path(__file__).parent}/../../Resources/tracks_features.parquet').replace('\\', '/')
df = pd.read_parquet(parquet_path)

layout = html.Div(children=[

    html.Div(children='''
        Welcome to University of Utah Datascience bootcamp music classification project.
    ''',
             className="center"),


    html.Div([
            "This is a work in progress.",
            "visit our ",
            html.A("github page", href="https://github.com/AndiCam88/final_project"),
            " for more info"
        ],
    className="center"),


    html.Div(
        dcc.Input(
                    id="homepage_search",
                    type="search",
                    debounce=True,
                    placeholder="I'm a debugger thing",
        ),
        className="center searchbox"
    ),

    html.Div(
        dcc.Dropdown(
                    id="homepage_search_combo",
                    placeholder="please type a song name",
                    searchable=True
        ),
        className="center search_combo"
    )

])




# @callback(
#     Output("homepage_search", "value"),
#     Input("homepage_search", "value"),
# )
# def debug_function(value):
#     if value is None:
#         return ""
#
#     print(value)
#     return f'You typed: {value}'


@callback(
    Output("homepage_search_combo", "options"),
    Input("homepage_search_combo", "search_value"),
)
def debug_combofunction(value):
    if len(str(value)) < 3:
        raise PreventUpdate

    if not value:
        raise PreventUpdate

    # Try to find a song that matches
    max_suggestions = 20
    suggestions = df['name'][pd.Series([value in i.lower() for i in df['name']])==True].head(max_suggestions).to_list()

    if len(suggestions) == 0:
        raise PreventUpdate

    return suggestions


