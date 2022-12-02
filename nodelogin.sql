-- CREATE TABLE `users` (
--   `id` int primary key AUTO_INCREMENT,
--   `name` varchar(150) NOT NULL,
--   `email` varchar(150) NOT NULL Unique,
--   `password` varchar(150) NOT NULL,
--   `created_at` timestamp NOT NULL DEFAULT current_timestamp()
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `admin`(
`id` int primary key AUTO_INCREMENT,
`user_name` varchar(150) NOT NULL Unique,
`password` varchar(150) NOT NULL,
`created_at` timestamp NOT NULL DEFAULT current_timestamp()
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
