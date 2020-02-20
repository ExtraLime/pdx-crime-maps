#!/usr/bin/env python3

import psycopg2
import json

# TWITTER TABLE
with open('../.creds/creds-db.json') as cred_data:
    info = json.load(cred_data)
    DBNAME = info['DBNAME']
    DBUSER = info['USER']
    DBHOST = info['HOST']
    DBPASSWORD = info['PASSWORD']
    DBPORT = info['PORT']

# Connect to an existing database
conn = psycopg2.connect(
        dbname=DBNAME,
        user=DBUSER,
        host=DBHOST,
        password=DBPASSWORD,
        port=DBPORT)

#try:
# Open a cursor to perform database operations
cur = conn.cursor()
    
# Execute a command: this creates a new table
table_name = 'twitter_query'

print('Making TABLE...')
cur.execute('''
    CREATE TABLE {} (
    user_id serial PRIMARY KEY,
    tweet_date VARCHAR (50) NOT NULL,
    tweet_text VARCHAR (5000) NOT NULL,
    usr_name VARCHAR (5000) NOT NULL,
    hash_tags VARCHAR (5000) NOT NULL);
    '''.format(table_name))

conn.commit()

print('TABLE: {} \n Successfully Created'.format(table_name))

# the correct conversion (no more SQL injections!)
cur.execute("INSERT INTO {} (tweet_date, tweet_text, usr_name, hash_tags) VALUES (%s, %s, %s, %s)".format(table_name),
        ('-', '-', '-', '-'))

cur.close()
conn.close()