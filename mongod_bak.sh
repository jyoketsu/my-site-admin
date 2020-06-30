#!/bin/sh

DB_USER="jyoketsu"                # 数据库操作员
DB_PASS="password"                # 数据库操作员密码
TAR_DIR="/data/backup/mongod"     # 备份文件正式目录，例如：/data/backup/mongod
OUT_DIR="/data/backup/mongod/tmp" # 备份文件临时目录，例如：/data/backup/mongod/tmp

DUMP=mongodump
DATE=`date +%Y_%m_%d_%H_%M_%S`    # 备份文件将以备份时间保存
DAYS=14                           # 保留最新14天的备份
TAR_BAK="mongod_bak_$DATE.tar.gz" # 备份文件命名格式

mkdir -p $OUT_DIR && cd $OUT_DIR                   # 务必确保 $OUT_DIR 路径正确，否则可能引起致命错误
# rm -rf $OUT_DIR/*                                  # 清空临时目录
mkdir -p $OUT_DIR/$DATE                            # 创建本次备份文件夹
# $DUMP -u $DB_USER -p $DB_PASS -o $OUT_DIR/$DATE  # 执行备份命令
$DUMP -o $OUT_DIR/$DATE                            # 执行备份命令
tar -zcvf $TAR_DIR/$TAR_BAK $OUT_DIR/$DATE         # 将备份文件打包放入正式目录
find $TAR_DIR/ -mtime +$DAYS -delete               # 删除14天前的旧备份