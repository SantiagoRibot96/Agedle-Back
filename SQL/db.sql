CREATE DATABASE IF NOT EXISTS `agedle`;

USE `agedle`;

--
-- Table structure for table `civs`
--
DROP TABLE IF EXISTS `civs`;
CREATE TABLE `civs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `dlc` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `has_full_blacksmith` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `uu_type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `has_rendemption` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `architecture_set` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `has_cannon_galleon` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT `Anonymous`,
  `password`varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT `12345`,
  `token` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `current_civ` int NOT NULL,
  `current_unit` int NOT NULL,
  `timestamp` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `country` varchar(5) DEFAULT NULL,
  `streak` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86534 DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `user_solved_civs`
--
DROP TABLE IF EXISTS `user_solved_civs`;
CREATE TABLE `user_solved_civs` (
  `user_id` int NOT NULL,
  `civ_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`civ_id`),
  KEY `user_solved_civs_civ_id_fkey` (`civ_id`),
  CONSTRAINT `user_solved_civs_civ_id_fkey` FOREIGN KEY (`civ_id`) REFERENCES `civs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_solved_civs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `user_solved_units`
--
DROP TABLE IF EXISTS `user_solved_units`;
CREATE TABLE `user_solved_units` (
  `user_id` int NOT NULL,
  `civ_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`civ_id`),
  KEY `user_solved_units_civ_id_fkey` (`civ_id`),
  CONSTRAINT `user_solved_units_civ_id_fkey` FOREIGN KEY (`civ_id`) REFERENCES `civs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_solved_units_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;