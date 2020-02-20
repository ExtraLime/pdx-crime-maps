#to initialize a postgres db in python
import psycopg2
from psycopg2 import sql

#initialize db
conn = psycopg2.connect(host="localhost", dbname="postgres",
                        user="admin", password="pdx-crime", port='5432')
cursor = conn.cursor()
query = ''' CREATE DATABASE {} ;'''
name = 'pdxcrime'

conn.autocommit = True
cursor.execute(sql.SQL(query).format(
    sql.Identifier(name)))

cursor.close()
conn.close()