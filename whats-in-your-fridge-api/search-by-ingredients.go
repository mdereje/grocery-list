package main

//Search by ingredients - this is the same api as
//https://rapidapi.com/spoonacular/api/recipe-food-nutrition?endpoint=55e1b3e1e4b0b74f06703be6
import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {

	url := "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=apples%252Cflour%252Csugar"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("x-rapidapi-host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
	req.Header.Add("x-rapidapi-key", "t5Ag8seF8BmshqBOAWdA7gQI1JWEp1gGYKLjsnXnFRjqle1ZeZ")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
