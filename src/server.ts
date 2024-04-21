import app from './index';
import morgan from 'morgan';

import cluster from 'cluster';
import os from 'os';
import {v4 as uuidv4} from 'uuid';

import { trackingIpMiddleware } from './middleware/common';
import { errorHandlingMiddleware } from './middleware/error';

if(process.env.NODE_ENV === 'development') {
    console.log("dev mode");
    app.use(morgan('dev'));
    app.use(trackingIpMiddleware);
    app.use(errorHandlingMiddleware);
}

if (cluster.isPrimary) {
    /**
      * Create Worker
      * 사용중인 서버의 CPU 코어수를 가져와 2대의 컨테이너로 분리 
      * */ 

    const cpuCount = os.cpus().length;
    const workerCount = Math.floor(cpuCount / 2);

    for (let i = 0; i < workerCount; i++) {
        cluster.fork();
    }
} else {
    const server = app.listen(app.get('port'), () => {
        console.log(`
        Server Application running at http://localhost:${app.get('port')}
        `);
    });
}

// const server = app.listen(app.get('port'),() =>{
//     console.log(`
//     Server Application running at http://localhost:${app.get('port')}
//     `);
// });

// export default server;

