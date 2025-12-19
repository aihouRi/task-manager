package usecase

import "github.com/aihouRi/task-manager/backend/internal/domain"

type TaskUsecase interface {
	CreateTask(userID int, title, description string) (domain.Task, error)
	GetTasks(userID int) ([]domain.Task, error)
	GetTaskByID(userID, taskID int) (domain.Task, error)
	UpdateTask(userID, taskID int, title, description string, status bool) (domain.Task, error)
	DeleteTask(userID, taskID int) error
}
