from flask_login.utils import login_user, logout_user, current_user
from pharmasoft import app, mysql
from flask import render_template, redirect, request, url_for
from pharmasoft import User

from pharmasoft import func

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

@app.route("/add-cart/<id>")
def add_cart(id):
    cur = mysql.connection.cursor()
    cart_results = cur.execute("SELECT * FROM cart WHERE Customer_id=%s AND complete=False", (current_user.id,))

    if cart_results == 0:
        cur.execute("INSERT INTO cart(Customer_id) VALUES(%s)",(current_user.id,))
        mysql.connection.commit()

        cur.execute("SELECT * FROM cart WHERE Customer_id=%s AND complete=False", (current_user.id,))
        cart = cur.fetchall()[0]

    else:
        cart = cur.fetchall()[0]

    cart_item_results = cur.execute("SELECT * FROM cart_item WHERE Cart_id=%s AND Product_id=%s",(cart[0], id,))
    if cart_item_results > 0:
        cart_item = cur.fetchall()[0]
        quantity = int(cart_item[1]) +1

        cur.execute("UPDATE cart_item SET Quantity=%s WHERE Cart_id=%s AND Product_id=%s", (quantity, cart[0], id))
        mysql.connection.commit()

    else:
        cur.execute("INSERT INTO cart_item(Quantity, Cart_id, Product_id) VALUES(1, %s, %s)", (cart[0], id))
        mysql.connection.commit()

    print("Product Added Successfully")
    return redirect(url_for("home"))

@app.route("/cart")
def cart():
    order = func.get_order()
    return render_template("cart.html", order=order)

@app.route("/update-cart/<action>/<id>")
def update_cart(action, id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM cart WHERE Customer_id=%s AND complete=False", (current_user.id,))
    cart = cur.fetchall()[0]

    cur.execute("SELECT * FROM cart_item WHERE Cart_id=%s AND Product_id=%s",(cart[0], id,))
    cart_item = cur.fetchall()[0]

    if action == "add":
        quantity = int(cart_item[1]) +1
    else:
        quantity = int(cart_item[1]) -1
        if quantity == 0:
            cur.execute("DELETE FROM cart_item WHERE id=%s",(cart_item[0],))
            mysql.connection.commit()
            return redirect(url_for("cart"))


    cur.execute("UPDATE cart_item SET Quantity=%s WHERE Cart_id=%s AND Product_id=%s", (quantity, cart[0], id))
    mysql.connection.commit()

    return redirect(url_for("cart"))

@app.route("/checkout")
def checkout():
    return "<h1>checkout</h1>"