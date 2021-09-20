from flask_login.utils import login_user, logout_user, current_user, login_required
from pharmasoft import app, mysql, bcrypt
from flask import render_template, redirect, request, url_for
from pharmasoft import User
from flask import jsonify, send_file

from pharmasoft import func

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def home(path):
    cur = mysql.connection.cursor()
    return_results = cur.execute('''SELECT * FROM product''')
    if return_results > 0:
        product_details = cur.fetchall()
        products = func.get_products(product_details)
        # return render_template('products.html' , product_details= product_details)
        return jsonify(products)
    return "<h1>No Products Available</h1>"

@app.route("/product-image/<image>")
def product_image(image):
    return send_file(f"static/images/{image}")

@app.route("/register", methods=["POST", "GET"])
def register():
    cur = mysql.connection.cursor()
    if request.method == "POST":
        # name = request.form["name"]
        # email = request.form["email"]
        # contact = request.form["contact"]
        # password = request.form["password"]

        data = request.json
        name = data["name"]
        email= data["email"]
        contact = data["phone"]
        password = data["password"]

        user_result = cur.execute("SELECT * FROM customer WHERE email=%s", (email,))
        if user_result:
            return jsonify({"msg": "Acount Already Exists"})

        pw_hash = bcrypt.generate_password_hash(password)

        cur.execute("INSERT INTO  customer(name, email, contact, password) VALUES(%s, %s, %s, %s)", (name, email, contact, pw_hash,))
        mysql.connection.commit()
        cur.close()

        print("Registration Succesful")
        return jsonify({"msg": "Registration complete"})

    # return render_template("register.html")
    return jsonify({"msg": "Register Here"})

@app.route("/login", methods=["POST"])
def login():
    cur = mysql.connection.cursor()
    if request.method == "POST":
        # email = request.form["email"]
        # password = request.form["password"]

        data = request.json
        email = data["email"]
        password = data["password"]

        
        user_results = cur.execute("SELECT * FROM customer WHERE email=%s", (email,))
        if user_results:
            user = cur.fetchall()[0]

        else:
            return jsonify({
                "login": False,
                "msg": "User not found"
            })


        if bcrypt.check_password_hash(user[6], password):
        # if user[2] == email and user[5] == password:
            user_model = User()
            user_model.id = user[0]
            login_user(user_model)

            print(current_user.id)
            # return redirect(url_for("home")) 
            return jsonify({"login": True})

        else:
            return jsonify({
                "login": False,
                "msg": "Invalid Password"
                })
    # return render_template("login.html")


@app.route("/logout")
@login_required
def logout():
    logout_user()
    # return  redirect(url_for("home")) 
    return jsonify({"login": False})

@app.route("/profile", methods=["GET", "PUT"])
@login_required
def profile():
    if current_user.is_authenticated:
        cur = mysql.connection.cursor()
        if request.method == "GET":
            cur.execute("SELECT * FROM customer WHERE id=%s", (current_user.id,))
            profile = cur.fetchall()[0]
            return jsonify({
                "id": profile[0],
                "name": profile[1],
                "email": profile[2],
                "contact": profile[3],
                "image": profile[4],
                "password": profile[5],

            })

        elif request.method == "PUT":
            data = request.json
            contact = data["contact"]
            password = data["password"]

            pw_hash = bcrypt.generate_password_hash(password)
            
            cur.execute("UPDATE customer SET contact=%s, password=%s WHERE id=%s", (contact, pw_hash, current_user.id,))
            mysql.connection.commit()
            cur.close()

            return jsonify({"msg": "Update successfull"})

    else:
        return jsonify({"msg": "User not logged in"})

@app.route("/validate-password", methods=["POST"])
def validate_password():
    cur = mysql.connection.cursor()
    data = request.json
    password = data["password"]

    cur.execute("SELECT * FROM customer WHERE id=%s", (current_user.id,))
    user = cur.fetchall()[0]

    if bcrypt.check_password_hash(user[6], password):
        return jsonify({"msg": "Invalid Password"})

    else:
        return jsonify({"msg": "Invalid Passwod"})

@app.route("/add-cart/<id>")
@login_required
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
@login_required
def cart():
    order = func.get_order()
    return render_template("cart.html", order=order)

@app.route("/update-cart/<action>/<id>")
@login_required
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
@login_required
def checkout():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM customer WHERE id=%s", (current_user.id,))
    customer = cur.fetchall()[0]
    order = func.get_order()

    
    return "<h1>checkout</h1>"