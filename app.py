from flask import Flask, request
from flask import render_template
from flask_cachebuster import CacheBuster

app = Flask(__name__)

#Cache buster
config = { 'extensions': ['.js', '.css', '.csv'], 'hash_size': 5 }
cache_buster = CacheBuster(config=config)
cache_buster.init_app(app)

appName = 'SemTrack'


@app.route("/")
def index(name="TrackMyCourses"):
    return render_template('index.html', name=appName, page="main")

@app.route("/courses/<course_name>")
def course_mark_view(course_name):
    return render_template('course.html',
                           course_name=course_name,
                           name=appName,
                           page="calc")

if __name__ == '__main__':
    app.run(debug=True)