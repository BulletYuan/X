/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3306
 Source Schema         : db.wolf

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 15/11/2019 17:16:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for page_pool
-- ----------------------------
DROP TABLE IF EXISTS `page_pool`;
CREATE TABLE `page_pool` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `urlId` int(11) DEFAULT NULL,
  `contentHash` text COLLATE utf8_bin,
  `createTime` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`urlId`),
  CONSTRAINT `id` FOREIGN KEY (`urlId`) REFERENCES `url_pool` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for url_pool
-- ----------------------------
DROP TABLE IF EXISTS `url_pool`;
CREATE TABLE `url_pool` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `topic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `digest` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `thumb` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `keywords` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `time` int(10) DEFAULT NULL,
  `state` tinyint(1) DEFAULT '0' COMMENT '0 未爬取\r\n1 爬取成功\r\n2 爬取失败',
  `createTime` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=35917 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
