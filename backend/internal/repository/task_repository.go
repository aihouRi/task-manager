package repository

import "github.com/aihouRi/task-manager/backend/internal/domain"

type TaskRepository interface {
	CreateTask(task domain.Task) (domain.Task, error)
	GetByUserID(userID int) ([]domain.Task, error)
	GetByID(taskID int) (domain.Task, error)
	UpdateTask(task domain.Task) (domain.Task, error)
	DeleteTask(taskID int) error
}
