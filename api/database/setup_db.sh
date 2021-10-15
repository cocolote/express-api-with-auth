#!/bin/bash

docker exec \
 -i mysql sh \
 -c "mysql -uroot -pGodpass1 -e 'drop database if exists eventsdb'"

docker exec \
 -i mysql sh \
 -c "mysql -uroot -pGodpass1 -e 'create database eventsdb'"

docker exec \
 -i mysql sh \
 -c "mysql -uroot -pGodpass1 -e \"create user if not exists 'nemo'@'%' identified by 'WherareyouNem0'\""

docker exec \
 -i mysql sh \
 -c "mysql -uroot -pGodpass1 -e \"grant all privileges on eventsdb.* to 'nemo'@'%'\""

docker exec \
 -i mysql sh \
 -c "mysql -u nemo -pWherareyouNem0 eventsdb" < $(find $PWD -name 'schema.sql' 2>/dev/null)

# To connect after the db was created just use the alias "mysql" like this
#
# mysql -u nemo -p?Wh3r3Ar3Y0uN3m0 eventsdb"
