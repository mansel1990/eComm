-- products table definition
CREATE TABLE `products` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `description` mediumtext,
    `price` float NOT NULL,
    `countInStock` bigint NOT NULL,
    `image` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1;

ALTER TABLE
    ecomm.products
ADD
    one_line_desc varchar(100) NULL;