-- orders table definition
CREATE TABLE `orders` (
    `order_id` bigint NOT NULL AUTO_INCREMENT,
    `user_id` bigint NOT NULL,
    `order_items` mediumtext NOT NULL,
    `shipping_address` mediumtext NOT NULL,
    `payment_method` varchar(100),
    `items_price` float NOT NULL,
    `shipping_price` float,
    `total_price` float NOT NULL,
    `order_date` datetime DEFAULT current_timestamp(),
    PRIMARY KEY (`order_id`),
    KEY `orders_FK` (`user_id`),
    CONSTRAINT `orders_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1;

ALTER TABLE
    orders
ADD
    paid_on DATETIME NULL;

ALTER TABLE
    orders
ADD
    delivered_on DATETIME NULL;

ALTER TABLE
    orders
ADD
    order_accepted BOOL NULL;

ALTER TABLE
    orders
ADD
    shipped BOOL NULL;