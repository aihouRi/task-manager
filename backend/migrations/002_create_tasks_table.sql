-- +goose Up
CREATE TABLE
    `tasks` (
        `id` INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
        `title` VARCHAR(255) NOT NULL,
        `description` TEXT NOT NULL,
        `status` BOOLEAN NOT NULL DEFAULT 0,
        `user_id` INTEGER NOT NULL,
        `created_at` DATETIME (3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        `updated_at` DATETIME (3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
        INDEX `idx_tasks_user_id` (`user_id`),
        CONSTRAINT `fk_tasks_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
    );

-- +goose Down
DROP TABLE IF EXISTS `tasks`;