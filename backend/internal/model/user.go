package model

import "time"

type User struct {
	ID        int `gorm:"primaryKey;autoIncrement"`
	Name      string `gorm:"not null"`
	Email     string `gorm:"unique;not null"`
	Password  string `gorm:"not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
