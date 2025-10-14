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
  `hasFullBlacksmith` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `UUType` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `hasRendemption` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `architectureSet` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `hasCannonGalleon` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
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
  `nickname` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'Anonymous',
  'password'varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '12345',
  `token` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `currentCiv` int NOT NULL,
  'currentUnit' int NOT NULL,
  `timestamp` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `country` varchar(5) DEFAULT NULL,
  'streak' int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86534 DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `UserSolvedCivs`
--
DROP TABLE IF EXISTS `UserSolvedCivs`;
CREATE TABLE `UserSolvedCivs` (
  `userId` int NOT NULL,
  `civId` int NOT NULL,
  PRIMARY KEY (`userId`,`civId`),
  KEY `UserSolvedCivs_civId_fkey` (`civId`),
  CONSTRAINT `UserSolvedCivs_civId_fkey` FOREIGN KEY (`civId`) REFERENCES `civs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserSolvedCivs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `UserSolvedUnits`
--
DROP TABLE IF EXISTS `UserSolvedUnits`;
CREATE TABLE `UserSolvedUnits` (
  `userId` int NOT NULL,
  `civId` int NOT NULL,
  PRIMARY KEY (`userId`,`civId`),
  KEY `UserSolvedUnits_splashId_fkey` (`civId`),
  CONSTRAINT `UserSolvedUnits_splashId_fkey` FOREIGN KEY (`civId`) REFERENCES `civs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserSolvedUnits_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;