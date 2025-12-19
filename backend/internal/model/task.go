package model

import "time"

type Task struct {
	ID          int    `gorm:"primaryKey;autoIncrement"`
	Title       string `gorm:"not null"`
	Description string `gorm:"not null"`
	Status      bool   `gorm:"not null;default:false"`
	UserID      int    `gorm:"not null"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
