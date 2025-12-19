package repository

import (
	"github.com/aihouRi/task-manager/backend/internal/domain"
	"github.com/aihouRi/task-manager/backend/internal/model"
	"gorm.io/gorm"
)

type authRepository struct {
	db *gorm.DB
}

func NewAuthRepository(db *gorm.DB) AuthRepository {
	return &authRepository{db: db}
}

func (r *authRepository) CreateUser(user domain.User) (domain.User, error) {
	modelUser := &model.User{Name: user.Name, Email: user.Email, Password: user.Password}
	if err := r.db.Create(modelUser).Error; err != nil {
		return domain.User{}, err
	}

	domainUser := domain.User{ID: modelUser.ID, Name: modelUser.Name, Email: modelUser.Email, Password: modelUser.Password}

	return domainUser, nil
}

func (r *authRepository) GetByEmail(email string) (domain.User, error) {
	var modelUser model.User
	if err := r.db.
		Where("email = ?", email).
		First(&modelUser).Error; err != nil {
		return domain.User{}, err
	}

	domainUser := domain.User{ID: modelUser.ID, Name: modelUser.Name, Email: modelUser.Email, Password: modelUser.Password}

	return domainUser, nil
}

func (r *authRepository) GetByID(id int) (domain.User, error) {
	var modelUser model.User
	if err := r.db.
		First(&modelUser, id).Error; err != nil {
		return domain.User{}, err
	}

	domainUser := domain.User{ID: modelUser.ID, Name: modelUser.Name, Email: modelUser.Email, Password: modelUser.Password}

	return domainUser, nil
}
