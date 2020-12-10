from flask import Flask, request
from flask import render_template
import calculate, processor

app = Flask(__name__)


@app.route("/")
def index(name="Abdullah"):
    return render_template('index.html', name=name)


@app.route('/calculate', methods=['POST'])
def calculate():
    if request.method == 'POST':
        return request.form


if __name__ == '__main__':
    app.run()
