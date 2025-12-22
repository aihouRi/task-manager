package handler

import (
	"net/http"
	"strconv"

	"github.com/aihouRi/task-manager/backend/internal/usecase"
	"github.com/labstack/echo/v4"
)

type TaskHandler struct {
	taskUsecase usecase.TaskUsecase
}

func NewTaskHandler(u usecase.TaskUsecase) *TaskHandler {
	return &TaskHandler{taskUsecase: u}
}

func (h *TaskHandler) Create(c echo.Context) error {
	userIDAny := c.Get("userID")
	if userIDAny == nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{
			"error": "unauthorized",
		})
	}

	userID, ok := userIDAny.(int)
	if !ok {
		return c.JSON(http.StatusUnauthorized, echo.Map{
			"error": "invalid user",
		})
	}

	var req CreateTaskRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": "invalid request",
		})
	}

	task, err := h.taskUsecase.CreateTask(userID, req.Title, req.Description)
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(http.StatusCreated, echo.Map{
		"id":          task.ID,
		"title":       task.Title,
		"description": task.Description,
		"status":      task.Status,
	})
}

func (h *TaskHandler) GetTasks(c echo.Context) error {
	userIDAny := c.Get("userID")
	if userIDAny == nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{
			"error": "unauthorized",
		})
	}

	userID, ok := userIDAny.(int)
	if !ok {
		return c.JSON(http.StatusUnauthorized, echo.Map{
			"error": "invalid user",
		})
	}

	tasks, err := h.taskUsecase.GetTasks(userID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, tasks)
}

func (h *TaskHandler) GetTaskByID(c echo.Context) error {
	userIDAny := c.Get("userID")
	if userIDAny == nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{
			"error": "unauthorized",
		})
	}

	userID, ok := userIDAny.(int)
	if !ok {
		return c.JSON(http.StatusUnauthorized, echo.Map{
			"error": "invalid user",
		})
	}

	taskIDStr := c.Param("taskID")
	taskID, err := strconv.Atoi(taskIDStr)
	if err != nil {
		return err
	}

	task, err := h.taskUsecase.GetTaskByID(userID, taskID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, task)
}
func (h *TaskHandler) Update(c echo.Context) error {
	userIDAny := c.Get("userID")
	if userIDAny == nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{
			"error": "unauthorized",
		})
	}

	userID, ok := userIDAny.(int)
	if !ok {
		return c.JSON(http.StatusUnauthorized, echo.Map{
			"error": "invalid user",
		})
	}

	var req UpdateTaskRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": "invalid request",
		})
	}

	taskIDStr := c.Param("taskID")
	taskID, err := strconv.Atoi(taskIDStr)
	if err != nil {
		return err
	}

	task, err := h.taskUsecase.UpdateTask(userID, taskID, req.Title, req.Description, req.Status)

	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, task)
}
func (h *TaskHandler) Delete(c echo.Context) error {
	userIDAny := c.Get("userID")
	if userIDAny == nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{
			"error": "unauthorized",
		})
	}

	userID, ok := userIDAny.(int)
	if !ok {
		return c.JSON(http.StatusUnauthorized, echo.Map{
			"error": "invalid user",
		})
	}

	taskIDStr := c.Param("taskID")
	taskID, err := strconv.Atoi(taskIDStr)
	if err != nil {
		return err
	}

	err = h.taskUsecase.DeleteTask(userID, taskID)
	if err != nil {
		return err
	}

	return c.NoContent(http.StatusNoContent)
}
