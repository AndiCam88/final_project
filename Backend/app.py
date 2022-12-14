from dash import Dash, html, dcc
import dash
import pages.raw_explorer_layout as raw_layout



app = dash.Dash(
    __name__,  use_pages=True, meta_tags=[{"name": "viewport", "content": "width=device-width"}],
)
app.title = "Music Data"
server = app.server


app.layout = html.Div([
	html.H1('Multi-page app with Dash Pages'),

    html.Div(
        [
            html.Div(
                dcc.Link(
                    f"{page['name']} - {page['path']}", href=page["relative_path"]
                )
            )
            for page in dash.page_registry.values()
        ]
    ),

	dash.page_container
])

if __name__ == '__main__':
	app.run_server(debug=True)