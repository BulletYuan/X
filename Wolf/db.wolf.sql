/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80014
 Source Host           : localhost:3306
 Source Schema         : db.wolf

 Target Server Type    : MySQL
 Target Server Version : 80014
 File Encoding         : 65001

 Date: 25/10/2019 21:14:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for url_pool
-- ----------------------------
DROP TABLE IF EXISTS `url_pool`;
CREATE TABLE `url_pool`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `topic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `digest` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `thumb` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `keywords` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `time` int(10) NULL DEFAULT NULL,
  `state` tinyint(1) NULL DEFAULT 0 COMMENT '0 未爬取\r\n1 爬取成功\r\n2 爬取失败',
  `createTime` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of url_pool
-- ----------------------------
INSERT INTO `url_pool` VALUES (1, 'test', 'test', NULL, NULL, NULL, 100, 0, NULL);
INSERT INTO `url_pool` VALUES (2, 'test', 'test', NULL, NULL, NULL, 100, 0, NULL);
INSERT INTO `url_pool` VALUES (3, 'test', 'test', NULL, NULL, NULL, 100, 0, NULL);
INSERT INTO `url_pool` VALUES (4, 'test1', 'test', NULL, NULL, NULL, 10, 0, NULL);
INSERT INTO `url_pool` VALUES (5, 'test', 'test', NULL, NULL, NULL, 100, 0, NULL);
INSERT INTO `url_pool` VALUES (6, 'test', 'test', NULL, NULL, NULL, 100, 0, NULL);
INSERT INTO `url_pool` VALUES (7, 'test', 'test', NULL, NULL, NULL, 100, 0, NULL);

SET FOREIGN_KEY_CHECKS = 1;
