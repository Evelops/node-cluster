#### Node Cluster Container

> Conatiner build

- CPU v4 

```bash
$ docker build --tag node_cluster_server:0.0.1 .
$ docker build --tag node_cluster_server:0.0.2 .
$ docker build --tag node_cluster_server:0.0.3 .
$ docker build --tag node_cluster_server:0.0.4 .
$ docker create --name NODE_CLUSTER_1 -p 3001:3000 node_cluster_server:0.0.1
$ docker create --name NODE_CLUSTER_2 -p 3002:3000 node_cluster_server:0.0.2
$ docker create --name NODE_CLUSTER_3 -p 3003:3000 node_cluster_server:0.0.3
$ docker create --name NODE_CLUSTER_3 -p 3004:3000 node_cluster_server:0.0.4
$ docker ps -a 
$ docker start NODE_CLUSTER_1
$ docker start NODE_CLUSTER_2
$ docker start NODE_CLUSTER_3
$ docker start NODE_CLUSTER_4
```


> MultiCore Node Cluster 