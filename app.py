from flask import Flask, request
from flask import render_template

app = Flask(__name__)

@app.route("/")
def index(name="GPATrack"):
    return render_template('index.html', name=name, page="main")

@app.route("/courses/<course_name>")
def course_mark_view(course_name):
    return render_template('course.html',course_name=course_name, page="calc")

if __name__ == '__main__':
    app.run()
