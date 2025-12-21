package usecase

import (
	"errors"
	"fmt"

	"github.com/aihouRi/task-manager/backend/internal/auth"
	"github.com/aihouRi/task-manager/backend/internal/domain"
	"github.com/aihouRi/task-manager/backend/internal/repository"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type authUsecase struct {
	authRepo repository.AuthRepository
}

func NewAuthUsecase(repo repository.AuthRepository) AuthUsecase {
	return &authUsecase{authRepo: repo}
}

func (u *authUsecase) Register(name, email, password string) (domain.User, error) {
	_, err := u.authRepo.GetByEmail(email)
	if err == nil {
		return domain.User{}, fmt.Errorf("user already exists.")
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return domain.User{}, err
	}

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return domain.User{}, fmt.Errorf("failed to process password!")
	}

	user := domain.User{
		Name:     name,
		Email:    email,
		Password: string(passwordHash),
	}

	newUser, err := u.authRepo.CreateUser(user)
	if err != nil {
		return domain.User{}, fmt.Errorf("User creation failed!")
	}

	return newUser, nil
}

func (u *authUsecase) Login(email, password string) (string, error) {
	user, err := u.authRepo.GetByEmail(email)
	if err != nil {
		return "", fmt.Errorf("login failed")
	}

	if err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return "", fmt.Errorf("login failed")
	}

	token, err := auth.GenerateToken(user)
	if err != nil {
		return "", err
	}

	return token, nil
}
