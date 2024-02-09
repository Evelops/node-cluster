import express, { Express, Application, Request, Response } from 'express';
import multer, { Multer } from 'multer';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

import cluster, { Worker } from 'cluster';
import os from 'os';
import {v4 as uuidv4} from 'uuid';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
// // Middleware
// app.use(cors());

const instanceId = uuidv4();

if (cluster.isPrimary) {
  console.log('Server ID : ' + instanceId);
  const cpuCount = os.cpus().length;
  const workerCount = Math.floor(cpuCount / 2);

  for (let i = 0; i < workerCount; i++) {
      console.log("Create Worker [" + (i + 1) + "/" + workerCount + "]");
      const worker = cluster.fork();

      worker.on('message', (msg: any) => {
          const worker_id = msg.worker_id;

          if (msg.cmd === 'MASTER_ID') {
            if (cluster.workers) {
              cluster.workers[worker_id]?.send({ cmd: 'MASTER_ID', master_id: instanceId });
          }          
        }
      });
  }

  cluster.on('online', (worker) => {
      console.log('Worker Online - Worker ID : [' + worker.process.pid + ']');
  });

  cluster.on('exit', (deadWorker) => {
      console.log('Worker Dead - Worker ID : [' + deadWorker.process.pid + ']');
      console.log('Created Other Worker');

      const newWorker = cluster.fork();
      newWorker.on('message', (msg: any) => {
          const worker_id = msg.worker_id;

          if (msg.cmd === 'MASTER_ID') {
              // cluster.workers[worker_id]?.send({ cmd: 'MASTER_ID', master_id: instanceId });
              if (cluster.workers) {
                cluster.workers[worker_id]?.send({ cmd: 'MASTER_ID', master_id: instanceId });
            }            
          }
      });
  });
}

if (cluster.isWorker) {
  app.get('/', (req: Request, res: Response) => {
      res.send(` Created InstanceID: [${instanceId}],  Cluster Worker ID: [${cluster.worker?.id}]`);
  });
}

// /**
//  * Create Worker
//  * 사용중인 서버의 CPU 코어수를 가져와 2대의 컨테이너로 분리 
//  * */ 
// const cpuCount:number = os.cpus().length;
// let workerCount:number = cpuCount/2; 

// if(cluster.isPrimary) {
//   console.log('Server ID:',uuidv4);
//   console.log('Server CPU Count', cpuCount );
//   console.log('Create Worker Count', workerCount);
//   console.log(`Created ${workerCount} Workers`);
//   console.log(`Primary ${process.pid} is Running`);

//   // Worker 메시지 리스너 
//   const workerMsgListner = (worker:Worker, msg:any) => {
//     const workerId: number = msg.workerId;

//     if(msg.cmd === 'MASTER_ID') {
//       if (cluster.workers && cluster.workers[workerId]) { // cluster.workers가 존재하고 workerId에 해당하는 worker가 있는지 확인
//         cluster.workers[workerId]?.send({ cmd: 'MASTER_ID', master_id: uuidv4 });
//     }
//   } 
// }
//     //CPU 코어 수 만큼 워커 생성
//     for (let i = 0; i < workerCount; i++) {
//       console.log("Create Worker [" + (i + 1) + "/" + workerCount + "]");
//       let worker = cluster.fork();
//       // Worker 메시지 리스너 
//       worker.on('message', workerMsgListner);
//     }
    
//     //Worker online 상태가 되었을때
//     cluster.on('online', function(worker) {
//       console.log('Worker Online - Worker ID : [' + worker.process.pid + ']');
//   });

//   //Worker 죽었을 경우 다시 살림
//   cluster.on('exit', function(worker) {
//     console.log('Worker Dead - Worker ID : [' + worker.process.pid + ']');
//     console.log('Create New Worker');

//     let createdWorker = cluster.fork();
//     //Worker 요청메시지 리스너
//     createdWorker.on('message', workerMsgListner);
// });
// }


// //Router
// app.get('/', (req: Request, res: Response) => {
//   res.send('Root Router');
// });

export default app;
