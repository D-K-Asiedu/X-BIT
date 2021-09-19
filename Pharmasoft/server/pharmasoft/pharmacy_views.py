from flask.json import jsonify
from werkzeug.utils import secure_filename
from pharmasoft import app, mysql
from flask import request, session, redirect, url_for, render_template, flash

from pharmasoft.forms import RegistrationForm, LoginForm, Add_Product

import os

@app.route("/pharmacy")
def pharmacy_home():
    try:
        if session["pharmacy"]:
            return render_template("pharmacy/pharmacy.html")

    except:
        return redirect(url_for("pharmacy_login"))



@app.route("/pharmacy/register", methods=["GET", "POST"])
def pharmacy_register():
    cur = mysql.connection.cursor()
    # if request.method == "POST":
    #     data = request.json
    #     name = data["name"]
    #     email = data["email"]
    #     pharmacy_code = data["pharmacy_code"]
    #     pharmacy_code = data["pharmacy_code"]

    #     cur.execute("INSERT INTO  pharmacy(name, email, pharmacycode) VALUES(%s, %s, %s)", (name, email, pharmacy_code,))
    #     mysql.connection.commit()
    #     cur.close()

    form = RegistrationForm()
    if form.validate_on_submit():
        name = form.name.data
        email = form.email.data
        pharmacy_code = form.pharmacy_code.data
        location = form.location.data
        password = form.password.data

        cur.execute("INSERT INTO  pharmacy(name, email, pharmacy_code, location, password) VALUES(%s, %s, %s, %s, %s)", (name, email, pharmacy_code, location, password,))
        mysql.connection.commit()
        cur.close()

        flash("Registration Successful. Login Here", "success")
        return redirect(url_for("pharmacy_login"))
    
    return render_template("pharmacy/register.html", form=form)


@app.route("/pharmacy/login", methods=["POST", "GET"])
def pharmacy_login():
    cur = mysql.connection.cursor()
    # if request.method == "POST":
    #     data = request.json
    #     email = data["email"]
    #     pharmacy_code = data["pharmacy_code"]

    #     try:
    #         cur.execute("SELECT * FROM pharmacy WHERE email=%s", (email,))
    #         pharmacy = cur.fetchall()[0]

    #     except:
    #         return redirect(url_for("pharmacy_register"))

    #     if pharmacy[2] == email and pharmacy[3] == pharmacy_code:
    #         session["pharmacy"] = pharmacy

    form = LoginForm()
    if form.validate_on_submit():
        email = form.email.data
        pharmacy_code = form.password.data

        try:
            cur.execute("SELECT * FROM pharmacy WHERE email=%s", (email,))
            pharmacy = cur.fetchall()[0]

        except:
            flash(f"Account does not exist!", "danger")
            return redirect(url_for("pharmacy_login"))

        if pharmacy[2] == email and pharmacy[3] == pharmacy_code:
            session["pharmacy"] = pharmacy
            flash("Login Successfull", "success")
            return redirect(url_for("pharmacy_home"))

        else:
            flash("Invalid Password!!!!", "danger")

    return render_template("pharmacy/login.html", form=form)

@app.route("/pharmacy/profile")
def pharmacy_profile():
    try:
        if session["pharmacy"]:
            pharmacy_detail = session["pharmacy"]
            return jsonify({
                "id": pharmacy_detail[0],
                "name": pharmacy_detail[1],
                "email": pharmacy_detail[2],
                "location": pharmacy_detail[4],
                })

    except:
        return jsonify({"msg": "You must Login"})

@app.route("/pharmacy/logout")
def pharmacy_logout():
    try:
        if session["pharmacy"]:
            session.pop("pharmacy", default=None)

            # return jsonify({"login": False})
            flash("Logged Out Successfully", "success")
            return redirect(url_for("pharmacy_login"))

    except:
        return jsonify({"msg": "You must Login"})

@app.route("/pharmacy/add-product", methods=["POST", "GET"])
def add_product():
    form = Add_Product()
    cur = mysql.connection.cursor()
    pharmacy = session["pharmacy"]
    # if request.method == "POST":
    #     data = request.form
    #     name = data["name"]
    #     price = data["price"]
    #     description = data["description"]
    #     prescribe = True if data["prescribe"] == "on" else False

    #     cur.execute("INSERT INTO product(name, price,pharmacy_id) VALUES(%s, %s, %s)", (name, price, str(pharmacy[0]),))
    #     mysql.connection.commit()
    #     cur.close()


    #     if request.files:
    #         image = request.files["image"]
    #         image.save(os.path.join(app.config["IMAGE_UPLOADS"], image.filename))
    #         print(image.filename + " saved successfully")

    #     print(name, price, description, prescribe)
    #     flash(f"{name} added successfully", "success")
    #     return redirect(url_for("pharmacy_home"))

    if form.validate_on_submit():
        name = form.name.data
        price = form.price.data
        description = form.description.data
        prescribe = form.prescribed.data

        filename = secure_filename(form.file.data.filename)
        form.file.data.save(os.path.join(app.config["IMAGE_UPLOADS"]+"/server/pharmasoft/static/images/"+filename))
        
        cur.execute("INSERT INTO product(name, price,pharmacy_id) VALUES(%s, %s, %s)", (name, price, str(pharmacy[0]),))
        # mysql.connection.commit()
        cur.close()

        print(name, price, description, prescribe)
        flash(f"{name} added successfully", "success")
        return redirect(url_for("pharmacy_home"))

    return render_template("pharmacy/add_product.html", form=form )







