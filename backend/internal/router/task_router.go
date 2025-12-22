package router

import (
	"github.com/aihouRi/task-manager/backend/internal/handler"
	"github.com/labstack/echo/v4"
)

func RegisterTaskRoutes(e *echo.Echo, h *handler.TaskHandler) {
	e.POST("/tasks", h.Create)
	e.GET("/tasks", h.GetTasks)
	e.GET("/tasks/:taskID", h.GetTaskByID)
	e.PUT("/tasks/:taskID", h.Update)
	e.DELETE("/tasks/:taskID", h.Delete)
}
