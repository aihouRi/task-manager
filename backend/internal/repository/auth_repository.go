package repository

import "github.com/aihouRi/task-manager/backend/internal/domain"

type AuthRepository interface {
	CreateUser(user domain.User) (domain.User, error)
	GetByEmail(email string) (domain.User, error)
	GetByID(id int) (domain.User, error)
}
