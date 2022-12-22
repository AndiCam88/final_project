There are a number of technologies we will be using to accomplish the goals of our project, to be documented here with rational.

## Analytics

### Language Choice

We are going to the majority of transformation and details with Python and SQL. SQL will make for easy access and transformation of the data. Python being a primary subject of the bootcamp is familiar to all of us. Likewise it has a huge pleathora of libraries such as Scikit learn, Tensorflow, Numpy, Pandas and Sqlalchemy. For the dashboard we are using Javascript (React) and GoLang for the backend processing

## Databases

Our primary data source is a dataset from [Kaggle](https://www.kaggle.com/datasets/rodolfofigueroa/spotify-12m-songs). There is superfluous data that we don't intend on using. We will use sql and python to transform the data to be more usable for our models. 

Once transformed we are going to hold the data in a postgresql database. This will make random sampling from the database easier, as well as make it easier to further transform the data as needed.

Finally, but keeping the data centralized in a high availability and simple to access database, and because the dataset is fairly large it will be easier to access and assure that everyone is using the same data

## Visualization

Visualization is by dashboard on a hosted react app at https://neuralburst.io/musicgroup

## Server Details

### Postgresql

We have spun up an instance of a database using docker and exposed the database with a singluar set of credentials to be shared among the team. While we could create multiple users and may find nessessity for this in the future, for now there doesn't seem to be a need

The server is hosted with an infrastructure as a service cloud provider. Close examination of the logs is needed before further configuration will be done. However, we may need to configure a fail2ban daemon to stop unintended overload from malicious port scanning bots.

### Backend Processing

We have setup a simple service that runs ago app on a posix server

#### SFTP Access

We have setup SFTP access for the users from the group. 

### App service

In the root file is a simple flask app named musicapp.py. This has its own venv that is activated and ran through a systemd process with the following service script.

```
[Unit]
Description=Music Project Webapp Backend
After=network.target

[Service]
Type=simple
User=<username>
Restart=always
ExecStart=<python3 env python> /home/<username>/musicapp.py start

[Install]
WantedBy=multi-user.target
```

The code for the app can be found above at [Backend/musicapp.py](Backend/musicapp.py)

### Exposing the API/Backend

Our service runs on nginx that has the following configuration to expose the app

```
# MusicGroup Backend 
    location /MusicGroup/ {
        proxy_pass         http://127.0.0.1:<port>/;
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        client_max_body_size       10m;
        client_body_buffer_size    128k;
        proxy_connect_timeout      90;
        proxy_send_timeout         90;
        proxy_read_timeout         90;
        proxy_buffer_size          4k;
        proxy_buffers              4 32k;
        proxy_busy_buffers_size    64k;
        proxy_temp_file_write_size 64k;
    }
```



## Dashboard

The dashboard for the project was made with three key technologies:

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
