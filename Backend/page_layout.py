from dash import html, dcc

from visualizer_utilities import tonal_key_names, hm_axis_options, sm_axis_options

# A reference to our app object
global app


########################################################################################################################
#
# Page Header
#

# Logo Bar
def music_icon():
    global app
    return html.Div(
    [
        html.Img(
            src=app.get_asset_url("music-note-icon.png"),
            id="plotly-image",
            style={
                "height": "60px",
                "width": "auto",
                "margin-bottom": "25px",
            },
        )
    ],
    className="one-third column",
    )

# Our visualizer page main header
def main_header():
    return html.Div(
    [
        html.Div(
            [
                html.H3(
                    "Music Project",
                    style={"margin-bottom": "0px"},
                ),
                html.H5(
                    "Data Explorer", style={"margin-top": "0px"}
                ),
            ]
        )
    ],
    className="one-half column",
    id="title",
    )

def learn_more():
    return html.Div(
        [
            html.A(
                html.Button("Learn More", id="learn-more-button"),
                href="https://neuralburst.io/MusicDataProject",
            )
        ],
        className="one-third column",
        id="button",
    )

def page_header():
    return html.Div(
        [
            music_icon(),
            main_header(),
            learn_more(),
        ],
        id="header",
        className="row flex-display",
        style={"margin-bottom": "25px"},
    )

########################################################################################################################
#
# Filter Bar
#

def filter_frame():
    return html.Div(
        [
            html.P("Filter by year:", className="control_label",),
            dcc.RangeSlider(
                id="year_slider",
                min=1900,
                max=2020,
                value=[1990, 2020],
                marks={i: '{}'.format(i) for i in range(1900, 2021, 20)},
                className="dcc_control",
            ),
            ############################################################################################################
            html.P("Filter by key:", className="control_label"),
            dcc.Dropdown(
                id="keys_filter",
                options=tonal_key_names,
                multi=True,
                value=list(tonal_key_names.keys()),
                className="dcc_control",
            ),
            ############################################################################################################
            html.P("Tempo:", className="control_label"),
            dcc.RangeSlider(
                id="tempo_slider",
                min=50,
                max=225,
                value=[75, 150],
                marks={i: '{}'.format(i) for i in range(50, 226, 25)},
                className="dcc_control",
            ),
            ############################################################################################################
            html.P("Danceability (%):", className="control_label"),
            dcc.RangeSlider(
                id="danceability_slider",
                min=0,
                max=100,
                value=[0, 100],
                marks={i: '{}'.format(i) for i in range(0, 101, 20)},
                className="dcc_control",
            ),
            ############################################################################################################
            html.P("Energy (%):", className="control_label"),
            dcc.RangeSlider(
                id="energy_slider",
                min=0,
                max=100,
                value=[0, 100],
                marks={i: '{}'.format(i) for i in range(0, 101, 20)},
                className="dcc_control",
            ),
            ############################################################################################################
            html.P("Valence (%):", className="control_label"),
            dcc.RangeSlider(
                id="valence_slider",
                min=0,
                max=100,
                value=[0, 100],
                marks={i: '{}'.format(i) for i in range(0, 101, 20)},
                className="dcc_control",
            ),
            ############################################################################################################
            html.P("Loudness (db):", className="control_label"),
            dcc.RangeSlider(
                id="loudness_slider",
                min=-60,
                max=0,
                value=[-60, 0],
                marks={i: '{}'.format(i) for i in range(-60, 1, 20)},
                className="dcc_control",
            ),
            ############################################################################################################
            html.P("Heatmap Axis:", className="control_label"),
            html.Div(
                [
                    html.Label("Heatmap X:", className="ga_label"),
                    dcc.Dropdown(
                        id="hm_xaxis",
                        options=hm_axis_options,
                        value=list(hm_axis_options.values())[1],
                        className="ga_dropdown",
                        clearable=False,
                    ),
                    html.Label("Heatmap Y:", className="ga_label"),
                    dcc.Dropdown(
                        id="hm_yaxis",
                        options=hm_axis_options,
                        value=list(hm_axis_options.values())[0],
                        className="ga_dropdown",
                        clearable=False,
                    ),
                ],
                className="graph_axis_control"
            ),
            ############################################################################################################
            html.P("Scatter Axis:", className="control_label"),
            html.Div(
                [
                    html.Label("Scatter X:", className="ga_label"),
                    dcc.Dropdown(
                        id="s_xaxis",
                        options=hm_axis_options,
                        value=list(hm_axis_options.values())[3],
                        className="ga_dropdown",
                        clearable=False,
                    ),
                    html.Label("Scatter Y:", className="ga_label"),
                    dcc.Dropdown(
                        id="s_yaxis",
                        options=hm_axis_options,
                        value=list(hm_axis_options.values())[1],
                        className="ga_dropdown",
                        clearable=False,
                    ),
                ],
                className="graph_axis_control"
            ),
            html.Div(
                [
                    html.Label("Scatter Color:", className="ga_label"),
                    dcc.Dropdown(
                        id="s_caxis",
                        options=sm_axis_options,
                        value=list(sm_axis_options.values())[5],
                        className="ga_dropdown",
                        clearable=False,
                    ),
                    html.Label("Scatter Size:", className="ga_label"),
                    dcc.Dropdown(
                        id="s_saxis",
                        options=hm_axis_options,
                        value=list(hm_axis_options.values())[0],
                        className="ga_dropdown",
                        clearable=False,
                    ),
                ],
                className="graph_axis_control"
            ),

            # html.P("Filter by key:", className="control_label"),
            # dcc.RadioItems(
            #     id="well_status_selector",
            #     options=[
            #         {"label": "All ", "value": "all"},
            #         {"label": "Active only ", "value": "active"},
            #         {"label": "Customize ", "value": "custom"},
            #     ],
            #     value="active",
            #     labelStyle={"display": "inline-block"},
            #     className="dcc_control",
            # ),
            ############################################################################################################
            # dcc.Dropdown(
            #     id="well_statuses",
            #     options=well_status_options,
            #     multi=True,
            #     value=list(WELL_STATUSES.keys()),
            #     className="dcc_control",
            # ),
            # dcc.Checklist(
            #     id="lock_selector",
            #     options=[{"label": "Lock camera", "value": "locked"}],
            #     className="dcc_control",
            #     value=[],
            # ),
            # html.P("Filter by well type:", className="control_label"),
            # dcc.RadioItems(
            #     id="well_type_selector",
            #     options=[
            #         {"label": "All ", "value": "all"},
            #         {"label": "Productive only ", "value": "productive"},
            #         {"label": "Customize ", "value": "custom"},
            #     ],
            #     value="productive",
            #     labelStyle={"display": "inline-block"},
            #     className="dcc_control",
            # ),
            # dcc.Dropdown(
            #     id="well_types",
            #     options=well_type_options,
            #     multi=True,
            #     value=list(WELL_TYPES.keys()),
            #     className="dcc_control",
            # ),
        ],
        className="pretty_container four columns",
        id="cross-filter-options",
    )

def mini_display():
    return html.Div(
        [
            html.Div(
                [
                    html.Div(
                        [html.H6(id="song_count"), html.P("Songs Visualized")],
                        id="song_count_container",
                        className="mini_container",
                    ),
                    html.Div(
                        [html.H6(id="gasText"), html.P("Prevailing Key")],
                        id="gas",
                        className="mini_container",
                    ),
                    html.Div(
                        [html.H6(id="oilText"), html.P("Major/Minor Ratio")],
                        id="oil",
                        className="mini_container",
                    ),
                    html.Div(
                        [html.H6(id="waterText"), html.P("Average Tempo")],
                        id="water",
                        className="mini_container",
                    ),
                ],
                id="info-container",
                className="row container-display",
            ),
        ],
        id="right-column2",
        className="eight columns",
    )

def filter_menu():
    return html.Div(
        [
            filter_frame(),
            html.Div(
                [
                    mini_display(),
                    html.Div(
                        [dcc.Graph(id="main_graph")],
                        className="pretty_container twelve columns",
                        id="songcount"
                    ),
                ],
                id="right-column",
                className="eight columns"
            )
        ],
        className="row flex-display",
    )

########################################################################################################################
#
# Primary Client area
#

def client_area_test_b():
    return html.Div(
        [

        ],
        className="row flex-display",
    )

def client_area_test():
    return html.Div(
        [

            html.Div(
                [dcc.Graph(id="histogram")],
                className="pretty_container four columns",
            ),
            html.Div(
                [dcc.Graph(id="scatter_graph")],
                className="pretty_container four columns",
            ),
            html.Div(
                [dcc.Graph(id="density_graph")],
                className="pretty_container four columns",
            ),
        ],
        className="row flex-display",
    )

