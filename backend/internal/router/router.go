package router

import (
	"github.com/aihouRi/task-manager/backend/internal/handler"
	"github.com/labstack/echo/v4"
)

type Handlers struct {
	Auth *handler.AuthHandler
	Task *handler.TaskHandler
}

func RegisterRoutes(e *echo.Echo, h Handlers) {
	RegisterAuthRoutes(e, h.Auth)
	RegisterTaskRoutes(e, h.Task)
}
