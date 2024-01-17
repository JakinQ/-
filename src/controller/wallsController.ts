import { Request, Response } from 'express';
import wallService from '../services/wallService';
import { IWalls } from '../models/wallModal';
import { errorHandler } from '../lib/path-to-error-handler-middleware';
const dbModel = require('../lib/db');

export const wallsController = {
    insertWall: async (req: any, res: any) => {
        const data: IWalls = req.body;
        console.log("data", data);
        await wallService.insertWall(data)
        res.send({ data:data,status: "success", message: "insert successfully" })

    },
    // insertWall: errorHandler(async (req: Request, res: Response) => {
    //     console.log("1111", req.body);

    //     const data: IWalls = req.body;
    //     const result = await wallService.insertWall(data)
    //     res.status(200).json({
    //         code: 200,
    //         message: 'insertWall success',
    //         result
    //     });
    //     console.log(result);
    //     console.log(res);

    // }),

}


