---
layout: post
title: "Solr, Zookeeper and Docker configuration"
date: 2017-12-05 10:30:04 +0800
comments: true
categories: solr zookeeper docker setup 
---
This is how my current project setup the environments of Solr Cloud, ZooKeeper, Consul and Docker.

### Pre-requisite

* [Docker](https://www.docker.com/)

### Docker images
* [solr](https://hub.docker.com/_/solr/)
* [jplock/zookeeper](https://hub.docker.com/r/jplock/zookeeper/)
* [swarm](https://hub.docker.com/_/swarm/)
* [gliderlabs/registrator](https://hub.docker.com/r/gliderlabs/registrator/)
* [progrium/consul](https://hub.docker.com/r/progrium/consul/)

### Run consul
This container will be used as key value store and service discovery.
```sh
$ docker run -d -p 8400:8400 -p 8500:8500 -p 8600:53/udp --name consul-node1 -h consul-node1 progrium/consul -server -bootstrap -ui-dir /ui
```
Check the running service by open: `http://localhost:8500/ui/#/dc1/services`

### Run registrator
This container will auto register services to consul.
```sh
$ docker run -d \
    --name=registrator \
    --net=host \
    --volume=/var/run/docker.sock:/tmp/docker.sock \
    gliderlabs/registrator:latest \
    consul://localhost:8500
```

### Register a container from another machine
```sh
$ docker run -d \
    --name=registrator \
    --net=host \
    --volume=/var/run/docker.sock:/tmp/docker.sock \
    gliderlabs/registrator:latest \
    consul://192.168.33.100:8500

$ docker run --name redis1 -d -P redis
```

### Run swarm
This will manage all docker containers and scalling.
```sh
# Start manager swarm node
$ docker run -d -p 4000:4000 --name swarm-mgr1 swarm manage -H :4000 --replication --advertise 192.168.33.100:4000 consul://192.168.33.100:8500

# Join swarm cluster
$ docker run -d swarm join --advertise=192.168.56.100:2375 consul://192.168.33.100:8500

# if doesn't work, it need to edit /etc/default/docker file by adding this:
DOCKER_OPTS="-H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock"

$ docker -H :4000 info
```

### Run Zookeeper
This required by solr cloud for orchestration.
```sh
$ docker run -it -d --name zknode-1 -p 2181:2181 -p 2888:2888 -p 3888:3888 jplock/zookeeper
```

### Run Solr

```sh
$ docker run --name zksolr-node1 --link zknode-1:ZK -d -p 8983:8983 \
      solr \
      bash -c 'solr start -f -z $ZK_PORT_2181_TCP_ADDR:$ZK_PORT_2181_TCP_PORT'

$ docker exec -t zksolr-node1 /opt/solr/bin/solr create_collection -c collection1 -shards 3 -replicationFactor 2 -p 8983

```
Check the running service by open: `http://localhost:8983/solr/#/~cloud`


### Start ZooKeeper ensemble

In previous example we only run a single zookeeper below are how to run 3 zookeepers:

```
# zoo1 in machine 1
$ docker run \
  --name zoo1 \
  --restart always \
  -p 2181:2181 \
  -p 2888:2888 \
  -p 3888:3888 \
  -e ZOO_MY_ID=1 \
  -e ZOO_SERVERS="server.1=0.0.0.0:2888:3888 server.2=192.168.33.100:2888:3888 server.3=192.168.44.100:2888:3888" \
  -d 31z4/zookeeper

# zoo2 in machine 2
$ docker run \
  --name zoo2 \
  --restart always \
  -p 2181:2181 \
  -p 2888:2888 \
  -p 3888:3888 \
  -e ZOO_MY_ID=2 \
  -e ZOO_SERVERS="server.1=192.168.56.100:2888:3888 server.2=0.0.0.0:2888:3888 server.3=192.168.44.100:2888:3888" \
  -d 31z4/zookeeper

# zoo3 in machine 3
$ docker run \
  --name zoo3 \
  --restart always \
  -p 2181:2181 \
  -p 2888:2888 \
  -p 3888:3888 \
  -e ZOO_MY_ID=3 \
  -e ZOO_SERVERS="server.1=192.168.56.100:2888:3888 server.2=192.168.33.100:2888:3888 server.3=0.0.0.0:2888:3888" \
  -d 31z4/zookeeper

# check zookeper is it running
$ docker exec -it zoo1 echo stat | nc localhost 2181

# start solr
$ docker run --name solr-node1 --link zoo1:zookeeper -d -p 8983:8983 \
      solr \
      bash -c 'solr start -f -z zoo1:2181,192.168.33.100:2181,192.168.44.100:2181'
```


