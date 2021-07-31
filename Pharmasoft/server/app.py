from flask import Flask,render_template,redirect,request
from flask_mysqldb import MySQL 
import yaml

app = Flask(__name__)

#connecting flask application with MySQL
db = yaml.load(open('db.yaml'))


app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']


mysql = MySQL(app)


#creating and executing sql commands with the cursor
@app.route('/', methods= ['GET','POST'])
def products():
    cur = mysql.connection.cursor()
    #cur.execute('''INSERT INTO product (Product_id,Name,Price,Expiry_date) VALUES (1, 'Paracetamol' , 2.00 , NULL)''')
    #cur.execute('''INSERT INTO product VALUES (NULL , 'Lonart' , 20.00 , NULL )''')
    #cur.execute('''INSERT INTO product VALUES (NULL , 'Citro C' , 1.50 , NULL)''')
    #cur.execute('''INSERT INTO product VALUES (NULL , 'Bioferon' , 8.00, NULL )''')
    #cur.execute('''INSERT INTO product VALUES (NULL , 'Ibuprofen' , 1.00, NULL )''')
    #cur.execute('''INSERT INTO product VALUES (NULL , 'Efpac' , 4.00, NULL )''')
    #cur.execute('''INSERT INTO product VALUES (NULL , 'Martins Liver Salt' , 2.50, NULL )''')
    #cur.execute('''INSERT INTO product VALUES (NULL , 'phil Liver Salt' , 2.50, NULL )''')
    mysql.connection.commit()
    return_results = cur.execute('''SELECT * FROM product''')
    if return_results > 0:
        product_details = cur.fetchall()
        return render_template('products.html' , product_details= product_details)



if __name__ == "__main__":
    app.run(debug='True')
