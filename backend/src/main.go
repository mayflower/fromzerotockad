package main

import (
	"github.com/b4rsch/tyvamcbe/search"
	"net/http"

	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/search/:term", func(c *gin.Context) {
		term := c.Param("term")
		resp := search.SearchHandler(term)
		c.JSON(http.StatusOK, resp)
	})
	router.Run(":8089")
}
