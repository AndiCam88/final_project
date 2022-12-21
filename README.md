# Song Mood Analysis

A Final Project Analysis of Song Moods by their attributes
By: Devin Monsen, Andi Cameron, Zach Ellsworth, and Jamee Jenkins

## Summary of Project

Music can greatly alter the mood of the listener. It can help hype up a crowd at a party or soothe as you wait on hold or in an elevator. Music triggers emotional responses whether positive or negative. 

## Project Visualizations

- Web App: *https://neuralburst.io/MusicGroup/*
- Google Slides Presentation: *https://github.com/AndiCam88/final_project/blob/34cc16cf04641aa19e548258f863aae72d29349d/final_project.pdf*

## Project Overview

### Purpose

As connoisseurs of the music industry, we recognize the vast range of emotional releases that music can induce. The purpose of this study is to examine the language of music and attempt to anticipate the affects on a listener.

### Source Data 

- Kaggle: Spotify 1.2M+ Songs with track features obtained through the Spotify API
*https://www.kaggle.com/datasets/rodolfofigueroa/spotify-12m-songs*

### Questions to Analyze

- How can rhythym, loudness, or other attributes of a song prompt an emotional response?
- Which attributes are most important in determining the emotional resonance of a song?
- Is there a pattern of attributes that could affect individuals similarly?

### Technologies, Languages, Tools, and Algorithms Used

- Data Storage: GitHub
- Data Preprocessing: Python, pgAdmin/postgreSQL
- Data Analysis: Jupyter Notebook, Python
- Database Management: pgAdmin/postgreSQL, Python, VSCode, SQL Alchemy, Quick DBD for ERD development
- Visualizations: Google Slides, Javascript, Flask, Python, VSCode
- Requirements.txt: Shows all packages and libraries used throughout the project

## Data Exploration

The "Spotify 1.2M+ Songs with track features was downloaded from Kaggle. Total rows: 1,204,014

### Data Preprocessing

In reviewing the dataset, it was determined that it is complete according to our project requirements. No rows needed to be dropped due to null values. We trimmed down the attributes to focus on those that we deemed were most related to song mood. 
Those features are:
- Energy: The higher the value, the more energetic the song
- Loudness: The higher the value, the louder the song
- Valence: The higher the value, the more positive mood of the song
- Tempo: The higher the value, the faster the song is played
- Danceability: The higher the value, the easier it is to dance to the song
- Acousticness: A higher value would indicate acoustic instruments and a lower value would indicate electronic instruments 

#### *Attribute Table Snapshot*
![spotify_features_new](https://user-images.githubusercontent.com/108373151/207215024-af0a4589-8572-4a50-8800-d0f59636a9b5.jpg)

#### *Track Info Table Snapshot*
![spotify_track_info](https://user-images.githubusercontent.com/108373151/206340328-39d39290-fefe-4725-84a2-25218ec1a449.jpg)

#### *Feature Distribution*
![feature_scales](https://user-images.githubusercontent.com/108373151/208559218-180fdede-4264-4497-a9ac-c2d85e9f74b6.jpg)

Using a Neuralburst.io server we stored our Postgres database. From there, in a Jupyter Notebook using sqlalchemy we are able to connect to the server and import our sample dataframe. From there the transform preprocessing could begin. Checked for null values and had none. 

## Data Analysis & Machine Learning

We are using an unsupervised machine learning model for classification to attempt to determine mood. Our classification model will group songs together on the five chosen attributes in a five-dimensional space. We will split the data using the K-Means clustering elbow method to find out how many groups are recommended based off the features. To have a successful unsupervised machine learning model, we need to make sure we have enough features to correctly group the songs. From there, we would be able to possibly determine mood based off the songs in each grouping.

There are features that are unaligned in scale. After scaling these values with sklearn.preprocessing.MinMaxScaler() we can see the resulting data is more suitable for learning and clustering to avoid undue impact. Additionally, some songs had 0 tempo, so we normalized this data to allow for better clustering. Using k-means clustering from sklearn.cluster we discovered the following elbow curve and have decided to cluster our results into 6 sets.

![elbow_preprocess](https://user-images.githubusercontent.com/108373151/208801233-5dcd94b2-f92a-4f3e-9e2e-cbd9de083783.JPG)

From here we are simply fitting the data and decomposing it using PCA to 2 dimensions for visualization. A sample of the fit data takes on the following form. Note that these have not been labeled yet.

![model](https://user-images.githubusercontent.com/108373151/208801312-9cb54362-2f68-43ad-aa1d-648d26446172.JPG)

Once the Kmeans was defined using our n_clusters of 6 then fit to the songs features which gives us our Kmeans. From there, sklearn's PCA makes predictions using the Kmeans. Then to reduce the data to two dimensions we set the PCA's n_components to 2 and used fit_transform on the features once more to divide the songs into 6 clusters.

Due to being unable to find a dataset that already has a mood output we had to create one. That being the biggest limitation of not being able to test the models accuracy better becuase what it is predicting is also something subjective. But the benefit of that is being able to create that output and control what we thought would be fitting. Therefore, there is no accuracy score for our model since we were not doing a supervised machine learning model.

## Database

PgAdmin and SQLAlchemy were used for our project. Since our dataset is relatively straightforward, we only have 2 tables that are joined using id (song id) and 1 additional table to hold the output of the machine learning model. 

- spotify_track_info lists the id, name of the song, and the artist(s).
- spotify_features lists the id and the chosen attributes: energy, loudness, valence, tempo, danceability and acousticness.
- ML_moodoutput lists the id and the machine learning output.

#### *Entity Relationship Diagram (ERD)*
![database_ERD](https://user-images.githubusercontent.com/108373151/208558660-851765ab-123e-4f85-bc84-f1366517b6d2.png)

Due to size limitations of our GitHub repository, the entire file of 1.2M+ songs in our 2 tables format was unable to be loaded in .csv format. Therefore, a sample table was created to show the top 100,000 songs sorted ascending by song id.

## Dashboard

### Data Visualization

Visualization and dashboard are primarly produced through the [plotly](https://plotly.com) python libraries and [dash]([GitHub - plotly/dash: Analytical Web Apps for Python, R, Julia, and Jupyter. No JavaScript Required.](https://github.com/plotly/dash)). Dash is used for webpage interactivity and plotly as the backend for producing visualizations. The dashboard for the raw visualizer will be hosted at https://neuralburst.io/MusicGroup. 

The source for the visualization can be found at [final_project/Backend](https://github.com/AndiCam88/final_project/tree/main/Backend). There are three files (along with some css and javascript glue in the assets subfolder).

- app.py controls the logic of the dashboard
- page_layout.py controls the layout
- visualizer_utilities.py are some helper functions, seperated out from the main logic app for clarity.
  
### Interactivity

The final submission includes a narrowed interactive element to allow exploration of singular songs depending on how the models have classified the songs. The user inputs the song in the search function below and the dial shows the classification of the song using the machine learning model.

![webpage_home](https://user-images.githubusercontent.com/108373151/208560478-38a2dd9d-affc-4349-a141-0565c4bc9251.jpg)

A secondary page *(https://neuralburst.io/musicgroup/StoryPage)* tells the story of our project, including additional graphs for each group.

![our_story](https://user-images.githubusercontent.com/108373151/208567192-ca5a030b-b8fc-4493-a525-851fd6662fd9.jpg)

## Conclusions

One of the limitations we ran into was the size of the dataset. Within the data, there was no option for pairing down the information by language. There are several non-English songs within the dataset that could have been eliminated for our purposes.

Additionally, another interesting data feature would be genre. A classical song is much different than a rap song. It would be interesting to see how data groups within each genre.

While we were able to group the data into clusters, we were not able to determine a specific mood for each grouping. Mood can be subjective based on the listener. However, we were able to determine that songs could be grouped based on similar traits. It would be interesting to explore this dataset further to see if there is a way to determine mood.






