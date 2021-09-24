from email import message
from math import e
from flask_login.utils import login_user, logout_user, current_user, login_required
from pharmasoft import app, mysql, bcrypt
from flask import json, render_template, redirect, request, url_for
from pharmasoft import User
from flask import jsonify, send_file

from datetime import datetime
from random import randint

from pharmasoft import func

# @app.route("/", defaults={"path": ""})
# @app.route("/<path:path>")
@app.route("/products")
def home():
    cur = mysql.connection.cursor()
    products = []
    return_results = cur.execute('''SELECT * FROM product''')
    if return_results > 0:
        product_details = cur.fetchall()
        # products = func.get_products(product_details)
        
        for product in product_details:
            cur.execute("SELECT * FROM pharmacy WHERE id=%s", (str(product[7]),))
            pharmacy = cur.fetchall()[0]

            product_detail ={
                "id": product[0],
                "name": product[1],
                "price": product[2],
                "prescribe": product[3],
                "description": product[4],
                "location": pharmacy[4],
                "image": url_for("product_image", image=product[5]),
            }

            products.append(product_detail)

        # return render_template('products.html' , product_details= product_details)
        return jsonify(products)
    return jsonify({"msg": "No Products Available"})

@app.route("/product-image/<image>")
def product_image(image):
    return send_file(f"static/images/{image}")

@app.route("/register", methods=["POST", "GET"])
def register():
    cur = mysql.connection.cursor()
    if request.method == "POST":
        data = request.json
        name = data["name"]
        email= data["email"]
        contact = data["phone"]
        password = data["password"]

        user_result = cur.execute("SELECT * FROM customer WHERE email=%s", (email,))
        if user_result:
            user_result = cur.execute("SELECT * FROM customer WHERE email=%s AND active=False", (email, )) 

            if user_result:
                func.generate_verification(email)
                return jsonify({"msg": "Account needs verification"})

            return jsonify({
                "msg": "Acount Already Exists",
                "registration": False
                })

        pw_hash = bcrypt.generate_password_hash(password)

        cur.execute("INSERT INTO  customer(name, email, contact, password) VALUES(%s, %s, %s, %s)", (name, email, contact, pw_hash,))
        mysql.connection.commit()
        cur.close()

        func.generate_verification(email)

        print("Registration Succesful")
        return jsonify({
            "msg": "Registration complete",
            "registration": True
            })

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

        
        user_results = cur.execute("SELECT * FROM customer WHERE email=%s and active=True", (email,))
        if user_results:
            user = cur.fetchall()[0]

        else:
            return jsonify({
                "login": False,
                "msg": "User not found"
            })


        if bcrypt.check_password_hash(user[4], password):
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

            })
    else:
        return jsonify({"msg": "User not logged in"})

@app.route("/validate-password", methods=["POST"])
def validate_password():
    cur = mysql.connection.cursor()
    data = request.json
    password = data["password"]

    cur.execute("SELECT * FROM customer WHERE id=%s", (current_user.id,))
    user = cur.fetchall()[0]

    if bcrypt.check_password_hash(user[4], password):
        return jsonify({"validate": True})

    else:
        return jsonify({"validate": False})

@app.route("/update-profile", methods=["POST"])
def update_profile():
    cur = mysql.connection.cursor()
    if request.method == "POST":
            data = request.json
            column = data["column"]
            update = data[column]

            if column == "password":
                update = bcrypt.generate_password_hash(update)
                cur.execute("UPDATE customer SET password=%s WHERE id=%s", (update, current_user.id,))
                mysql.connection.commit()
                cur.close()

            else:
                cur.execute("UPDATE customer SET contact=%s WHERE id=%s", (update, current_user.id,))
                mysql.connection.commit()
                cur.close()

            return jsonify({"msg": "Update successfull"})

@app.route("/add-cart", methods=["POST"])
@login_required
def add_cart():
    id =request.json["id"]
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
    # return redirect(url_for("home"))
    return jsonify({"msg": "Added to Cart"})

@app.route("/cart")
@login_required
def cart():
    order = func.get_order()
    
    return jsonify(order)
    # return render_template("cart.html", order=order)

@app.route("/update-cart", methods=["POST"])
@login_required
def update_cart():
    data = request.json
    id = data["id"]
    action = data["action"]

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM cart WHERE Customer_id=%s AND complete=False", (current_user.id,))
    cart = cur.fetchall()[0]

    cur.execute("SELECT * FROM cart_item WHERE Cart_id=%s AND Product_id=%s",(cart[0], id,))
    cart_item = cur.fetchall()[0]

    if action == "add":
        quantity = int(cart_item[1]) +1
    elif action == "remove":
        quantity = int(cart_item[1]) -1
        if quantity == 0:
            cur.execute("DELETE FROM cart_item WHERE id=%s",(cart_item[0],))
            mysql.connection.commit()
            # return redirect(url_for("cart"))
            return jsonify({"msg": "Deleted Product"})

    elif action == "delete":
        cur.execute("DELETE FROM cart_item WHERE id=%s",(cart_item[0],))
        mysql.connection.commit()
        return jsonify({"msg": "Deleted Product"})


    cur.execute("UPDATE cart_item SET Quantity=%s WHERE Cart_id=%s AND Product_id=%s", (quantity, cart[0], id))
    mysql.connection.commit()
    cur.close()

    return jsonify({"msg": "Updated cart successfully"})

@app.route("/update-cart-bulk", methods = ["POST"])
def update_cart_bulk():
    cart = request.json
    for cart_item in cart:
        id = cart_item["id"]
        quantity = cart_item["product quantity"]

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM cart WHERE Customer_id=%s AND complete=False", (current_user.id,))
        cart = cur.fetchall()[0]

        cur.execute("SELECT * FROM cart_item WHERE Cart_id=%s AND Product_id=%s",(cart[0], id,))
        # cart_item = cur.fetchall()[0]

        cur.execute("UPDATE cart_item SET Quantity=%s WHERE Cart_id=%s AND Product_id=%s", (quantity, cart[0], id))
        mysql.connection.commit()
        cur.close()

    return jsonify({"msg": "Updated cart successfully"})


@app.route("/clear-cart")
@login_required
def clear_cart():
    cur = mysql.connection.cursor()

    cur.execute("DELETE FROM cart WHERE customer_id=%s and complete=False", (str(current_user.id),))
    mysql.connection.commit()
    cur.close()

    return jsonify({"msg": "Cleared cart"})


@app.route("/checkout")
@login_required
def checkout():
    cur = mysql.connection.cursor()
    order = func.get_order()

    for item in order:
        cur.execute("SELECT * FROM product WHERE id=%s", (str(item["id"]),))
        product = cur.fetchall()[0]

        cur.execute("SELECT * FROM pharmacy WHERE id=%s", (str(product[7]),))
        pharmacy = cur.fetchall()[0]

        cur.execute("SELECT * FROM customer WHERE id=%s", (current_user.id,))
        customer = cur.fetchall()[0]

        message = [item, customer]
        func.send_email(pharmacy[2], message, "pharmacy", None)

        cur.execute("SELECT * FROM cart WHERE customer_id=%s AND complete=False", (str(current_user.id), ))
        cart = cur.fetchall()[0]

        cur.execute("INSERT INTO transaction(product_id, cart_id, quantity, total_price, pharmacy_id, customer_id) VALUES(%s, %s, %s, %s, %s, %s)",(str(product[0]), str(cart[0]), str(item["product quantity"]), str(item["total price"]), str(pharmacy[0]), str(current_user.id), ))
        mysql.connection.commit()

        quantity_available = product[6] - item["product quantity"]
        cur.execute("UPDATE product SET quantity_available=%s WHERE id=%s", (quantity_available ,str(item["id"]),))
        mysql.connection.commit()

    cur.execute("UPDATE cart SET complete=True WHERE customer_id=%s AND complete=False", (current_user.id,))
    mysql.connection.commit()
    cur.close()
    
    return jsonify({"msg": "checkout complete"})

@app.route("/transactions", methods = ["POST"])
@login_required
def transactions():
    cur = mysql.connection.cursor()
    data = request.json
    customer_id = data["customer_id"]

    cur.execute("SELECT * FROM transaction WHERE customer_id=%s", (str(customer_id), ))
    _transactions = cur.fetchall()

    transactions = []
    for transaction in _transactions:
        cur.execute("SELECT * FROM product WHERE id=%s", (str(transaction[3]), ))
        product = cur.fetchall()[0]

        transactions.append({
            "product_name": product[1],
            "quantity": transaction[5],
            "total price": transaction[6],
            "cart_id": transaction[4],
            "completed": transaction[1],
            "canceled": transaction[2],
        })

    return jsonify(transactions)


@app.route("/verify-email", methods=["POST"])
def verify_email():
    cur = mysql.connection.cursor()

    data = request.json
    action = data["action"]
    email = data["email"]
    ver_code = data["code"]
    current_time = datetime.now()
    verification_code = func.verification_code
    
    seconds_in_days = 24 * 60 * 60
    time_diff = current_time - verification_code["time_stamp"]
    time = divmod(time_diff.days * seconds_in_days + time_diff.seconds, 60)

    print(time, ver_code)

    
    if time[0] < 30:
        if  ver_code == verification_code["code"]:
            if action == "activate":
                cur.execute("UPDATE customer SET active=True WHERE email=%s", (email, ))
                mysql.connection.commit()

                # cur.execute("SELECT * FROM customer WHERE email=%s AND active=True", (email, ))
                # customer = cur.fetchall()[0]
                # user_model = User()
                # user_model.id = customer[0]
                # login_user(user_model)

                return jsonify({
                    "msg": "Account activated",
                    "verified": True
                    })

            else:
                return jsonify({
                    "msg": "Acount verified",
                    "verified": True
                    })

        else:
            return jsonify({
                "msg": "invalid code",
                "verifeid": False
                })

    else:
        return jsonify({
            "msg": "code is expired or",
            "verifeid": False
            })

@app.route("/forgot-password", methods=["POST"])
def forgot_password():
    cur = mysql.connection.cursor()
    data = request.json
    email = data["email"]

    customer_results = cur.execute("SELECT * FROM customer WHERE email=%s AND active=True", (email, ))
    if customer_results == 0:
        return jsonify({"msg": "Account does not exist"})

    func.generate_verification(email)

    return jsonify({"msg": "verification code has been sent to email"})

@app.route("/articles")
def articles():
    return jsonify(func.get_articles())