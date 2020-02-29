#!/usr/bin/env python3

import psycopg2
import json

# TWITTER TABLE
with open('.creds/db-creds.json') as cred_data:
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
    tweet_id VARCHAR(5000)  PRIMARY KEY,
    entity VARCHAR (5000) NOT NULL,
    date VARCHAR (50) NOT NULL,
    inctime VARCHAR (50) NOT NULL,
    text VARCHAR (5000) NOT NULL,
    lat VARCHAR (5000) NOT NULL,
    lng VARCHAR (5000) NOT NULL,
    location VARCHAR (5000) NOT NULL,
    category VARCHAR (5000) NOT NULL,
    subcat VARCHAR (5000) NOT NULL,
    catstat VARCHAR (5000) NOT NULL,
    year VARCHAR (5000) NOT NULL,
    month VARCHAR (5000) NOT NULL,
    day VARCHAR (5000) NOT NULL,
    hour VARCHAR (5000) NOT NULL,
    minute VARCHAR (5000) NOT NULL);
    '''.format(table_name))
conn.commit()

print('TABLE: {} \n Successfully Created'.format(table_name))

# the correct conversion (no more SQL injections!)
#cur.execute("INSERT INTO {} (tweet_date, tweet_text, usr_name, hash_tags) VALUES (%s, %s, %s, %s)".format(table_name),
#        ('-', '-', '-', '-'))

cur.close()
conn.close()
conn.close()
