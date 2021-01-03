from flask import Flask, request
from flask import render_template
from flask_cachebuster import CacheBuster

application = Flask(__name__)

#Cache buster
config = { 'extensions': ['.js', '.css', '.csv'], 'hash_size': 5 }
cache_buster = CacheBuster(config=config)
cache_buster.init_app(application)

appName = 'SemTrack'


@application.route("/")
def index(name="TrackMyCourses"):
    return render_template('index.html', name=appName, page="main")

@application.route("/courses/<course_name>")
def course_mark_view(course_name):
    return render_template('course.html',
                           course_name=course_name,
                           name=appName,
                           page="calc")

@application.route("/settings")
def settings():
    return render_template('settings.html',
                           name=appName,
                           page="settings")




if __name__ == '__main__':
    application.run(debug=True)