package main

import (
	"log"
	"net/http"
	"os"

	"github.com/aihouRi/task-manager/backend/internal/handler"
	"github.com/aihouRi/task-manager/backend/internal/infrastructure/db"
	jwtMiddleware "github.com/aihouRi/task-manager/backend/internal/middleware"
	"github.com/aihouRi/task-manager/backend/internal/repository"
	"github.com/aihouRi/task-manager/backend/internal/router"
	"github.com/aihouRi/task-manager/backend/internal/usecase"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.RequestLogger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodDelete,
			http.MethodOptions,
		},
		AllowHeaders: []string{
			echo.HeaderOrigin,
			echo.HeaderContentType,
			echo.HeaderAccept,
			echo.HeaderAuthorization,
		},
	}))

	dbConn, err := db.NewDB()
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	authRepo := repository.NewAuthRepository(dbConn)
	taskRepo := repository.NewTaskRepository(dbConn)

	authUsecase := usecase.NewAuthUsecase(authRepo)
	taskUsecase := usecase.NewTaskUsecase(taskRepo)

	authHandler := handler.NewAuthHandler(authUsecase)
	taskHandler := handler.NewTaskHandler(taskUsecase)

	router.RegisterRoutes(e, router.Handlers{
		Auth: authHandler,
		Task: taskHandler,
	})

	taskGroup := e.Group("/tasks", jwtMiddleware.JWTAuthMiddleware)
	taskGroup.POST("", taskHandler.Create)
	taskGroup.GET("", taskHandler.GetTasks)
	taskGroup.GET("/:taskID", taskHandler.GetTaskByID)
	taskGroup.PUT("/:taskID", taskHandler.Update)
	taskGroup.DELETE("/:taskID", taskHandler.Delete)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("server running at :%s", port)

	if err := e.Start(":" + port); err != nil {
		log.Fatal(err)
	}
}
