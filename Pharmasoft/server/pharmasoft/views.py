from pharmasoft import app, mysql
from flask import render_template, request

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def home(path):
    cur = mysql.connection.cursor()
    # cur.execute('''INSERT INTO product (Product_id,Name,Price,Expiry_date) VALUES (1, 'Paracetamol' , 2.00 , NULL)''')
    # cur.execute('''INSERT INTO product VALUES (NULL , 'Lonart' , 20.00 , NULL )''')
    # cur.execute('''INSERT INTO product VALUES (NULL , 'Citro C' , 1.50 , NULL)''')
    # cur.execute('''INSERT INTO product VALUES (NULL , 'Bioferon' , 8.00, NULL )''')
    # cur.execute('''INSERT INTO product VALUES (NULL , 'Ibuprofen' , 1.00, NULL )''')
    # cur.execute('''INSERT INTO product VALUES (NULL , 'Efpac' , 4.00, NULL )''')
    # cur.execute('''INSERT INTO product VALUES (NULL , 'Martins Liver Salt' , 2.50, NULL )''')
    # cur.execute('''INSERT INTO product VALUES (NULL , 'phil Liver Salt' , 2.50, NULL )''')
    mysql.connection.commit()
    return_results = cur.execute('''SELECT * FROM product''')
    if return_results > 0:
        product_details = cur.fetchall()
        return render_template('products.html' , product_details= product_details)
    return "<h1>No Products Available</h1>"

@app.route("/login")
def login():
    return "<h1>Login</h1>"

@app.route("/logout")
def logout():
    return "<h1>Logout</h1>"

@app.route("/register", methods=["POST", "GET"])
def register():
    cur = mysql.connection.cursor()
    if request.method == "POST":
        name = request.form["name"]
        password = request.form["password"]
        email = request.form["email"]
        contact = request.form["contact"]

        print(name, email, contact, password)

    return render_template("index.html")

@app.route("/add-cart")
def add_cart():
    return "<h1>Add Cart</h1>"

@app.route("/cart")
def cart():
    return "<h1>Cart</h1>"

@app.route("/checkout")
def checkout():
    return "<h1>checkout</h1>"