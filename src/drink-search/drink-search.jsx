import * as React from "react";
import drinkSearchApi from "../apis/drink-search.api";

const DrinkSearch = () => {
  const [drinks, setDrinks] = React.useState([]);
  const [drinkQuery, setDrinkQuery] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleDrinkQuery = async (e) => {
    e.preventDefault();
    if (drinkQuery) {
      try {
        const data = await drinkSearchApi(drinkQuery);
        console.log("data", data);
        setDrinks(data.drinks);
      } catch (error) {
        setError(error);
      }
    }

    setDrinkQuery("");
  };

  const renderDrinkResults = () => {
    const ingredientList = (drink) => {
      const ingredients = [];
      const maxIngredients = 15;
      for (let i = 1; i <= maxIngredients; i++) {
        const ingredient = drink["strIngredient" + i];
        if (ingredient) {
          ingredients.push(ingredient);
        }
      }
      return ingredients;
    };

    return drinks?.map((drink) => {
      return (
        <div
          key={drink.idDrink}
          className="card m-2"
          style={{ width: "20rem" }}
        >
          <img
            src={drink.strDrinkThumb}
            className="card-img-top"
            alt={drink.strDrink}
          />
          <div className="card-body">
            <h5 className="card-title text-center">{drink.strDrink}</h5>
            <h6 className="text-center font-weight-bold">Ingredients</h6>
            <div className="d-flex flex-wrap justify-content-center border-top">
              {ingredientList(drink).map((ingredient, index) => (
                <div className="p-1" key={ingredient + index}>
                  {ingredient}
                </div>
              ))}
            </div>
            <h6 className="text-center font-weight-bold">Instructions</h6>
            <p className="card-text border-top">{drink.strInstructions}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container p-5">
      <h5>Form</h5>
      <form className="form-group pb-4" onSubmit={handleDrinkQuery}>
        <input
          className="form-control border-dark w-50"
          placeholder="search for a drink..."
          type="search"
          value={drinkQuery}
          onChange={(event) => setDrinkQuery(event.target.value)}
        />
        <button className="btn btn-primary mt-2 btn-block" type="submit">
          Search
        </button>
      </form>

      <h5>List of drinks</h5>
      {drinks.length > 0 && (
        <div className="d-flex flex-wrap">{renderDrinkResults()}</div>
      )}
      {!drinks && <h5 className="text-center mt-5">🍹 No drinks found 🍹</h5>}
      {error && <h5 className="text-center mt-5">🛑 Service unavailable 🛑</h5>}
    </div>
  );
};

export default DrinkSearch;
