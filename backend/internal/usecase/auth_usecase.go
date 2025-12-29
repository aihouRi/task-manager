package usecase

import "github.com/aihouRi/task-manager/backend/internal/domain"

type LoginResult struct {
	Token string
	Name  string
	Email string
}

type AuthUsecase interface {
	Register(name, email, password string) (domain.User, error)
	Login(email, password string) (*LoginResult, error)
}
