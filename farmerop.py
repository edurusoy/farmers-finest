import psycopg2 as dbapi2
import os
from farmer_table import farmer

class Driver:

    def __init__(self):
                    self.url = os.getenv("DATABASE_URL")

    def add_farmer(self, farmer):
             with dbapi2.connect(self.url) as connection:
                cursor = connection.cursor()
                cursor.execute(
                    "INSERT INTO farmer ( farmerid, name, email, password, phonenumber, avgfarmerrate) VALUES (DEFAULT, %s, %s, %s, %s, DEFAULT)",
                    (farmer.name, farmer.email, farmer.password, farmer.phonenumber))
                cursor.close()
