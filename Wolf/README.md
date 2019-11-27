# Wolf

* Backend : EggJS

* DB : Mysql / MongoDB

## Install Mongo

```bash
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-4.0.0.tgz
tar -zxvf mongodb-linux-x86_64-4.0.0.tgz
mv  mongodb-linux-x86_64-4.0.0/ /usr/local/mongodb
```

## Create DB Directory && Logs File

```bash
mkdir -p /usr/mongodb/db
mkdir -p /usr/mongodb/logs/mongodb.log
cd /usr/mongodb && chmod -Rf 777
```

## Create Configuration File

```bash
nano /usr/local/mongodb/bin/mongodb.conf

port=27017
dbpath=/usr/mongodb/db
logpath=/usr/mongodb/logs/mongodb.log
logappend=true
fork=true
maxConns=100
#auth=true
```

## Run Mongodb Service Daemon

```bash
mongod -f /usr/local/mongodb/bin/mongodb.conf
```
