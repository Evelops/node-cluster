#### Node Cluster Container

> Conatiner build

```bash
$ docker build --tag node_cluster_server:0.0.1 .
$ docker create --name NODE_CLUSTER_0 -p 3000:3000 node_cluster_server:0.0.1
$ docker ps -a 
$ docker start NODE_CLUSTER_0
```