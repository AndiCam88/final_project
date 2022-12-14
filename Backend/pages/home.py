import dash
from dash import html, dcc

dash.register_page(__name__, path='/')

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
    className="center")
])