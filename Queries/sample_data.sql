-- Create sample feature table to export to csv file for repository
select id, 
	danceability,
    energy,
    loudness,
    valence,
    tempo
into sample_spotify_features
from spotify_features
order by id asc 
limit 100000


-- Create sample track info table to export to csv file for repository
select id, 
	name,
	artists
into sample_spotify_track_info
from spotify_track_info
order by id asc 
limit 100000