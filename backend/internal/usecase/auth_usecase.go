package usecase

import "github.com/aihouRi/task-manager/backend/internal/domain"

type AuthUsecase interface {
	Register(email, password string) (domain.User, error)
	Login(email, password string) (string, error)
}
