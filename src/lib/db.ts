const mysql = require('mysql');
import { config } from '../config/default';

const db = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    authPlugin: 'mysql_native_password'
})

//连接指定数据库
const pool = mysql.createPool({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
    authPlugin: 'mysql_native_password'
})

const bdbs = (sql: string, values: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err: any, data: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const query = (sql: string, values: any[] = []) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err: any, connection: any) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err: any, data: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                    connection.release();
                });
            }
        })
    });
};
const sql = `CREATE DATABASE IF NOT EXISTS ${config.database.database}`;
//创建数据库
const createDatabase = (database: string) => {

    return bdbs(database, []);
}
//创建数据表
//留言/照片
let walls = `
create table if not exists walls(
id INT NOT NULL AUTO_INCREMENT,
type INT NOT NULL COMMENT '类型0信息1图片',
message VARCHAR(1000) COMMENT '留言',
name VARCHAR(100) NOT NULL COMMENT '用户名',
userId VARCHAR(100) NOT NULL COMMENT '创建者ID',
moment VARCHAR(100) NOT NULL COMMENT '时间',
label INT NOT NULL COMMENT "标签",
color INT COMMENT '颜色',
imgurl VARCHAR(100) COMMENT '图片路径',
PRIMARY KEY ( id )
);`
let walls2 = `
create table if not exists walls(
id INT NOT NULL AUTO_INCREMENT,
type INT NOT NULL COMMENT '类型0信息1图片',
message VARCHAR(1000) COMMENT '留言',
name VARCHAR(100) NOT NULL COMMENT '用户名',
userId VARCHAR(100) NOT NULL COMMENT '创建者ID',
moment VARCHAR(100) NOT NULL COMMENT '时间',
label INT NOT NULL COMMENT "标签",
color INT COMMENT '颜色',
imgurl VARCHAR(100) COMMENT '图片路径',
PRIMARY KEY ( id )
);`
//留言反馈
let feedbacks = `create table if not exists feedbacks(id INT NOT NULL AUTO_INCREMENT,wallId INT NOT NULL COMMENT '墙留言ID',userId VARCHAR(100) NOT NULL COMMENT '反馈者ID',type INT NOT NULL COMMENT '反馈类型0喜欢1举报2撤销',moment VARCHAR(100) NOT NULL COMMENT '时间',PRIMARY KEY ( id )
);`
//评论
let comments = `create table if not exists comments(id INT NOT NULL AUTO_INCREMENT,
wallId INT NOT NULL COMMENT '墙留言ID',
userId VARCHAR(100) NOT NULL COMMENT '评论者ID',
imgurl VARCHAR(100) COMMENT '头像路径',
comment VARCHAR(1000) COMMENT '评论内容',
name VARCHAR(100) NOT NULL COMMENT '用户名',
moment VARCHAR(100) NOT NULL COMMENT '时间',
 PRIMARY KEY ( id )
);`

let createTable = (sql: string) => {
    return query(sql, []);
}

async function init() {
    await createDatabase(sql);
    await createTable(walls);
    await createTable(walls2);
    await createTable(feedbacks);
    await createTable(comments);
}

init();

export const insertWall = (value: string[]) => {
    let sql = "insert into walls set type=?,message=?,name=?,userId=?,moment=?,label=?,color=?,imgurl=?"
    return query(sql, value)
}
export const insertWall2 = (value: string[]) => {
    let sql = "insert into walls2 set type=?,message=?,name=?,userId=?,moment=?,label=?,color=?,imgurl=?"
    return query(sql, value)
}
//新增反馈
export const insertFeedback = (value: string[]) => {
    let _sql = 'insert feedbacks set wallId=?,userId=?,type=?,moment=?;'
    return query(_sql, value)
}
//新增评论
export const insertComment = (value: string[]) => {
    let _sql = 'insert comments set wallId=?,userId=?,imgurl=?,moment=?,comment=?,name=?;'
    return query(_sql, value)
}
//删除墙
export const deleteWall = (id: number) => {
    const escapedId = mysql.escape(id);
    let _sql = `delete from walls where id="${escapedId}";`
    return query(_sql, [])
}

//删除反馈
exports.deleteFeedback = (id: number) => {
    let _sql = `delete from feedbacks where id = '${id}';`
    return query(_sql)
}
//删除评论
exports.deleteComments = (id: number) => {
    let _sql = `delete from comments where id = '${id}';`
    return query(_sql)
}

//分页查询墙
exports.findWallPage = (page: number, pagesize: number, type: number, label: number) => {
    let _sql = '';
    page = mysql.escape(page)
    pagesize = mysql.escape(pagesize)
    type = mysql.escape(type)
    label = mysql.escape(label)

    if (label == -1) {
        _sql = `select * from walls where type = ${type} order by id desc limit ${(page - 1) * pagesize}, ${pagesize};`
    } else {
        _sql = `select * from walls where type = ${type} and label='${label}' order by id desc limit ${(page - 1) * pagesize}, ${pagesize};`
    }
    return query(_sql)
}

//是否点赞
export const likeCount = (wid: string, uid: string) => {
    wid = mysql.escape(wid);
    uid = mysql.escape(uid);
    let _sql = ` select count(*) as count from feedbacks where wallId ='${wid}' and userId='${uid}' and type=0;`
    return query(_sql, [])
}

export const findCommentPage = (page: number, pagesize: number, id: number) => {
    page = mysql.escape(page);
    pagesize = mysql.escape(pagesize);
    id = mysql.escape(id);

    let _sql = `select * from comments where wallId = '${id}' order by id desc limit ${(page - 1) * pagesize}, ${pagesize};`
    return query(_sql)
}