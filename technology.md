There are a number of technologies we will be using to accomplish the goals of our project, to be documented here with rational.



## Analytics

### Language Choice

We are going to the majority of transformation and details with Python and SQL. SQL will make for easy access and transformation of the data. Python being a primary subject of the bootcamp is familiar to all of us. Likewise it has a huge pleathora of libraries such as Scikit learn, Tensorflow, Numpy, Pandas and Sqlalchemy.

## Databases

Our primary data source is a dataset from [Kaggle](https://www.kaggle.com/datasets/rodolfofigueroa/spotify-12m-songs). There is superfluous data that we don't intend on using. We will use sql and python to transform the data to be more usable for our models. 

Once transformed we are going to hold the data in a postgresql database. This will make random sampling from the database easier, as well as make it easier to further transform the data as needed.

Finally, but keeping the data centralized in a high availability and simple to access database, and because the dataset is fairly large it will be easier to access and assure that everyone is using the same data

## Visualization

Visualization right now is intended to be interactive as a webpage. This could be hosted either through github pages or directly from the server that the database and back-end is using.

## Server Details

### Postgresql

We have spun up an instance of a database using docker and exposed the database with a singluar set of credentials to be shared among the team. While we could create multiple users and may find nessessity for this in the future, for now there doesn't seem to be a need

The server is hosted with an infrastructure as a service cloud provider. Close examination of the logs is needed before further configuration will be done. However, we may need to configure a fail2ban daemon to stop unintended overload from malicious port scanning bots.

### Backend Processing

We have setup a simple service that runs a flask app on a posix server. While its not entirely certain that it is needed at this time, having the groundwork done could come in handly later.

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

### Restarting the backend service

The backend service is spun up by systemd. If a member of the team irreparably, either through github actions and CI or by manually uploading a broken musicapp.py file we will need to manually restart the service.

To accomplish this we are setting up another microservice who's purpose is to restart our main app if it goes into a permanently failed state.

We are setting this up very similarly to our musicapp.py except we are setting up a simple restart command

```
from flask import Flask, render_template, request, redirect

app = Flask(__name__)
@app.route('/')
def index():
    return render_template('page.html')

@app.route('/process',  methods=["GET", "POST"])
def process():
    # The code here has been obscured

app.run(host='0.0.0.0', port=<port>)


```

The microservice takes a command and will issue a restart request to the systemd through the call function. While there is a dbus library, it doesn't currently work with the enviroment available to it.


