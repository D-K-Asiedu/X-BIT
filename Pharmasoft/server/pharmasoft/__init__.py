from flask import Flask
from flask_mysqldb import MySQL
from flask_login import LoginManager, UserMixin, login_user, logout_user

app = Flask(__name__)

app.config["SECRET_KEY"] = "coded"
app.config["MYSQL_HOST"] = 'localhost'
app.config["MYSQL_USER"] = 'root'
app.config["MYSQL_PASSWORD"] = 'goodmorning'
app.config["MYSQL_DB"] = 'pharmasoft'

app.config["IMAGE_UPLOADS"] = r"F:\Projects\Python\X-bit\Pharmasoft\server\pharmasoft\static\images"


mysql = MySQL(app)
login_manager = LoginManager(app)

class User(UserMixin):
    ...

@login_manager.user_loader
def user_loader(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM customer WHERE id=%s", (id,))
    user = cur.fetchall()[0]

    user_model = User()
    user_model.id = user[0]

    return user_model

from pharmasoft import customer_views
from pharmasoft import pharmacy_views