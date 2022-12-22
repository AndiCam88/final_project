# Song Mood Analysis

A Final Project Analysis of Song Moods by their attributes
By: Devin Monsen, Andi Cameron, Zach Ellsworth, and Jamee Jenkins

## Summary of Project

Music can greatly alter the mood of the listener. It can help hype up a crowd at a party or soothe as you wait on hold or in an elevator. Music triggers emotional responses whether positive or negative. 

## Project Visualizations

- Google Slides Presentation: *(https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fraw.githubusercontent.com%2FAndiCam88%2Ffinal_project%2Fmain%2FFinal%2520Project.pptx&wdOrigin=BROWSELINK)*

## Project Overview

### Purpose

As connoisseurs of the music industry, we recognize the vast range of emotional releases that music can induce. The purpose of this study is to examine the language of music and attempt to anticipate the affects on a listener.

### Source Data

- Kaggle: Spotify 1.2M+ Songs with track features obtained through the Spotify API
  *(https://www.kaggle.com/datasets/rodolfofigueroa/spotify-12m-songs)*

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

## Data Analysis & Machine Learning

We are using an unsupervised machine learning model for classification to attempt to determine mood. Our classification model will group songs together on the five chosen attributes in a five-dimensional space. We will split the data using the K-Means clustering elbow method to find out how many groups are recommended based off the features. To have a successful unsupervised machine learning model, we need to make sure we have enough features to correctly group the songs. From there, we would be able to possibly determine mood based off the songs in each grouping.

## Database

PgAdmin and SQLAlchemy were used for our project. Since our dataset is relatively straightforward, we only have 2 final tables that are joined using id (song id). 

- spotify_track_info lists the id, name of the song, and the artist(s).
- spotify_features lists the id and the chosen attributes: energy, loudness, valence, tempo, and danceability.

#### *Entity Relationship Diagram (ERD)*

![database_ERD](https://user-images.githubusercontent.com/108373151/206344180-768641d9-bd53-499d-ad25-eaf53ca4c0ed.png)

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

There are some lingering issues both in terms of design choice, reactive css, taking a stronger approach to filtering data through the websocket, but overall the dashboard does a decent job at presenting the data.
