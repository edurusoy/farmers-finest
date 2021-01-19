import os
import sys

import psycopg2 as dbapi2

INIT_STATEMENTS = [
 """
    create table if not exists farmer(
        farmerid serial primary key,
        name varchar not null,
        email varchar unique not null,
        password varchar not null,
        phonenumber varchar ,
        avgfarmerrate float default 0
    )
    """,
    """
    create table if not exists customer(
        customerid serial primary key,
        name varchar not null,
        email varchar unique not null,
        password varchar not null,
        phonenumber varchar 
    )
    """,
     """
    create table if not exists product(
         productid serial primary key,
         name varchar not null,
         amount float,
         unitprice float not null,
         category varchar not null,
         avgparoductrate float default 0,
         details varchar,
         farmerid integer references farmer on delete cascade
    )
    """,
    """
    create table if not exists productimage(
        imageid serial primary key,
        imagefile bytea,
        productid integer references product on delete cascade
    )
    """,
    """
    create table if not exists creditcard(
        cardid serial primary key,
        cardnumber varchar unique not null,
        lastmonth varchar not null,
        lastyear varchar not null,
        cvvnumber varchar not null,
        ownername varchar not null,
        customerid integer references customer on delete cascade
    )
    """,
    """
    create table if not exists deliverylocation(
        deliveryaddressid serial primary key,
        city varchar not null,
        deliveryaddress varchar not null,
        customerid integer references customer on delete cascade
    )
    """,
    """
    create table if not exists sellinglocation(
        sellinglocationid serial primary key,
        city varchar not null,
        sellingaddress varchar not null,
        farmerid integer references farmer on delete cascade
    )
    """,
    """
    create table if not exists orderinfo(
        orderid serial primary key,
        numberofunit float not null,
        paymentmethod integer not null,
        totalprice float not null,
        farmerid integer references farmer on delete cascade,
        customerid integer references customer on delete cascade,
        productid integer references product on delete cascade,
        deliveryaddressid integer references deliverylocation on delete cascade
    )
    """,
    """
    create table if not exists productrate(
        productrateid serial primary key,
        votenumber serial unique not null,
        vote float not null,
        productid integer references product on delete cascade,
        customerid integer references customer on delete cascade
    )
    """,
    """
    create table if not exists farmerrate(
        farmerrateid serial primary key,
        votenumber serial unique not null,
        vote float not null,
        farmerid integer references farmer on delete cascade,
        customerid integer references customer on delete cascade
    )
    """
]

def initialize(url):
    with dbapi2.connect(url) as connection:
        cursor = connection.cursor()
        for statement in INIT_STATEMENTS:
            cursor.execute(statement)
        cursor.close()


if __name__ == "__main__":
    url = os.getenv("DATABASE_URL")
    if url is None:
        print("Usage: DATABASE_URL=url python dbinit.py", file=sys.stderr)
        sys.exit(1)
    initialize(url)