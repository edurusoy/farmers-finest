import os
from flask import Flask,render_template,request,jsonify,json,make_response,session
from db_init import initialize
from psycopg2 import extensions
from farmer_table import farmer
from customer_table import customer
import psycopg2 as dbapi2
import base64
import collections

extensions.register_type(extensions.UNICODE)
extensions.register_type(extensions.UNICODEARRAY)

app = Flask(__name__)
app.secret_key = "shopping"

os.environ['DATABASE_URL'] = "dbname='postgres' user='postgres' host='localhost' password='123galata4'"
initialize(os.environ.get('DATABASE_URL'))


def get_response(code):
    response = response = app.response_class(
                    response="tjddgtj",
                    status=code,
                    mimetype='application/json'
                )
    return response

@app.route("/SignUpFarmer", methods=["GET","POST"])
def signup_farmer():
    data = json.loads(request.data)
    farmer.name =  data["firstName"]
    farmer.email = data["email"]
    farmer.password=  data["password"]
    farmer.phonenumber =  data["phoneNumber"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("INSERT INTO farmer (farmerid,name,email,password,phonenumber,avgfarmerrate) VALUES (DEFAULT, %s, %s, %s, %s, DEFAULT)",(farmer.name, farmer.email, farmer.password, farmer.phonenumber));
        conn.commit()
        conn.close()
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)

@app.route("/SignUpCustomer", methods=["GET","POST"])
def signup_customer():
    data = json.loads(request.data)
    customer.name =  data["firstName"]
    customer.email = data["email"]
    customer.password=  data["password"]
    customer.phonenumber =  data["phoneNumber"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("INSERT INTO customer (customerid,name,email,password,phonenumber) VALUES (DEFAULT, %s, %s, %s, %s)",(customer.name, customer.email, customer.password, customer.phonenumber));
        conn.commit()
        conn.close()
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)

@app.route("/SignInFarmer", methods=["GET","POST"])
def signin_farmer():
    data = json.loads(request.data)
    farmer.email = data["email"]
    farmer.password = data["password"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT farmerid FROM farmer WHERE email = %s AND password = %s ",(farmer.email, farmer.password))
        farmer.farmerid = cur.fetchone()
        conn.commit()
        conn.close()
        if farmer.farmerid is not None:
            session["farmer"] = farmer.farmerid
            print(farmer.farmerid)
            return get_response(200)
        else:
            return get_response(498)
    except Exception as e:
        print(e)
        return get_response(417)

@app.route("/SignInCustomer", methods=["GET","POST"])
def signin_customer():
    data = json.loads(request.data)
    customer.email = data["email"]
    customer.password = data["password"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT customerid FROM customer WHERE email = %s AND password = %s ",(customer.email, customer.password))
        customer.customerid = cur.fetchone()
        conn.commit()
        conn.close()
        if customer.customerid is not None:
            print(customer.customerid)
            session["customer"] = customer.customerid
            return get_response(200)
        else:
            return get_response(498)
    except Exception as e:
        print(e)
        return get_response(417)

@app.route("/LogoutCustomer", methods=["GET","POST"])
def logout_customer():
    try:
        session.pop("customer", None)
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)

@app.route("/LogoutFarmer", methods=["GET","POST"])
def logout_farmer():
    try:
        session.pop("farmer", None)
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/AddProduct", methods=["GET","POST"])
def add_product():
    data = json.loads(request.data)
    productname = data["productName"]
    productamount = data["amount"]
    productprice = data["unitPrice"]
    productcategory = data["category"]
    productdetails = data["details"]
    farmerid = session["farmer"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("INSERT INTO product (productid,name,amount,unitprice,category,avgparoductrate,details,farmerid) VALUES (DEFAULT, %s, %s, %s, %s, DEFAULT, %s, %s)", (productname,productamount,productprice, productcategory, productdetails, farmerid))
        conn.commit()
        conn.close()
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/UploadImage", methods=["GET","POST"])
def upload_image():
    image = request.files['image']
    image_string = base64.b64encode(image.read())
    product_id=3
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("INSERT INTO productimage (imageid, imagefile, productid) VALUES(DEFAULT, %s, %s)", (image_string, product_id))
        conn.commit()
        conn.close()
        print(image_string)
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/GetProductsFarmer")
def get_products():
    farmer_id=session["farmer"]
    objects_list = []
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT * FROM product WHERE farmerid=%s", (farmer_id))
        products=cur.fetchall()
        for row in products:
            d = collections.OrderedDict()
            d["id"]=row[0]
            d["name"]=row[1]
            d["amount"]=row[2]
            d["price"]=row[3]
            d["category"]=row[4]
            d["rate"]=row[5]
            d["details"]=row[6]
            d["farmer"]=row[7]
            objects_list.append(d)
        conn.commit()
        conn.close()
        j=json.dumps(objects_list)
        return j
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/GetImage")
def get_image():
    image_id='3'
    image_list =[]
    data = dict()
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT imagefile FROM productimage WHERE imageid = %s", (image_id))
        image_file=cur.fetchone()
        #print(image_file)
        image=(image_file[0])
        image_list.append(image)
        j = json.dumps(image_list)
        #final_image= {'files':image_list}
        conn.commit()
        conn.close()
        #return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)
    return j

@app.route("/SetProductId", methods=["GET","POST"])
def set_productid():
    data = json.loads(request.data)
    product_id=data["id"]
    try:
        session["product"] = product_id
        print(product_id)
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/GetProductandFarmer")
def get_productsandfarmer():
    info_list=[]
    productidd=session["product"]
    print(productidd)
    try:
            conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
            cur = conn.cursor()
            cur.execute("SELECT * FROM product INNER JOIN farmer ON product.farmerid=farmer.farmerid WHERE productid=%s", (productidd,))
            infos=cur.fetchone()
            d = collections.OrderedDict()
            d["id"]=infos[0]
            d["name"]=infos[1]
            d["amount"]=infos[2]
            d["price"]=infos[3]
            d["category"]=infos[4]
            d["rate"]=infos[5]
            d["details"]=infos[6]
            d["farmer"]=infos[7]
            d["farmerName"]=infos[9]
            d["email"]=infos[10]
            d["phone"]=infos[12]
            d["farmerRate"]=infos[13]
            info_list.append(d)
            conn.commit()
            conn.close()
            j=json.dumps(info_list)
            session.pop("product", None)
            return j
    except Exception as e:
            print(e)
            return get_response(417)

@app.route("/SetCreditCard", methods=["GET","POST"])
def set_creditcard():
    data = json.loads(request.data)
    owner_name = data["ownername"]
    card_number = data["cardnumber"]
    last_month = data["lastmonth"]
    last_year = data["lastyear"]
    cvv_number = data["cvvnumber"]
    customer_id = session["customer"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("INSERT INTO creditcard (cardid, cardnumber, lastmonth, lastyear, cvvnumber, ownername, customerid) VALUES (DEFAULT, %s, %s, %s, %s, %s, %s)", (card_number, last_month, last_year, cvv_number, owner_name, customer_id))
        conn.commit()
        conn.close()
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/SetDeliveryAddress", methods=["GET","POST"])
def set_deliveryaddress():
    data = json.loads(request.data)
    del_city = data["city"]
    del_address = data["address"]
    customer_id = session["customer"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("INSERT INTO deliverylocation (deliveryaddressid, city, deliveryaddress, customerid) VALUES (DEFAULT, %s, %s, %s)", (del_city, del_address, customer_id))
        conn.commit()
        conn.close()
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/SetSellingAddress", methods=["GET","POST"])
def set_sellingaddress():
    data = json.loads(request.data)
    sel_city = data["city"]
    sel_address = data["address"]
    farmer_id = session["farmer"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("INSERT INTO sellinglocation (sellinglocationid, city, sellingaddress, farmerid) VALUES (DEFAULT, %s, %s, %s)", (sel_city, sel_address, farmer_id))
        conn.commit()
        conn.close()
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/GetAllProducts")
def get_allproducts():
    objects_list = []
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT * FROM product ")
        products=cur.fetchall()
        for row in products:
            d = collections.OrderedDict()
            d["id"]=row[0]
            d["name"]=row[1]
            d["amount"]=row[2]
            d["price"]=row[3]
            d["category"]=row[4]
            d["rate"]=row[5]
            d["details"]=row[6]
            d["farmer"]=row[7]
            objects_list.append(d)
        conn.commit()
        conn.close()
        j=json.dumps(objects_list)
        return j
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/GetCreditCards")
def get_creditcards():
    customer_id=session["customer"]
    objects_list = []
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT * FROM creditcard WHERE customerid=%s",(customer_id))
        cards=cur.fetchall()
        for row in cards:
            d = collections.OrderedDict()
            d["id"]=row[0]
            d["cardnumber"]=row[1]
            d["lastmonth"]=row[2]
            d["lastyear"]=row[3]
            d["cvvnumber"]=row[4]
            d["ownername"]=row[5]
            d["customer"]=row[6]
            objects_list.append(d)
        conn.commit()
        conn.close()
        j=json.dumps(objects_list)
        return j
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/GetDeliveryAddress")
def get_deliveryaddress():
    customer_id=session["customer"]
    objects_list = []
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT * FROM deliverylocation WHERE customerid=%s",(customer_id))
        adresses=cur.fetchall()
        for row in adresses:
            d = collections.OrderedDict()
            d["id"]=row[0]
            d["city"]=row[1]
            d["deliveryaddress"]=row[2]
            d["customer"]=row[3]
            objects_list.append(d)
        conn.commit()
        conn.close()
        j=json.dumps(objects_list)
        return j
    except Exception as e:
        print(e)
        return get_response(417)

@app.route("/SetOrder", methods=["GET","POST"])
def set_order():
    data = json.loads(request.data)
    product_id = data["productid"]
    farmer_id = data["farmerid"]
    unit_price = data["price"]
    unit_number = data["numberofunit"]
    payment_method = data["paymentmethod"]
    delivery_address = data["deliveryaddress"]
    customer_id = session["customer"]
    unitPrice=float(unit_price)
    unitNumber=float(unit_number)
    total_price = unitPrice*unitNumber
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("INSERT INTO orderinfo (orderid, numberofunit, paymentmethod, totalprice, farmerid, customerid, productid, deliveryaddressid) VALUES (DEFAULT, %s, %s, %s, %s, %s, %s, %s)", (unit_number, payment_method, total_price, farmer_id, customer_id, product_id, delivery_address))
        conn.commit()
        conn.close()
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/GetCustomerOrders")
def get_customerorders():
    customer_id=session["customer"]
    objects_list = []
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT * FROM orderinfo INNER JOIN farmer ON orderinfo.farmerid=farmer.farmerid INNER JOIN product ON orderinfo.productid=product.productid WHERE customerid=%s", (customer_id))
        order_dets=cur.fetchall()
        for row in order_dets:
            d = collections.OrderedDict()
            d["orderid"]=row[0]
            d["numberofunit"]=row[1]
            d["paymentmethod"]=row[2]
            d["totalprice"]=row[3]
            d["farmerid"]=row[4]
            d["productid"]=row[6]
            d["deliveryaddressid"]=row[7]
            d["farmername"]=row[9]
            d["farmeremail"]=row[10]
            d["farmerphone"]=row[12]
            d["farmerrate"]=row[13]
            d["productname"]=row[15]
            d["productamount"]=row[16]
            d["productcategory"]=row[18]
            d["productrate"]=row[19]
            d["productdetails"]=row[20]
            objects_list.append(d)
        conn.commit()
        conn.close()
        j=json.dumps(objects_list)
        return j
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/SetProductPoint", methods=["GET","POST"])
def set_productpoint():
    data = json.loads(request.data)
    product_id = data["productid"]
    product_rate = data["productrate"]
    customer_id = session["customer"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("INSERT INTO productrate (productrateid, votenumber, vote, productid, customerid) VALUES(DEFAULT, DEFAULT, %s, %s, %s)", (product_rate, product_id, customer_id))
        conn.commit()
        conn.close()
        session["updatedproduct"] = product_id
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/SetFarmerPoint", methods=["GET","POST"])
def set_farmerpoint():
    data = json.loads(request.data)
    farmer_id = data["farmerid"]
    farmer_rate = data["farmerrate"]
    customer_id = session["customer"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("INSERT INTO farmerrate (farmerrateid, votenumber, vote, farmerid, customerid) VALUES(DEFAULT, DEFAULT, %s, %s, %s)", (farmer_rate, farmer_id, customer_id))
        conn.commit()
        conn.close()
        session["updatedfarmer"]=farmer_id
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/CalculateProductRate")
def get_calculatedproductrate():
    product_id=session["updatedproduct"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT AVG(vote) FROM productrate WHERE productid=%s", (product_id,))
        newrate=cur.fetchone()
        conn.commit()
        conn.close()
        session["newproductrate"]=newrate
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/CalculateFarmerRate")
def get_calculatedfarmerrate():
    farmer_id=session["updatedfarmer"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT AVG(vote) FROM farmerrate WHERE farmerid=%s", (farmer_id,))
        newrate=cur.fetchone()
        conn.commit()
        conn.close()
        session["newfarmerrate"]=newrate
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/UpdateProductRate")
def updateproductrate():
    product_id=session["updatedproduct"]
    new_rate=session["newproductrate"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("UPDATE product SET avgparoductrate=%s WHERE productid=%s", (new_rate, product_id))
        conn.commit()
        conn.close()
        session.pop("updatedproduct", None)
        session.pop("newproductrate", None)
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/UpdateFarmerRate")
def updatefarmerrate():
    farmer_id=session["updatedfarmer"]
    new_rate=session["newfarmerrate"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("UPDATE farmer SET avgfarmerrate=%s WHERE farmerid=%s", (new_rate, farmer_id))
        conn.commit()
        conn.close()
        session.pop("updatedfarmer", None)
        session.pop("newfarmerrate", None)
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/GetCustomerAddresses")
def get_customeraddresses():
    customer_id=session["customer"]
    objects_list = []
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT * FROM deliverylocation WHERE customerid=%s", (customer_id,))
        address_dets=cur.fetchall()
        for row in address_dets:
            d= collections.OrderedDict()
            d["addressid"]=row[0]
            d["city"]=row[1]
            d["address"]=row[2]
            objects_list.append(d)
        conn.commit()
        conn.close()
        j=json.dumps(objects_list)
        return j
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/SetDeliveryAddressId", methods=["GET","POST"])
def set_deladdressid():
    data = json.loads(request.data)
    del_addressid = data["id"]
    try:
        session["deladdress"] = del_addressid
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)
    
@app.route("/GetDeliveryAddresswithId")
def get_deladdresseswid():
    del_addressid=session["deladdress"]
    objects_list = []
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT * FROM deliverylocation WHERE deliveryaddressid=%s", (del_addressid,))
        address_dets=cur.fetchall()
        for row in address_dets:
            d= collections.OrderedDict()
            d["addressid"]=row[0]
            d["city"]=row[1]
            d["address"]=row[2]
            objects_list.append(d)
        conn.commit()
        conn.close()
        j=json.dumps(objects_list)
        return j
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/UpdateDeliveryAddress", methods=["GET","POST"])
def updatedeladdress():
    data = json.loads(request.data)
    del_city = data["city"]
    del_address = data["address"]
    customer_id = session["customer"]
    del_addressid=session["deladdress"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("UPDATE deliverylocation SET city=%s, deliveryaddress=%s WHERE deliveryaddressid=%s", (del_city, del_address, del_addressid))
        conn.commit()
        conn.close()
        session.pop("delladdress", None)
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/DeleteDeliveryAddresses")
def delete_deladdress():
    del_addressid=session["deladdress"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("DELETE FROM deliverylocation WHERE deliveryaddressid=%s", (del_addressid,))
        conn.commit()
        conn.close()
        session.pop("delladdress", None)
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/GetCreditCards")
def get_customercards():
    customer_id=session["customer"]
    objects_list=[]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT * FROM creditcard WHERE customerid=%s", (customer_id,))
        cards=cur.fetchall()
        for row in cards:
            d= collections.OrderedDict()
            d["cardid"]=row[0]
            d["cardnumber"]=row[1]
            d["lastmonth"]=row[2]
            d["lastyear"]=row[3]
            d["cvvnumber"]=row[4]
            d["ownername"]=row[5]
            objects_list.append(d)
        conn.commit()
        conn.close()
        j=json.dumps(objects_list)
        return j
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/SetCreditCardId", methods=["GET","POST"])
def set_cardid():
    data = json.loads(request.data)
    cardid = data["id"]
    try:
        session["creditcard"] = cardid
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)

@app.route("/GetCreditCardwithId")
def get_cardwid():
    card_id=session["creditcard"]
    objects_list = []
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT * FROM creditcard WHERE cardid=%s", (card_id,))
        cards=cur.fetchall()
        for row in cards:
            d= collections.OrderedDict()
            d["cardid"]=row[0]
            d["cardnumber"]=row[1]
            d["lastmonth"]=row[2]
            d["lastyear"]=row[3]
            d["cvvnumber"]=row[4]
            d["ownername"]=row[5]
            objects_list.append(d)
        conn.commit()
        conn.close()
        j=json.dumps(objects_list)
        return j
    except Exception as e:
        print(e)
        return get_response(417)

@app.route("/UpdateCreditCard", methods=["GET","POST"])
def updatecard():
    data = json.loads(request.data)
    owner_name = data["ownername"]
    card_number = data["cardnumber"]
    last_month = data["lastmonth"]
    last_year = data["lastyear"]
    cvv_number = data["cvvnumber"]
    card_id=session["creditcard"]
    customer_id = session["customer"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("UPDATE creditcard SET cardnumber=%s, lastmonth=%s, lastyear=%s, cvvnumber=%s, ownername=%s WHERE cardid=%s", (card_number, last_month, last_year, cvv_number, owner_name, card_id))
        conn.commit()
        conn.close()
        session.pop("creditcard", None)
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/DeleteCreditCards")
def delete_creaditcard():
    card_id=session["creditcard"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("DELETE FROM creditcard WHERE cardid=%s", (card_id,))
        conn.commit()
        conn.close()
        session.pop("creditcard", None)
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/GetCustomerProfile")
def get_custprofile():
    customer_id=session["customer"]
    objects_list = []
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT * FROM customer WHERE customerid=%s", (customer_id,))
        profile=cur.fetchall()
        for row in profile:
            d= collections.OrderedDict()
            d["name"]=row[1]
            d["email"]=row[2]
            d["phonenumber"]= row[4]
            objects_list.append(d)
        conn.commit()
        conn.close()
        j=json.dumps(objects_list)
        return j
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/GetFarmerProfile")
def get_farmerprofile():
    farmer_id=session["farmer"]
    objects_list = []
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT * FROM farmer WHERE farmerid=%s", (farmer_id,))
        profile=cur.fetchall()
        for row in profile:
            d= collections.OrderedDict()
            d["name"]=row[1]
            d["email"]=row[2]
            d["phonenumber"]= row[4]
            d["avgrate"]=row[5]
            objects_list.append(d)
        conn.commit()
        conn.close()
        j=json.dumps(objects_list)
        return j
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/UpdateCustomerProfile", methods=["GET","POST"])
def updatecustprofile():
    data = json.loads(request.data)
    new_name = data["name"]
    new_email=data["email"]
    new_phone=data["phonenumber"]
    customer_id=session["customer"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("UPDATE customer SET name=%s, email=%s, phonenumber=%s WHERE customerid=%s", (new_name, new_email, new_phone, customer_id))
        conn.commit()
        conn.close()
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/UpdateFarmerProfile", methods=["GET","POST"])
def updatefarmerprofile():
    data = json.loads(request.data)
    new_name = data["name"]
    new_email=data["email"]
    new_phone=data["phonenumber"]
    farmer_id=session["farmer"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("UPDATE farmer SET name=%s, email=%s, phonenumber=%s WHERE farmerid=%s", (new_name, new_email, new_phone, farmer_id))
        conn.commit()
        conn.close()
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/SetProductId", methods=["GET","POST"])
def set_productidd():
    data = json.loads(request.data)
    product_id = data["id"]
    try:
        session["product"] = product_id
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/GetProductwithId")
def get_productwid():
    product_id=session["product"]
    objects_list = []
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT  * FROM product WHERE productid=%s", (product_id,))
        product=cur.fetchall()
        for row in product:
            d= collections.OrderedDict()
            d["name"]=row[1]
            d["amount"]=row[2]
            d["unitprice"]=row[3]
            d["category"]=row[4]
            d["rate"]=row[5]
            d["details"]=row[6]
            objects_list.append(d)
        conn.commit()
        conn.close()
        j=json.dumps(objects_list)
        return j
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/UpdateProduct", methods=["GET","POST"])
def updateproduct():
    data = json.loads(request.data)
    new_name=data["productName"]
    new_amount=data["amount"]
    new_price = data["unitPrice"]
    new_category=data["category"]
    new_detail=data["details"]
    product_id=session["product"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("UPDATE product SET name=%s, amount=%s, unitprice=%s, category=%s, details=%s WHERE productid=%s", (new_name, new_amount, new_price, new_category, new_detail, product_id))
        conn.commit()
        conn.close()
        session.pop("product", None)
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)



@app.route("/DeleteProduct")
def deleteproduct():
    product_id=session["product"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("DELETE FROM product WHERE productid=%s", (product_id,))
        conn.commit()
        conn.close()
        session.pop("product", None)
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/GetFarmerAddresses")
def get_farmeraddress():
    farmer_id=session["farmer"]
    objects_list = []
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT  * FROM sellinglocation WHERE farmerid=%s", (farmer_id,))
        address=cur.fetchall()
        for row in address:
            d= collections.OrderedDict()
            d["addressid"]=row[0]
            d["city"]=row[1]
            d["address"]=row[2]
            objects_list.append(d)
        conn.commit()
        conn.close()
        j=json.dumps(objects_list)
        return j
    except Exception as e:
        print(e)
        return get_response(417)



@app.route("/SetSellingAddressId", methods=["GET","POST"])
def set_sellingid():
    data = json.loads(request.data)
    selladdress_id = data["id"]
    try:
        session["selladdress"] = selladdress_id
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)



@app.route("/GetSellingAddresswithId")
def get_selladdresswid():
    selladdress_id=session["selladdress"]
    objects_list = []
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT * FROM sellinglocation WHERE sellinglocationid=%s", (selladdress_id,))
        address=cur.fetchall()
        for row in address:
            d= collections.OrderedDict()
            d["addressid"]=row[0]
            d["city"]=row[1]
            d["address"]=row[2]
            objects_list.append(d)
        conn.commit()
        conn.close()
        j=json.dumps(objects_list)
        return j
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/UpdateSellingAddress", methods=["GET","POST"])
def updateselladdress():
    data = json.loads(request.data)
    new_city=data["city"]
    new_address=data["address"]
    selladdress_id=session["selladdress"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("UPDATE sellinglocation SET city=%s, sellingaddress=%s WHERE sellinglocationid=%s", (new_city, new_address, selladdress_id))
        conn.commit()
        conn.close()
        session.pop("selladdress", None)
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/DeleteSellingAddresses")
def deleetselladdress():
    selladdress_id=session["selladdress"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("DELETE FROM sellinglocation WHERE sellinglocationid=%s", (selladdress_id,))
        conn.commit()
        conn.close()
        session.pop("selladdress", None)
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/GetFarmerOrders")
def get_farmerorders():
    farmer_id=session["farmer"]
    objects_list = []
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT * FROM orderinfo INNER JOIN customer ON orderinfo.customerid=customer.customerid INNER JOIN product ON orderinfo.productid=product.productid WHERE orderinfo.farmerid=%s", (farmer_id,))
        order_dets=cur.fetchall()
        for row in order_dets:
            d = collections.OrderedDict()
            d["orderid"]=row[0]
            d["numberofunit"]=row[1]
            d["paymentmethod"]=row[2]
            d["totalprice"]=row[3]
            d["customerid"]=row[5]
            d["productid"]=row[6]
            d["deliveryaddressid"]=row[7]
            d["customername"]=row[9]
            d["customeremail"]=row[10]
            d["customerphone"]=row[12]
            d["productname"]=row[14]
            d["productamount"]=row[15]
            d["productunitprice"]=row[16]
            d["productcategory"]=row[17]
            d["productrate"]=row[18]
            d["productdetails"]=row[19]
            objects_list.append(d)
        conn.commit()
        conn.close()
        j=json.dumps(objects_list)
        return j
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/GetCustomerSpendings")
def get_customerspendings():
    customer_id=session["customer"]
    objects_list = []
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT orderid, MAX(totalprice) from orderinfo where customerid=%s group by orderid", (customer_id,))
        earning_dets=cur.fetchall()
        for row in earning_dets:
            d = collections.OrderedDict()
            d["orderid"]=row[0]
            d["spending"]=row[1]
            objects_list.append(d)
        conn.commit()
        conn.close()
        j=json.dumps(objects_list)
        return j
    except Exception as e:
        print(e)
        return get_response(417)



@app.route("/GetFarmerEarnings")
def get_farmerearnings():
    farmer_id=session["farmer"]
    objects_list = []
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("SELECT orderid, MAX(totalprice) from orderinfo where farmerid=%s group by orderid", (farmer_id,))
        earning_dets=cur.fetchall()
        for row in earning_dets:
            d = collections.OrderedDict()
            d["orderid"]=row[0]
            d["earning"]=row[1]
            objects_list.append(d)
        conn.commit()
        conn.close()
        j=json.dumps(objects_list)
        return j
    except Exception as e:
        print(e)
        return get_response(417)



@app.route("/DeleteCustomerAccount")
def deleetcustomer():
    customer_id=session["customer"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("DELETE FROM customer WHERE customerid=%s", (customer_id,))
        conn.commit()
        conn.close()
        session.pop("customer", None)
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


@app.route("/DeleteFarmerAccount")
def deletefarmer():
    farmer_id=session["farmer"]
    try:
        conn = dbapi2.connect(dbname='postgres', user='postgres', host='localhost', password='123galata4')
        cur = conn.cursor()
        cur.execute("DELETE FROM farmer WHERE farmerid=%s", (farmer_id,))
        conn.commit()
        conn.close()
        session.pop("farmer", None)
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)