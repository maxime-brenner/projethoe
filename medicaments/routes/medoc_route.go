package routes

import (
	"medicament-api/controllers"

	"github.com/gin-gonic/gin"
)

func MedocRoute(router *gin.Engine) {
	router.GET("/medoc/", controllers.GetMedoc())
}
