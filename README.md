#### Node Cluster Container

> Conatiner build

```bash
$ docker build --tag node_cluster_server:0.0.1 [images file route]
$ docker create --name NODE_CLUSTER_0 -p 3002:3002 node_cluster_server:0.0.1
$ docker ps -a 
$ docker start NODE_CLUSTER_0
```