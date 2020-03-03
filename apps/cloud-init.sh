#!/bin/bash
#this is to initialize the connection to cloudsql
./cloud_sql_proxy -dir=cloudsql -instances=<speedy-surface-269620:us-central1:pdx-crime>=tcp:5432 -credential_file=<.creds/speedy-surface-269620-66248a218797.json> $