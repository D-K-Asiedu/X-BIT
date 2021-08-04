from flask import Flask
from flask_mysqldb import MySQL
from flask_login import LoginManager, UserMixin, login_user, logout_user

app = Flask(__name__)

app.config["MYSQL_HOST"] = 'localhost'
app.config["MYSQL_USER"] = 'root'
app.config["MYSQL_PASSWORD"] = 'goodmorning'
app.config["MYSQL_DB"] = 'pharmacy'

mysql = MySQL(app)

from pharmasoft import views