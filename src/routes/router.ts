import express from 'express';
// import { UserController } from '../controller/userController';
import { insertWallC, insertFeedback, insertComment, deleteWall, deleteFeedback, findWallPage, findCommentPage } from '../controller/dbServe';
// const controller = require('../controller/dbServe')

const router = express.Router();
// const wallsController = require('../controller/wallsController');
import { wallsController } from '../controller/wallsController';
// console.log(wallsController);
// wallsController.aa()
// // 增加留言
// router.post('/insertWall', wallsController.insertWall);
// router.post('/insertWall', (req, res) => {
//     console.log(23123);
//     // const { type, message, name, userId, moment, label, color, imgurl } = req.body;
//     wallsController.insertWall(req, res);
//     // console.log(type, message, name, userId, moment, label, color, imgurl);

//     // console.log(res);
// })

/**
 * 
 * @api {post} /api/user 添加用户
 * @apiName addUser
 * @apiGroup usergroup
 * @apiVersion 1.0.0
 * @apiParam  {String} username 用户名
 * @apiParam  {String} password 密码
 * @apiParam  {File} avatar 头像
 * @apiSuccess (200) {String} status 状态
 * @apiSuccess (200) {String} message 消息
 * @apiParamExample  {multipart/from-data} Request-Example:
 * {
 *     username : "abc",
 *     password : "123",
 *     avatar : File
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *    {
 *      status:"success",
 *      message:"delete successfully"
 *    }
 * }
 * 
 * 
 */
router.post('/insertWall', insertWallC)
router.post('/insertFeedback', insertFeedback)
//新建评论
router.post('/insertComment', insertComment)
//删除墙
router.post('/deleteWall', deleteWall)

//删除反馈
router.post('/deleteFeedback', deleteFeedback)
//分页查询墙
router.post('/findWallPage', findWallPage)
//分页查询评论
router.post('/findCommentPage', findCommentPage)


router.post('/signip', (req, res) => {
    const ip = req.ip;
    res.status(200).json({
        code: 200,
        message: 'get ip success',
        ip: ip
    });
    console.log(111111111111111);

});
module.exports = router;
