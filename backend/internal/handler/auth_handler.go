package handler

import (
	"net/http"

	"github.com/aihouRi/task-manager/backend/internal/usecase"
	"github.com/labstack/echo/v4"
)

type AuthHandler struct {
	authUsecase usecase.AuthUsecase
}

func NewAuthHandler(u usecase.AuthUsecase) *AuthHandler {
	return &AuthHandler{authUsecase: u}
}

func (h *AuthHandler) Register(c echo.Context) error {
	var req RegisterRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": "invalid request",
		})
	}

	if req.Email == "" || req.Password == "" {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": "email and password are required",
		})
	}

	user, err := h.authUsecase.Register(req.Name, req.Email, req.Password)
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": "registration failed",
		})
	}

	return c.JSON(http.StatusCreated, echo.Map{
		"id":    user.ID,
		"name":  user.Name,
		"email": user.Email,
	})
}

func (h *AuthHandler) Login(c echo.Context) error {
	var req LoginRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "invalid request"})
	}

	result, err := h.authUsecase.Login(req.Email, req.Password)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{
			"error": "login failed",
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"token": result.Token,
		"user": echo.Map{
			"name":  result.Name,
			"email": result.Email,
		},
	})
}
