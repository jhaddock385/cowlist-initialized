

DROP TABLE IF EXISTS `cows`;
		
CREATE TABLE `cows2` (
  `id` INTEGER AUTO_INCREMENT,
  `name` VARCHAR(30) NULL,
  `description` VARCHAR(240),
  PRIMARY KEY (`id`)
);


INSERT INTO `cows2` (`name`,`description`) VALUES
('morrison','another sad cow');

INSERT INTO 'cows2' ('name','description') VALUES
('morrison','another sad cow');