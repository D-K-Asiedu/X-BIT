from flask_login.utils import login_user, logout_user, current_user
from pharmasoft import app, mysql
from flask import render_template, redirect, request, url_for
from pharmasoft import User

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def home(path):
    cur = mysql.connection.cursor()
    return_results = cur.execute('''SELECT * FROM product''')
    if return_results > 0:
        product_details = cur.fetchall()
        return render_template('products.html' , product_details= product_details)
    return "<h1>No Products Available</h1>"

@app.route("/register", methods=["POST", "GET"])
def register():
    cur = mysql.connection.cursor()
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        contact = request.form["contact"]
        password = request.form["password"]

        cur.execute("INSERT INTO  customer(Name, Email, Contact, Password) VALUES(%s, %s, %s, %s)", (name, email, contact, password,))
        mysql.connection.commit()
        cur.close()

        print("Registration Succesful")

    return render_template("register.html")

@app.route("/login", methods=["POST", "GET"])
def login():
    cur = mysql.connection.cursor()
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        cur.execute("SELECT * FROM customer WHERE email=%s", (email,))
        user = cur.fetchall()[0]

        if user[2] == email and user[4] == password:
            user_model = User()
            user_model.id = user[0]
            login_user(user_model)

            print(current_user.id)
            return redirect(url_for("home"))
    return render_template("login.html")

@app.route("/logout")
def logout():
    logout_user()
    return  redirect(url_for("home"))

@app.route("/add-cart")
def add_cart():
    return "<h1>Add Cart</h1>"

@app.route("/cart")
def cart():
    return "<h1>Cart</h1>"

@app.route("/checkout")
def checkout():
    return "<h1>checkout</h1>"