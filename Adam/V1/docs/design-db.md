# 数据库设计

-- db.adam

    -- tb.userInfo

    -- tb.musicInfo

    -- tb.playHistory

## userInfo

    **[说明]**

        记录用户信息

    **[字段]**

        * id:INT -> 用户ID，自增长，**主键**

        * auth:TINYINT(1) -> 用户认证类型，[ 1：微信（默认） | 2：qq | 3：微博 ]

        * openId:VARCHAR(50) -> 用户微信openId

        * avatar:VARCHAR(255) -> 用户微信头像url

        * nickName:VARCHAR(50) -> 用户微信昵称

        * gender:BINARY(1) -> 用户性别，[ 0：女（默认） | 1：男 ]

        * province:VARCHAR(10) -> 用户所在省份

        * city:VARCHAR(10) -> 用户所在城市

        * regTimestamp:VARCHAR(13) -> 用户注册时间戳

        * lastSigninTimestamp:VARCHAR(13) -> 用户上次登录时间戳

## musicInfo

    **[说明]**

        记录音乐信息

    **[字段]**

        * id:INT -> 音乐ID，**主键**

        * src:VARCHAR(255) -> 音乐文件地址

        * lyric:BIGTEXT -> 音乐歌词

        * name:VARCHAR(255) -> 音乐名称

        * type:VARCHAR(255) -> 音乐类型

        * artistId:INT -> 音乐创作者ID

        * artistName:VARCHAR(255) -> 音乐创作者名称

        * artistPicUrl:VARCHAR(255) -> 音乐创作者图片地址

        * albumId:INT -> 专辑ID

        * albumName:VARCHAR(255) -> 专辑名称

        * albumPicUrl:VARCHAR(255) -> 专辑图片地址

        * albumDisc:BIGTEXT -> 专辑描述

## playHistory

    **[说明]**

        记录用户播放音乐操作记录

    **[字段]**

        * id:INT -> 操作ID，自增长，**主键**

        * userId:INT -> 用户ID，索引，**主键**

        * musicId:INT -> 音乐ID，索引，**主键**

        * playDuration:BIGINT -> 播放时长（毫秒）

        * playTimestamp:BIGINT -> 播放的日期时间（毫秒）

        * playBreak:BOOL -> 是否中断了播放

        * breakType:TINYINT -> 中断类型[ 0：上一首 | 1：下一首 | 2：播放其他歌曲 | 3：其他中断（默认） ]