-- users table definition
CREATE TABLE `users` (
    `user_id` bigint NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `email` varchar(100) NOT NULL,
    `password` varchar(100) NOT NULL,
    `is_admin` tinyint(1) NOT NULL DEFAULT '0',
    `phone_number` varchar(100) NOT NULL,
    PRIMARY KEY (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1;