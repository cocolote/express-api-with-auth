#!/bin/bash

eventDB=$(find $PWD -name 'dbdir' 2>/dev/null)
echo $eventDB

docker run \
 --name mysql \
 -p 0.0.0.0:3306:3306 \
 -e MYSQL_ROOT_PASSWORD=Godpass1 \
 -v $eventDB:/var/lib/mysql \
 -d mysql:8.0
