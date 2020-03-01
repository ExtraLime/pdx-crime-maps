#!/usr/bin/env python3
import pandas as pd
import numpy as np
import tweepy 
import json

import geopy
from geopy.geocoders import Nominatim

import psycopg2
from psycopg2 import sql

#list of neighborhoods
hoods = ['ALAMEDA', 'ARBOR LODGE', 'ARDENWALD-JOHNSON CREEK', 'ARGAY',
 'ARLINGTON HEIGHTS', 'ARNOLD CREEK', 'ASHCREEK', 'BEAUMONT-WILSHIRE',
 'BOISE', 'BRENTWOOD/ DARLINGTON', 'BRIDGETON', 'BRIDLEMILE',
 'BROOKLYN', 'BUCKMAN', 'CATHEDRAL PARK', 'CENTENNIAL', 'COLLINS VIEW',
 'CONCORDIA', 'CRESTON-KENILWORTH', 'CRESTWOOD', 'CULLY', 'PORTLAND DOWNTOWN',
 'DUNTHORPE', 'EAST COLUMBIA', 'EASTMORELAND', 'ELIOT', 'FAR SOUTHWEST',
 'FOREST PARK', 'FOSTER-POWELL', 'GLENFAIR', 'GOOSE HOLLOW', 'GRANT PARK',
 'HAYDEN ISLAND', 'HAYHURST', 'HAZELWOOD', 'HEALY HEIGHTS', 'HILLSDALE',
 'HILLSIDE', 'HOLLYWOOD', 'HOMESTEAD', 'HOSFORD-ABERNETHY', 'HUMBOLDT',
 'IRVINGTON', 'KENTON', 'KERNS', 'KING', 'LAURELHURST', 'LENTS', 'LINNTON',
 'LLOYD DISTRICT', 'MADISON SOUTH', 'MAPLEWOOD', 'MARKHAM', 'MARSHALL PARK',
 'MILL PARK', 'MONTAVILLA', 'MT SCOTT-ARLETA', 'MT TABOR', 'MULTNOMAH',
 'NORTH TABOR', 'NORTHWEST DISTRICT', 'NORTHWEST HEIGHTS', 'OLD TOWN/ CHINATOWN',
 'OVERLOOK', 'PARKROSE', 'PARKROSE HEIGHTS', 'PEARL', 'PIEDMONT', 'PLEASANT VALLEY',
 'PORTSMOUTH', 'POWELLHURST-GILBERT', 'REED', 'RICHMOND', 'ROSE CITY PARK',
 'ROSEWAY', 'RUSSELL', 'SABIN', 'SELLWOOD-MORELAND', 'SOUTH BURLINGAME',
 'SOUTH PORTLAND', 'SOUTH TABOR', 'SOUTHWEST HILLS', 'ST. JOHNS',
 "SULLIVAN'S GULCH", 'SUMNER', 'SUNDERLAND', 'SUNNYSIDE', 'SYLVAN-HIGHLANDS',
 'UNIVERSITY PARK', 'VERNON', 'WEST PORTLAND PARK', 'WILKES', 'WOODLAND PARK',
 'WOODLAWN', 'WOODSTOCK']

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

#set geolocator creds
geolocator = Nominatim(user_agent="extra_lime")

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
            date = pd.to_datetime(data['created_at']).tz_convert('America/Los_Angeles')
            year, month, day, hour, minute = date.year,date.month,date.day,date.hour,date.minute
            text = data['text']
            inctime = text[-13:-8]
            cats = text.split('at')[0].strip().split(' - ')
            category = cats[0]
            subcat = 'N/A'
            catstat = 'N/A'
            if len(cats) == 3:
                subcat = cats[1]
                catstat = cats[2]
            elif len(cats) == 2:
                if cats[1] == 'COLD' or cats[1] == 'PRIORITY':
                    catstat = cats[1]
                else:
                    subcat = cats[1]
            lat = data['geo']['coordinates'][0]
            lng = data['geo']['coordinates'][1]
            location = None
            while location == None:
                location = geolocator.reverse('{},{}'.format(lat,lng),timeout=None)
                for i in location.address.split(','):
                    item = i.strip().upper()
                    if item in hoods:
                        location = i.strip()
                        break
                    else:
                        location = 'Unknown'
                        
            cur.execute("INSERT INTO twitter_query (tweet_id, entity, date, inctime, text, lat, lng, location, category, subcat, catstat, year, month, day, hour, minute) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                    (tweet_id, entity, str(date), inctime, text, lat, lng, location, category, subcat, catstat, year, month, day, hour, minute))
            conn.commit()
            self.count+=1
            print(data['text'])
            if self.count<100:
                return True
            else:
                print(self.count)
                print('Finished')
                return False
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

    # user ids to listen for
    sapi.filter(follow=(['1602852614','1606472113']))