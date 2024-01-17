// import { IWalls } from '../models/wallModal';
// import { insertWallC } from '../controller/dbServe';
// import { errorHandler } from '../lib/path-to-error-handler-middleware';
// const dbModel = require('../lib/db');

// // export const insertWall = async (data: IWalls): Promise<IWalls> => {
// //     // You can add business logic or validation here before interacting with the repository
// //     const insertWall = await insertWallC(data);
// //     return insertWall;
// // };


// const WallServices = {
//     insertWall: errorHandler(async (req: Request, res: Response) => {
//         const data: IWalls = req.body;

//         const result = await dbModel.insertWall([data.type, data.message, data.name, data.userId, data.moment, data.label, data.color, data.imgUrl]);

//         res.status(200).json({
//             code: 200,
//             message: 'insertWall success',
//             result
//         });
//     });
// }

import { IWalls } from '../models/wallModal';
import { insertWallC } from '../controller/dbServe';
import { errorHandler } from '../lib/path-to-error-handler-middleware';
const dbModel = require('../lib/db');
const WallServices = {
    insertWall: (data: IWalls) => {
        dbModel.insertWall([
            data.type,
            data.message,
            data.name,
            data.userId,
            data.moment,
            data.label,
            data.color,
            data.imgUrl
        ]);

    }
};

export default WallServices;
