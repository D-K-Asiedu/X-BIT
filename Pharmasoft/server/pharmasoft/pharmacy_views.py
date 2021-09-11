from flask.json import jsonify
from pharmasoft import app, mysql
from flask import request, session, redirect, url_for

@app.route("/pharmacy")
def pharmacy_home():
    try:
        if session["pharmacy"]:
            return "<h1>Pharmacy Home</h1>"

    except:
        return jsonify({"msg": "You must Login"})



@app.route("/pharmacy/register", methods=["GET", "POST"])
def pharmacy_register():
    cur = mysql.connection.cursor()
    if request.method == "POST":
        data = request.json
        name = data["name"]
        email = data["email"]
        pharmacy_code = data["pharmacy_code"]
        pharmacy_code = data["pharmacy_code"]

        cur.execute("INSERT INTO  pharmacy(name, email, pharmacycode) VALUES(%s, %s, %s)", (name, email, pharmacy_code,))
        mysql.connection.commit()
        cur.close()

        return jsonify({"mge": "Registration Complete"})
    
    return "<h1>Pharmacy Register</h1>"


@app.route("/pharmacy/login", methods=["POST", "GET"])
def pharmacy_login():
    cur = mysql.connection.cursor()
    if request.method == "POST":
        data = request.json
        email = data["email"]
        pharmacy_code = data["pharmacy_code"]

        cur.execute("SELECT * FROM pharmacy WHERE email=%s", (email,))
        pharmacy = cur.fetchall()[0]

        if pharmacy[2] == email and pharmacy[3] == pharmacy_code:
            session["pharmacy"] = pharmacy

            return jsonify({"login": True})

    return "<h1>Pharmacy Login</h1>"

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

            return jsonify({"login": False})

    except:
        return jsonify({"msg": "You must Login"})







