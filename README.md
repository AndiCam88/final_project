# Song Mood Analysis

A Final Project Analysis of Song Moods by their attributes
By: Devin Monsen, Andi Cameron, Zach Ellsworth, and Jamee Jenkins

## Summary of Project

Music can greatly alter the mood of the listener. It can help hype up a crowd at a party or soothe as you wait on hold or in an elevator. Music triggers emotional responses whether positive or negative. 

## Project Overview

### Purpose

As connoisseurs of the music industry, we recognize the vast range of emotional releases that music can induce. The purpose of this study is to examine the language of music and attempt to anticipate the affects on a listener.

### Source Data 

- Kaggle: Spotify 1.2M+ Songs with track features obtained through the Spotify API
(https://www.kaggle.com/datasets/rodolfofigueroa/spotify-12m-songs)

### Questions to Analyze

- How can rhythym, loudness, or other attributes of a song prompt an emotional response?
- Which attributes are most important in determining the emotional resonance of a song?
- Is there a pattern of attributes that could affect individuals similarly?

### Technologies, Languages, Tools, and Algorithms Used

- Data Storage: GitHub
- Data Analysis: Jupyter Notebook, Python
- Database Management: postgreSQL, Python, VSCode, SQL Alchemy, Quick DBD for ERD development
- Visualizations: Google Slides

### Communication Plan

- Communication platforms include: GitHub, Slack, Zoom, and Text Message

The final project began on November 21, 2022. The team met during weekly class time to discuss updates, actively collaborate, and problem solve. The group exchanged personal phone numbers for contact outside class or Slack.

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

#### *Attribute Table Snapshot*
![spotify_features](https://user-images.githubusercontent.com/108373151/206340361-34fdfbe6-ed82-47fc-8793-7f19215f8509.jpg)

#### *Track Info Table Snapshot*
![spotify_track_info](https://user-images.githubusercontent.com/108373151/206340328-39d39290-fefe-4725-84a2-25218ec1a449.jpg)

## Data Analysis & Machine Learning

## Database

PgAdmin and SQLAlchemy were used for our project. Since our data is relatively straightforward, we only have 2 final tables that are joined using id (song id). 

- spotify_track_info lists the id, name of the song, and the artist(s).
- spotify_features lists the id and the chosen attributes: energy, loudness, valence, tempo, and danceability.

#### *Entity Relationship Diagram (ERD)*
![database_ERD](https://user-images.githubusercontent.com/108373151/206344180-768641d9-bd53-499d-ad25-eaf53ca4c0ed.png)

Due to size limitations of our GitHub repository, the entire file of 1.2M+ songs in our 2 tables format was unable to be loaded in .csv format. Therefore, a sample table was created to show the top 100,000 songs sorted ascending by song id.

## Dashboard

