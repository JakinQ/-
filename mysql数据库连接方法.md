### 参考链接
https://www.jianshu.com/p/c98afa0be728


1.先下载mysql,配置环境变量

2.配置 my.ini
3.初始化mysqld
执行mysqld --initialize --console ; (会生产data文件夹)
console里面有初始密码
在执行mysqld --initialize--console ;命令后未生成data文件夹，再执行mysqld --no-defaults --initialize; (此时会生产data文件夹)

4、安装 mysqld

输入安装命令：

mysqld install

5、启动mysql服务

输入启动服务命令：

net start mysql  

（net stop mysql  是停止服务命令）

6、登录mysql

命令行继续输入：

mysql -u root -p 

回车确认，输入前面的初始密码，进入mysql>命令

7、修改密码

初始密码不好记，我们可以修改密码：

输入命令修改密码：

ALTER USER USER() IDENTIFIED BY 'root123456';

输入命令使密码不过期：

ALTER USER 'root'@'localhost' PASSWORD EXPIRE NEVER;

如果node链接数据库是把你,出现了Client does not support authentication protocol requested by server; consider upgrading MySQL client错误则:
修改mysql的加密规则
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root' PASSWORD EXPIRE NEVER;
PASSWORD 前的root为数据库连接密码
或ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
BY 后的root为数据库连接密码



密码：root