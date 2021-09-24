from pharmasoft import func
from flask.json import jsonify
from werkzeug.utils import secure_filename
from pharmasoft import app, mysql, bcrypt
from flask import request, session, redirect, url_for, render_template, flash

from pharmasoft.forms import RegistrationForm, LoginForm, Add_Product
from random import randint

import os

@app.route("/")
def pharmacy_home():
    if "pharmacy" in session:
        pharmacy = session["pharmacy"]
        cur = mysql.connection.cursor()
        
        transaction_results = cur.execute("SELECT * FROM transaction WHERE pharmacy_id=%s AND completed=False AND canceled=False", (str(pharmacy[0]), ))
        if transaction_results == 0:
            transactions = None
            return render_template("pharmacy/index.html", transactions=transactions)
        else:
            transactions = cur.fetchall()

        pharmacy_transaction = []
        for transaction in transactions:
            # Product Name
            cur.execute("SELECT * FROM product WHERE id=%s", (str(transaction[3]), ))
            product = cur.fetchall()[0]

            # Customer
            cur.execute("SELECT * FROM customer WHERE id=%s", (str(transaction[8]), ))
            customer = cur.fetchall()[0]

            pharmacy_transaction.append({
                "product name": product[1],
                "quantity": transaction[5],
                "total price": transaction[6],
                "customer name": customer[1],
                "customer email": customer[2],
                "customer contact": customer[3],
                "id": transaction[0],
                "random": randint(10000, 99999)
            })



        return render_template("pharmacy/index.html", transactions=pharmacy_transaction)

    else:
        flash("You must login", "danger")
        return redirect(url_for("pharmacy_login"))

@app.route("/get-transactions")
def get_transactions():
    if "pharmacy" in session:
        pharmacy = session["pharmacy"]
        cur = mysql.connection.cursor()
        
        transaction_results = cur.execute("SELECT * FROM transaction WHERE pharmacy_id=%s AND completed=False AND canceled=False", (str(pharmacy[0]), ))
        if transaction_results == 0:
            transactions = None
            return render_template("pharmacy/index.html", transactions=transactions)
        else:
            transactions = cur.fetchall()

        pharmacy_transaction = []
        for transaction in transactions:
            # Product Name
            cur.execute("SELECT * FROM product WHERE id=%s", (str(transaction[3]), ))
            product = cur.fetchall()[0]

            # Customer
            cur.execute("SELECT * FROM customer WHERE id=%s", (str(transaction[8]), ))
            customer = cur.fetchall()[0]

            pharmacy_transaction.append({
                "product name": product[1],
                "quantity": transaction[5],
                "total price": transaction[6],
                "customer name": customer[1],
                "customer email": customer[2],
                "customer contact": customer[3],
                "id": transaction[0],
                "random": randint(10000, 99999)
            })

        return render_template("pharmacy/transaction.html", transactions=pharmacy_transaction)

    
@app.route("/pharmacy/products")
def pharmacy_products():
    cur = mysql.connection.cursor()
    if "pharmacy" in session:
            pharmacy = session["pharmacy"]
            cur.execute("SELECT * FROM product WHERE pharmacy_id=%s", (str(pharmacy[0]),))
            products = cur.fetchall()
            return render_template("pharmacy/pharmacy.html", products=products)

    else:
        return redirect(url_for("pharmacy_login"))


@app.route("/pharmacy/register", methods=["GET", "POST"])
def pharmacy_register():
    cur = mysql.connection.cursor()
    form = RegistrationForm()
    if form.validate_on_submit():
        name = form.name.data
        email = form.email.data
        pharmacy_code = form.pharmacy_code.data
        location = form.location.data
        password = form.password.data

        pharmacy_result = cur.execute("SELECT * FROM pharmacy WHERE email=%s", (email,))
        if pharmacy_result:
            flash("Account already exists", "danger")
            return redirect(url_for("pharmacy_register"))

        pw_hash = bcrypt.generate_password_hash(password)
        cur.execute("INSERT INTO  pharmacy(name, email, pharmacy_code, location, password) VALUES(%s, %s, %s, %s, %s)", (name, email, pharmacy_code, location, pw_hash,))
        mysql.connection.commit()
        cur.close()

        flash("Registration Successful. Login Here", "success")
        print(pw_hash)
        return redirect(url_for("pharmacy_login"))
    
    return render_template("pharmacy/register.html", form=form)


@app.route("/pharmacy/login", methods=["POST", "GET"])
def pharmacy_login():
    cur = mysql.connection.cursor()
    form = LoginForm()
    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data

        pharmacy_results = cur.execute("SELECT * FROM pharmacy WHERE email=%s", (email,))
        if pharmacy_results:
            pharmacy = cur.fetchall()[0]

        else:
            flash(f"Account does not exist!", "danger")
            return redirect(url_for("pharmacy_login"))

        if bcrypt.check_password_hash(pharmacy[5], password):
            session.permanent = False
            session["pharmacy"] = pharmacy
            flash("Login Successfull", "success")
            return redirect(url_for("pharmacy_home"))

        else:
            flash("Invalid Password!!!!", "danger")

    return render_template("pharmacy/login.html", form=form)

@app.route("/pharmacy/profile")
def pharmacy_profile():
    if "pharmacy" in session:
        pharmacy_detail = session["pharmacy"]
        return jsonify({
            "id": pharmacy_detail[0],
            "name": pharmacy_detail[1],
            "email": pharmacy_detail[2],
            "location": pharmacy_detail[4],
             })
    else:
        flash("You must login", "danger")
        return redirect(url_for("pharmacy_login"))


@app.route("/pharmacy/logout")
def pharmacy_logout():
    if session["pharmacy"]:
        session.pop("pharmacy", default=None)

        # return jsonify({"login": False})
        flash("Logged Out Successfully", "success")
        return redirect(url_for("pharmacy_login"))
    
    else:
        flash("You must login", "danger")
        return redirect(url_for("pharmacy_login"))


@app.route("/pharmacy/add-product", methods=["POST", "GET"])
def add_product():
    if "pharmacy" in session:
        form = Add_Product()
        cur = mysql.connection.cursor()
        pharmacy = session["pharmacy"]

        if form.validate_on_submit():
            name = form.name.data
            price = form.price.data
            description = form.description.data
            prescribed = form.prescribed.data
            quantity = form.quantity.data

            file = secure_filename(form.file.data.filename)
            filename, format = file.split(".")
            filename = name + str(pharmacy[0]) + f".{format}"
            form.file.data.save(os.path.join(app.config["IMAGE_UPLOADS"]+"/server/pharmasoft/static/images/"+filename))

            cur.execute("INSERT INTO product(name, price, description, prescribed, image, quantity_available, pharmacy_id) VALUES(%s, %s, %s, %s, %s, %s, %s)", (name, price, description, prescribed, filename, quantity, str(pharmacy[0]),))
            mysql.connection.commit()
            cur.close()

            print(name, price, description, prescribed)
            flash(f"{name} added successfully", "success")
            return redirect(url_for("pharmacy_home"))

        return render_template("pharmacy/add_product.html", form=form )

    else:
        flash("You must login", "danger")
        return redirect(url_for("pharmacy_login"))

@app.route("/pharmacy/update-product/<product_id>", methods=["GET", "POST"])
def update_product(product_id):
    if "pharmacy" in session:
        cur = mysql.connection.cursor()
        pharmacy = session["pharmacy"]
        cur.execute("SELECT * FROM product WHERE id=%s", (str(product_id),))
        product = cur.fetchall()[0]
        form = Add_Product(
            name = product[1], 
            price = product[2], 
            prescribed=product[3], 
            description = product[4],
            image = product[5],
            quantity = product[6]
            )

        if form.validate_on_submit():
            name = form.name.data
            price = form.price.data
            description = form.description.data
            prescribed = form.prescribed.data
            quantity = form.quantity.data

            try:
                file = secure_filename(form.file.data.filename)
                filename, format = file.split(".")
                filename = name + str(pharmacy[0]) + f".{format}"
                form.file.data.save(os.path.join(app.config["IMAGE_UPLOADS"]+"/server/pharmasoft/static/images/"+filename))

            except:
                ...

            cur.execute("UPDATE product SET name=%s, price=%s, description=%s, prescribed=%s, image=%s, quantity_available=%s WHERE id=%s", (name, price, description, prescribed, product[5], quantity, str(product_id),))
            mysql.connection.commit()
            cur.close()

            print(name, price, description, prescribed)
            flash(f"{name} updated successfully", "success")
            return redirect(url_for("pharmacy_home"))

        return render_template("pharmacy/update_product.html", form=form, product=product)

    else:
        flash("You must login", "danger")
        return redirect(url_for("pharmacy_login"))


@app.route("/pharmacy/delete-product/<product_id>")
def delete_product(product_id):
    if "pharmacy" in session:
        cur = mysql.connection.cursor()

        cur.execute("SELECT * FROM product WHERE id=%s", (product_id,))
        product = cur.fetchall()[0]

        os.remove(os.path.join(app.config["IMAGE_UPLOADS"]+"/server/pharmasoft/static/images/"+product[5]))

        cur.execute("DELETE FROM product WHERE id=%s", (product_id,))
        mysql.connection.commit()
        cur.close()

        return redirect(url_for("pharmacy_home"))

    else:
        flash("You must login", "danger")
        return redirect(url_for("pharmacy_login"))

# @app.route("/pharmacy/complete-order/<id>")
@app.route("/pharmacy/complete-order")
def complete_order():
    if "pharmacy" in session:
        cur = mysql.connection.cursor()

        data = request.json
        id = data["id"]

        cur.execute("UPDATE transaction SET completed=True WHERE id=%s", (str(id), ))
        mysql.connection.commit()

        cur.execute("SELECT * FROM transaction WHERE id=%s", (str(id), ))
        transaction = cur.fetchall()[0]

        cur.execute("SELECT * FROM customer WHERE id=%s",(str(transaction[8]), ))
        customer = cur.fetchall()[0]

        cur.execute("SELECT * FROM product WHERE id=%s", (str(transaction[3]), ))
        product = cur.fetchall()[0]

        func.send_email(customer[2], [customer, product, transaction], "customer", "order-completed")

        # return redirect(url_for("pharmacy_home"))
        return jsonify({"msg": "Update Complete"})
        

    # else:
    #     flash("You must login", "danger")
    #     return redirect(url_for("pharmacy_login"))

@app.route("/pharmacy/cancel-order/<id>")
def cancel_order(id):
    if "pharmacy" in session:
        cur = mysql.connection.cursor()

        cur.execute("UPDATE transaction SET canceled=True WHERE id=%s", (str(id), ))
        mysql.connection.commit()

        cur.execute("SELECT * FROM transaction WHERE id=%s", (str(id), ))
        transaction = cur.fetchall()[0]

        cur.execute("SELECT * FROM customer WHERE id=%s",(str(transaction[8]), ))
        customer = cur.fetchall()[0]

        cur.execute("SELECT * FROM product WHERE id=%s", (str(transaction[3]), ))
        product = cur.fetchall()[0]

        func.send_email(customer[2], [customer, product, transaction], "customer", "order-canceled")

        return redirect(url_for("pharmacy_home"))
        

    else:
        flash("You must login", "danger")
        return redirect(url_for("pharmacy_login"))



