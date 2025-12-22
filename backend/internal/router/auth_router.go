package router

import (
	"github.com/aihouRi/task-manager/backend/internal/handler"
	"github.com/labstack/echo/v4"
)

func RegisterAuthRoutes(e *echo.Echo, h *handler.AuthHandler) {
	e.POST("/auth/register", h.Register)
	e.POST("/auth/login", h.Login)
}
