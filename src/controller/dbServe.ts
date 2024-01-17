const dbModel = require('../lib/db');
import { Request, Response } from 'express';
import { errorHandler } from '../lib/path-to-error-handler-middleware';
interface IWalls {
    id: number;
    type: number;
    message: string;
    name: string;
    userId: string;
    moment: string;
    createTime: string;
    updateTime: string;
    label: number;
    color: string;
    imgUrl: string;
    wallId: number;
    comment: string;
    feedBackId: number;
    page: number;
    pagesize: number;

}
// exports.insertWall = async (req: Request, res: Response) => {
//     let data: IWalls = req.body;
//     // await dbServer.insertWall([[data.type, data.message, data.name, data.userId, data.moment, data.label, data.color, data.imgUrl]]).then((res: any) => {
//     //     res.status(200).json({
//     //         code: 200,
//     //         message: 'insertWall success',
//     //         result // You might want to send the result here
//     //     });

//     // }).catch((err: any) => {
//     //     console.log(err);
//     // })
//     const result = await dbServer.insertWall([[data.type, data.message, data.name, data.userId, data.moment, data.label, data.color, data.imgUrl]])

// }

export const insertWallC = errorHandler(async (req: Request, res: Response) => {
    const data: IWalls = req.body;

    const result = await dbModel.insertWall([data.type, data.message, data.name, data.userId, data.moment, data.label, data.color, data.imgUrl]);
    console.log(22222222);

    // res.status(200).json({
    //     code: 200,
    //     message: 'insertWall success',
    //     result
    // });
    res.send({
        code: 200,
        message: 'insertWall success',
        result: data
    })
});



export const insertFeedback = errorHandler(async (req: Request, res: Response) => {
    const data: IWalls = req.body;

    const result = await dbModel.insertFeedback([data.wallId, data.userId, data.type, data.moment]);

    res.status(200).json({
        code: 200,
        message: 'insertFeedback success',
        result
    });
});
export const insertComment = errorHandler(async (req: Request, res: Response) => {
    const data: IWalls = req.body;
    //如果存在图片，删除图片
    if (data.imgUrl) {

    }
    const result = await dbModel.insertComment([data.wallId, data.userId, data.imgUrl, data.moment, data.comment, data.name])

    res.status(200).json({
        code: 200,
        message: 'insertComment success',
        result
    });
});


export const deleteWall = errorHandler(async (req: Request, res: Response) => {
    const data: IWalls = req.body;

    const result = await dbModel.deleteWall(data.wallId);

    res.status(200).json({
        code: 200,
        message: 'insertComment success',
        result
    });
});
export const deleteFeedback = errorHandler(async (req: Request, res: Response) => {
    const data: IWalls = req.body;

    const result = await dbModel.deleteFeedback(data.feedBackId);

    res.status(200).json({
        code: 200,
        message: 'insertComment success',
        result
    });
});

//分页查询wall并获取赞、举报、撤销数据
export const findWallPage = errorHandler(async (req: Request, res: Response) => {
    let data = req.body
    await dbModel.findWallPage(data.page, data.pagesize, data.type, data.label)
        .then(async (result: string | any[]) => {
            for (let i = 0; i < result.length; i++) {
                //查找相应wall的赞、举报、撤销数据
                //喜欢
                result[i].like = await dbModel.feedbackCount(result[i].id, 0)
                //举报
                result[i].report = await dbModel.feedbackCount(result[i].id, 1)
                //撤销
                result[i].revoke = await dbModel.feedbackCount(result[i].id, 2)
                //是否点赞
                result[i].islike = await dbModel.likeCount(result[i].id, data.userId)
                //评论数
                result[i].comcount = await dbModel.commentCount(result[i].id)
            }
            res.send({
                code: 200,
                message: res
            })
        })
});

export const findCommentPage = errorHandler(async (req: Request, res: Response) => {
    const data: IWalls = req.body;

    const result = await dbModel.findCommentPage(data.page, data.pagesize, data.id)

    res.status(200).json({
        code: 200,
        message: 'findCommentPage success',
        result
    });
});


