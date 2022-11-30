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

TODO: Spin up a flask app that can be accessed from an endpoint on our server

TODO: Setup SFTP and FTPS access to the location on the server that the flask app is running

TODO: Potentially register a unique domain name

TODO: Setup a restart service script that will reload the flask app
