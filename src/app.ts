import express from 'express';
// import { getRouter } from './routes/router';
import { config } from './config/default';
const wallRouter = require('./routes/router')
const bodyParser = require('body-parser');
const main = async () => {
    const app = express();
    const port = 8091;
    app.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')

        //返回json
        res.header('Content-Type', 'application/json;charset=utf-8')
        if (req.method == 'OPTIONS') {
            //让options请求快速返回
            res.sendStatus(200)
        } else {
            next()
        }
    })
    // app.use(compression());
    // app.use('/static', express.static(config.staticFilePath));
    app.use(bodyParser.json());
    // app.post('/insertWall', (req, res) => {
    //     console.log("aa323", req.body);

    //     res.send('Hello World122!');
    // });

    app.use('/apis', (req, res) => {
        console.log(111);

        res.send('Hello World1!');
    });
    // app.use('/insertFeedback', wallRouter);
    app.use('/wall', wallRouter);
    app.use('/user', wallRouter);
    app.listen(process.env.PORT || config.port, () => {
        console.log(`server started at http://localhost:${port}`);

    });

};

main();