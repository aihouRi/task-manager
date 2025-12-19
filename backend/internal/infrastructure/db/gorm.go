package db

import (
	"errors"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func NewDB() (*gorm.DB, error) {
	dsn := os.Getenv("DB_DSN")
	if dsn == "" {
		return nil, errors.New("DB_DSN is not set")
	}
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	return db, nil
}
