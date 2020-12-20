from flask import Flask, request
from flask import render_template
from livereload import Server #live reload so we don't have to run everytime.

from calculate import GPACalculator
from processor import dict_converter

app = Flask(__name__)


@app.route("/")
def index(name="Abdullah"):
    return render_template('index.html', name=name)


@app.route('/calculate', methods=['POST'])
def calculate():
    if request.method == 'POST':
        data = dict_converter(request.form)
        G = GPACalculator(data)
        #return render_template('index.html', gpa=str(G.calculate_gpa()),
        #                       mark=G.calculate_mark(data))
        return {'gpa': G.calculate_gpa(), 'mark': G.calculate_mark(data)}


if __name__ == '__main__':
    app.run()
