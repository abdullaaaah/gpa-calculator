from flask import Flask
from flask import render_template


app = Flask(__name__)

@app.route("/")
def index(name="Abdullah"):
    return render_template('index.html', name=name)