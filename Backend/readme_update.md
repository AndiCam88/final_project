## Preliminary Data Visualization

Visualization and dashboard are primarly produced through the [plotly](https://plotly.com) python libraries and [dash]([GitHub - plotly/dash: Analytical Web Apps for Python, R, Julia, and Jupyter. No JavaScript Required.](https://github.com/plotly/dash)). Dash is used for webpage interactivity and plotly as the backend for producing visualizations. The dashboard for the raw visualizer will be hosted at https://neuralburst.io/MusicGroup/raw. However, the page is not yet live as there is some debugging to do. The source for the visualization can be found at [final_project/Backend](https://github.com/AndiCam88/final_project/tree/main/Backend). There are three files (along with some css and javascript glue in the assets subfolder).

- app.py (to be renamed) controls the logic of the dashboard

- page_layout.py controls the layout

- visualizer_utilities.py are some helper functions, seperated out from the main logic app for clarity.


### Interactivity

This is a work in progress. However, we are currently able to explore the raw data based on

- year
- key
- tempo
- danceability
- energy
- valence
- loudness

The final submission will include a narrowed interactive element to allow exploration of singular songs depending on how the models have classified the songs.