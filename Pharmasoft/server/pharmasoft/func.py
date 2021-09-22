from flask.json import jsonify
from pharmasoft import mysql
from flask_login import current_user
from flask import url_for

import smtplib
from email.message import EmailMessage

def get_order():
    order = []
    cur = mysql.connection.cursor()
    cart_results = cur.execute("SELECT * FROM cart WHERE Customer_id=%s AND complete=False", (current_user.id,))
    if cart_results == 0:
        order = {"msg": "No Cart Available"}
        return order

    cart = cur.fetchall()[0]

    cur.execute("SELECT * FROM cart_item WHERE Cart_id=%s", (cart[0],))
    cart_item = cur.fetchall()

    for item in cart_item:
        cur.execute("SELECT * FROM product WHERE id=%s",(item[3],))
        product = cur.fetchall()[0]

        item_name = product[1]
        item_quantity = item[1]
        item_price = int(item_quantity) * int(product[2])

        order.append({
            "product name":item_name, 
            "product quantity": item_quantity, 
            "total price": item_price, 
            "id":product[0],
            "image": url_for("product_image", image=product[5])
            })
    print(order)
    return order


def send_email(reciever_email, message, user, action):
    email = "alvisfinnegan@gmail.com"
    password = "codename01"

    msg = EmailMessage()
    msg['From'] = email
    msg['To'] = reciever_email

    if user == "pharmacy":
        msg['Subject'] = "Pharmasoft Order"

        msg.add_alternative(f"""\
            <!DOCTYPE html>
            <html>
            <body>
            <h1>Order</h1>
            <h3>{message[0]["product name"]}</h3>
            <h3>QANTITY: {message[0]["product quantity"]}</h3>
            <h4>PRICE: {message[0]["total price"]}</h4>

            <h1>Customer</h1>
            <h3>{message[1][1]}</h3>
            <h3>Email: {message[1][2]}</h3>
            <h3>Contact: {message[1][3]}</h3>
            </body>
            </html>
            """, subtype="html")

    else:
        msg['Subject'] = "Pharmasoft"

        if action == "order-completed":
            msg.add_alternative(f"""\
            <!DOCTYPE html>
            <html>
            <body>
            <p>Hello {message[0][1]}, </p>
            <p>Your order for <b>{message[1][1]}</b> is complete. You will be recieving product very soon</p>
            
            <h3>Order</h3>
            <p>Product Name: {message[1][1]}</p>
            <p>Quantity: {message[2][5]}</p>
            <p>Price: {message[2][6]} GHC</p>
            
            </body>
            </html>
            """, subtype="html")

        elif action == "order-canceled":
            msg.add_alternative(f"""\
            <!DOCTYPE html>
            <html>
            <body>
            <p>Hello {message[0][1]}, </p>
            <p>We are sorry to inform you that your order <b>{message[1][1]}</b> could not be honored. We apologise for apologize for any inconveniences</p>
            
            <h3>Order</h3>
            <p>Product Name: {message[1][1]}</p>
            <p>Quantity: {message[2][5]}</p>
            <p>Price: {message[2][6]} GHC</p>
            
            </body>
            </html>
            """, subtype="html")

        else:
            msg.set_content("Check Out")

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(email, password)
        server.send_message(msg)
