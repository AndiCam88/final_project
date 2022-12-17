-- Creating table to hold partial Spotify export
CREATE TABLE spotify_partial (
	id VARCHAR(22) NOT NULL,
	name VARCHAR(250) NOT NULL,
    album VARCHAR(250) null,
    album_id VARCHAR(22) null,
    artists VARCHAR(1500) null,
    artist_ids VARCHAR(1500) null,
    track_number int null,
    disc_number int null,
    explicit boolean not null,
    danceability float null,
    energy float null,
    key int null,
    loudness float null,
    mode int null,
    speechiness float null,
    acousticness float null,
    instrumentalness float null,
    liveness float null,
    valence float null,
    tempo float null,
    duration_ms int null,
    time_signature float null,
    year int null,
    release_date varchar(20) null,
	PRIMARY KEY (id),
	UNIQUE (id)
);

select * from spotify_partial

-- Creating table to hold Spotify export
CREATE TABLE spotify_full (
	id VARCHAR(22) NOT NULL,
	name VARCHAR(1000) NOT NULL,
    album VARCHAR(1000) null,
    album_id VARCHAR(22) null,
    artists VARCHAR(1500) null,
    artist_ids VARCHAR(1500) null,
    track_number int null,
    disc_number int null,
    explicit boolean not null,
    danceability float null,
    energy float null,
    key int null,
    loudness float null,
    mode int null,
    speechiness float null,
    acousticness float null,
    instrumentalness float null,
    liveness float null,
    valence float null,
    tempo float null,
    duration_ms int null,
    time_signature float null,
    year int null,
    release_date varchar(20) null,
	PRIMARY KEY (id),
	UNIQUE (id)
);

select * from spotify_full


-- Creating table to hold Spotify track info
select id, 
    name, 
    artists
into spotify_track_info
from spotify_full

select * from spotify_track_info

-- Creating table to hold Spotify features
select id, 
	danceability,
    energy,
    loudness,
    valence,
    tempo,
    acousticness
into spotify_features
from spotify_full

select * from spotify_features

-- Creating table to hold ML mood output
CREATE TABLE ML_moodoutput (
	id VARCHAR(22) NOT NULL,
    mood varchar(15) not null
);
