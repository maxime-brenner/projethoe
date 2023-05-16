package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/tidwall/gjson"
)

type Substance struct {
	Cis             string `json:"cis"`
	FormeGalenique  string `json:"formeGalenique"`
	CodeSubstance   string `json:"codeSubstance"`
	Name            string `json:"name"`
	DoseUnitaire    string `json:"doseUnitaire"`
	ReferenceDosage string `json:"referenceDosage"`
}

func QueryMedoc(word string) []Substance {

	jsonFile, err := os.Open("controllers/CIS_COMPO_bdpm.json")
	byteValue, _ := ioutil.ReadAll(jsonFile)
	toByte := []byte(byteValue)
	if err != nil {
		fmt.Println(err)
	}
	word = strings.ToUpper(word)
	query := "#(name%\"*" + word + "*\")#"
	value := gjson.GetBytes(toByte, query)

	var datas []Substance
	json.Unmarshal([]byte(value.String()), &datas)
	return datas
}

func GetMedoc() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		req := c.Query("name")
		value := QueryMedoc(req)
		c.JSON(http.StatusOK, gin.H{"Message": value})
	}
}
