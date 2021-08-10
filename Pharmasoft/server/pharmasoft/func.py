from pharmasoft import mysql
from flask_login import current_user

def get_order():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM cart WHERE Customer_id=%s AND complete=False", (current_user.id,))
    cart = cur.fetchall()[0]

    cur.execute("SELECT * FROM cart_item WHERE Cart_id=%s", (cart[0],))
    cart_item = cur.fetchall()

    order = []
    for item in cart_item:
        cur.execute("SELECT * FROM product WHERE id=%s",(item[3],))
        product = cur.fetchall()[0]

        item_name = product[1]
        item_quantity = item[1]
        item_price = int(item_quantity) * int(product[2])

        order.append([item_name, item_quantity, item_price, product[0]])
    print(order)
    return order