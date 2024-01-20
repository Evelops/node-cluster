import app from './index';
import morgan from 'morgan';

import { trackingIpMiddleware } from './middleware/common';
import { errorHandlingMiddleware } from './middleware/error';

if(process.env.NODE_ENV === 'development') {
    console.log("dev mode");
    app.use(morgan('dev'));
    app.use(trackingIpMiddleware);
    app.use(errorHandlingMiddleware);
}

const server = app.listen(app.get('port'),() =>{
    console.log(`
    Server Application running at http://localhost:${app.get('port')}
    `);
});

export default server;

