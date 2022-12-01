from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'Initial!'

app.run(port=1222)