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

![attribute_means](https://user-images.githubusercontent.com/108373151/208807547-72e89fc1-424a-43a9-95d9-fe1e649210f0.jpg)

Due to being unable to find a dataset that already has a mood output we had to create one. That being the biggest limitation of not being able to test the models accuracy better becuase what it is predicting is also something subjective. But the benefit of that is being able to create that output and control what we thought would be fitting. Therefore, there is no accuracy score for our model since we were not doing a supervised machine learning model.

## Database

PgAdmin and SQLAlchemy were used for our project. Since our dataset is relatively straightforward, we only have 2 tables that are joined using id (song id). 

- spotify_track_info lists the id, name of the song, and the artist(s).
- spotify_features lists the id and the chosen attributes: energy, loudness, valence, tempo, danceability and acousticness.

#### *Entity Relationship Diagram (ERD)*
![database_ERD](https://user-images.githubusercontent.com/108373151/209034139-43a23ecd-0a36-4432-9584-ebd0983e449e.png)

Due to size limitations of our GitHub repository, the entire file of 1.2M+ songs in our 2 tables format was unable to be loaded in .csv format. Therefore, a sample table was created to show the top 100,000 songs sorted ascending by song id.

## Dashboard

The [dashboard ](https://neuralburst.io/musicgroup)for the project was made with three key technologies:

- React for the front end
  
- GoLang for the backend
  
- Websockets
  

The backend of the app is currently hosted at [Music Classifier](https://neuralburst.io/musicgroup) However, this could be changed to run on an app platform such as Google apps. We are using Golang and websockets for server-client communication for a few reasons including:

1. Low server availability and specs at free tiers. We are serving a a medium sized database to a web-app that is expected to be responsive and snappy. While Python works fine, reducing the memory footprint and server response time ended up being important (that will be detailed below)
  
2. While networked communications bottleneck is is almost always the network itself, if we could shave some time off of the processing of the requests and backend communication with the network we can and should.
  

As part of this second point we went with websockets to further reduce the lag that comes with http handshaking process.

The front end of the app was developed with a modern and functional React approach. This made iteration quick and easy. On the dashboard one of the first things you'll see is a guage with a search field. This search field is built with [ReactSearchAutocomplete](https://www.npmjs.com/package/react-search-autocomplete). While this component is very functional and useful it turns out to have a couple of issues that made it a square-peg in a round hole situation.

The component will begin a search based on a supplied list of searchable items. However, if this search completes and we get the "no-results" popup our connection to query for items to add to search will go to a previously rendered component and never update.

Due to this we hade to reduce network latency as much as possible, thus the aformentioned use of golang and websockets.

The actual guage itself is just another configurable react component from [React-Gauge-Chart](https://www.npmjs.com/package/react-gauge-chart). We opted for this due to its more configurable and easy to use visuals instead of something from plotly or custom rolling a D3 chart.

The next component is a representation of the 2-dimensional PCA breakdown of the groups that the sklearn algorithm generated. This was custom rolled by taking a high resolution image of the chart and tracing the colors in Gimp, to generate an SVG. We generated an svg path for each group and overlayed them on the dashboard. With some fancy javascript we generated the interactivity you can see.

Finally we have the table which re-uses the websocket connection to fetch data from the server app thats communicating with our databases. While we wanted to add some filtering capability, unfortunantly there wasn't enough time with polishing everything else up.
  
### Interactivity

The final submission includes a narrowed interactive element to allow exploration of singular songs depending on how the models have classified the songs. The user inputs the song in the search function below and the dial shows the classification of the song using the machine learning model.

![webpage_home](https://user-images.githubusercontent.com/108373151/208560478-38a2dd9d-affc-4349-a141-0565c4bc9251.jpg)

A secondary page *(https://neuralburst.io/musicgroup/StoryPage)* tells the story of our project, including additional graphs for each group.

![our_story](https://user-images.githubusercontent.com/108373151/208567192-ca5a030b-b8fc-4493-a525-851fd6662fd9.jpg)

## Conclusions

One of the limitations we ran into was the size of the dataset. Within the data, there was no option for pairing down the information by language. There are several non-English songs within the dataset that could have been eliminated for our purposes.

Additionally, another interesting data feature would be genre. A classical song is much different than a rap song. It would be interesting to see how data groups within each genre.

While we were able to group the data into clusters, it was difficult to determine a specific mood for each grouping. Mood can be subjective based on the listener. We were able to determine that songs could be grouped based on similar traits. The clusters of songs were labeled as a "mood" based on their attributes.

- Group 0: Laid-Back
- Group 1: Energetic
- Group 2: Sad
- Group 3: Happy
- Group 4: Calm
- Group 5: Angry

![output_mood](https://user-images.githubusercontent.com/108373151/208805773-dd1bd090-53cf-4b25-ba16-81808f5c093e.JPG)
