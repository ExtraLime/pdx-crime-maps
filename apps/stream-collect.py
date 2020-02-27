#!/usr/bin/env python3

import tweepy 
import json

import psycopg2
from psycopg2 import sql

#load creds for DB
with open('.creds/db-creds.json') as cred_data:
    info = json.load(cred_data)
    DBNAME = info['DBNAME']
    DBUSER = info['USER']
    DBHOST = info['HOST']
    DBPASSWORD = info['PASSWORD']
    DBPORT = info['PORT']

#load API creds, set auth object
with open('.creds/twitter-cred.json') as cred_data:
    info = json.load(cred_data)
    consumer_key = info['CONSUMER_KEY']
    consumer_secret = info['CONSUMER_SECRET']
    access_key = info['ACCESS_KEY']
    access_secret = info['ACCESS_SECRET']

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

#stream_tweets from Portland,Or
class PdxCrimeListener(tweepy.streaming.StreamListener):

    def __init__(self):
        self.count = 0
        print("Collecting")

    def on_data(self, data):
        try:
            data = json.loads(data)
            tweet_id = data['id']
            entity = data['user']['name']
            date = data['created_at']
            text = data['text']
            lat = data['geo']['coordinates'][0]
            lng = data['geo']['coordinates'][1]
            category = text.split('at')[0].strip()
            cur.execute("INSERT INTO twitter_query (tweet_id, entity, date, text, lat, lng, category) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                    (tweet_id, entity, str(date), text, lat, lng, category))
            conn.commit()
            self.count+=1
            print(data['text'])
	    #uncomment to limit to 100
            '''if self.count<100:
                return True
            else:
                print(self.count)
                print('Finished')
                return False'''
        except BaseException as e:
            print("Error on_data: %s" % str(e))
            return True

    def on_error(self, status_code):
        print (status_code)
        return True # Don't kill the stream

    def on_timeout(self):
        print ('Timeout...')
        return True # Don't kill the stream

if __name__ == '__main__':

    pdx_listener = PdxCrimeListener()
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)

    auth.set_access_token(access_key, access_secret)
    sapi = tweepy.streaming.Stream(auth, pdx_listener)  

    #filter by ems and police
    sapi.filter(follow=(['1602852614','1606472113']))
