#!/usr/bin/env python3

import tweepy 
import json

import psycopg2
from psycopg2 import sql

#load db-creds
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

conn.autocommit = True


# Open a cursor to perform database operations
cur = conn.cursor()


#load API creds, set auth object
with open('.creds/twitter-cred.json') as cred_data:
    info = json.load(cred_data)
    consumer_key = info['CONSUMER_KEY']
    consumer_secret = info['CONSUMER_SECRET']
    access_key = info['ACCESS_KEY']
    access_secret = info['ACCESS_SECRET']

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_key, access_secret)


# Get 20 most recent tweets from two entities (police/fire)
#initial data
api = tweepy.API(auth)
police = api.user_timeline(id='1602852614')
fireems = api.user_timeline(id='1606472113')

#Insert initial data into DB
for i in range(len(police)):
    tweet_id = police[i].id
    entity = police[i].user._json['name']
    date = police[i].created_at
    text = police[i].text
    lng = police[i].geo['coordinates'][1]
    lat = police[i].geo['coordinates'][0]
    category = police[i].text.split('at')[0].strip()
    cur.execute("INSERT INTO twitter_query (tweet_id, entity, date, text, lat, lng, category) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                    (tweet_id, entity, str(date), text, lat, lng, category))
    conn.commit()

for i in range(len(fireems)):
    tweet_id = fireems[i].id
    entity = fireems[i].user._json['name']
    date = fireems[i].created_at
    text = fireems[i].text
    lng = fireems[i].geo['coordinates'][1]
    lat = fireems[i].geo['coordinates'][0]
    category = fireems[i].text.split('at')[0].strip()
    cur.execute("INSERT INTO twitter_query (tweet_id, entity, date, text, lat, lng, category) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                    (tweet_id, entity, str(date), text, lat, lng, category))
    conn.commit()

#Close DB connection
cur.close()
conn.close()
