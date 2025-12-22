package middleware

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/aihouRi/task-manager/backend/internal/auth"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

func JWTAuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authHeader := c.Request().Header.Get("Authorization")
		if authHeader == "" {
			return c.JSON(http.StatusUnauthorized, echo.Map{
				"error": "missing authorization header",
			})
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			return c.JSON(http.StatusUnauthorized, echo.Map{
				"error": "invalid authorization format",
			})
		}

		tokenString := parts[1]

		secret := os.Getenv("JWT_SECRET")
		if secret == "" {
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"error": "jwt secret not configured",
			})
		}

		token, err := jwt.ParseWithClaims(
			tokenString,
			&auth.Claims{},
			func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
				}
				return []byte(secret), nil
			},
		)

		if err != nil || !token.Valid {
			return c.JSON(http.StatusUnauthorized, echo.Map{
				"error": "invalid token",
			})
		}

		claims, ok := token.Claims.(*auth.Claims)
		if !ok {
			return c.JSON(http.StatusUnauthorized, echo.Map{
				"error": "invalid token claims",
			})
		}

		c.Set("userID", claims.UserID)

		return next(c)
	}
}
