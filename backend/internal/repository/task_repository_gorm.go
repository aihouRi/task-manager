package repository

import (
	"github.com/aihouRi/task-manager/backend/internal/domain"
	"github.com/aihouRi/task-manager/backend/internal/model"
	"gorm.io/gorm"
)

type taskRepository struct {
	db *gorm.DB
}

func NewTaskRepository(db *gorm.DB) TaskRepository {
	return &taskRepository{db: db}
}

func (r *taskRepository) CreateTask(task domain.Task) (domain.Task, error) {
	modelTask := model.Task{Title: task.Title, Description: task.Description, Status: task.Status, UserID: task.UserID}
	if err := r.db.Create(&modelTask).Error; err != nil {
		return domain.Task{}, err
	}
	domainTask := domain.Task{ID: modelTask.ID, Title: modelTask.Title, Description: modelTask.Description, Status: modelTask.Status, UserID: modelTask.UserID}

	return domainTask, nil
}

func (r *taskRepository) GetByUserID(userID int) ([]domain.Task, error) {
	var modelTasks []model.Task
	if err := r.db.
		Where("user_id = ?", userID).
		Find(&modelTasks).Error; err != nil {
		return []domain.Task{}, err
	}

	domainTasks := make([]domain.Task, 0, len(modelTasks))
	for _, t := range modelTasks {
		domainTasks = append(domainTasks, domain.Task{
			ID:          t.ID,
			Title:       t.Title,
			Description: t.Description,
			Status:      t.Status,
			UserID:      t.UserID,
		})
	}

	return domainTasks, nil
}

func (r *taskRepository) GetByID(id int) (domain.Task, error) {
	var modelTask model.Task
	if err := r.db.First(&modelTask, id).Error; err != nil {
		return domain.Task{}, err
	}

	domainTask := domain.Task{ID: modelTask.ID, Title: modelTask.Title, Description: modelTask.Description, Status: modelTask.Status, UserID: modelTask.UserID}

	return domainTask, nil
}

func (r *taskRepository) UpdateTask(task domain.Task) (domain.Task, error) {
	modelTask := model.Task{ID: task.ID, Title: task.Title, Description: task.Description, Status: task.Status, UserID: task.UserID}
	if err := r.db.Updates(&modelTask).Error; err != nil {
		return domain.Task{}, err
	}
	domainTask := domain.Task{ID: modelTask.ID, Title: modelTask.Title, Description: modelTask.Description, Status: modelTask.Status, UserID: modelTask.UserID}

	return domainTask, nil
}

func (r *taskRepository) DeleteTask(taskID int) error {
	var modelTask model.Task
	if err := r.db.Delete(&modelTask, taskID).Error; err != nil {
		return err
	}

	return nil
}
