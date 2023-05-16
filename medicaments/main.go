package main

import (
	"medicament-api/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())
	routes.MedocRoute(router)

	router.Run("localhost:3004")
}
