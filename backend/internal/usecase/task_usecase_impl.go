package usecase

import (
	"fmt"

	"github.com/aihouRi/task-manager/backend/internal/domain"
	"github.com/aihouRi/task-manager/backend/internal/repository"
)

type taskUsecase struct {
	taskRepo repository.TaskRepository
}

func NewTaskUsecase(repo repository.TaskRepository) TaskUsecase {
	return &taskUsecase{taskRepo: repo}
}

func (u *taskUsecase) CreateTask(userID int, title, description string) (domain.Task, error) {
	if title == "" {
		return domain.Task{}, fmt.Errorf("title is empty")
	} else if description == "" {
		return domain.Task{}, fmt.Errorf("description is empty")
	}

	newTask := domain.Task{
		Title:       title,
		Description: description,
		UserID:      userID,
	}
	task, err := u.taskRepo.CreateTask(newTask)
	if err != nil {
		return domain.Task{}, err
	}
	return task, nil
}

func (u *taskUsecase) GetTasks(userID int) ([]domain.Task, error) {
	tasks, err := u.taskRepo.GetByUserID(userID)
	if err != nil {
		return []domain.Task{}, err
	}
	return tasks, nil
}

func (u *taskUsecase) GetTaskByID(userID, taskID int) (domain.Task, error) {
	task, err := u.taskRepo.GetByID(taskID)
	if err != nil {
		return domain.Task{}, err
	}

	if task.UserID != userID {
		return domain.Task{}, fmt.Errorf("permission denied")
	}
	return task, nil
}

func (u *taskUsecase) UpdateTask(userID, taskID int, title, description string, status bool) (domain.Task, error) {
	task, err := u.taskRepo.GetByID(taskID)
	if err != nil {
		return domain.Task{}, err
	}
	if task.UserID != userID {
		return domain.Task{}, fmt.Errorf("permission denied")
	}

	newTask := domain.Task{
		ID:          taskID,
		Title:       title,
		Description: description,
		Status:      status,
		UserID:      userID,
	}

	finalTask, err := u.taskRepo.UpdateTask(newTask)
	if err != nil {
		return domain.Task{}, err
	}
	return finalTask, nil
}

func (u *taskUsecase) DeleteTask(userID, taskID int) error {
	task, err := u.taskRepo.GetByID(taskID)
	if err != nil {
		return err
	}
	if task.UserID != userID {
		return fmt.Errorf("permission denied")
	}

	err = u.taskRepo.DeleteTask(taskID)
	if err != nil {
		return err
	}

	return nil
}
