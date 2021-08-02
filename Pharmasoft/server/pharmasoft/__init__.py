from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config["MYSQL_HOST"] = 'localhost'
app.config["MYSQL_USER"] = 'root'
app.config["MYSQL_PASSWORD"] = 'goodmorning'
app.config["MYSQL_DB"] = 'pharmasoft'

mysql = MySQL(app)

from pharmasoft import views