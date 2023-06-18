import { rest, setupWorker } from "msw";

const drinks = [
  {
    isMSW: true,
    idDrink: "11457",
    strDrink: "Gin Fizz",
    strInstructions:
      "Shake all ingredients with ice cubes, except soda water. Pour into glass. Top with soda water.",
    strDrinkThumb:
      "https://www.thecocktaildb.com/images/media/drink/drtihp1606768397.jpg",
    strIngredient1: "Gin",
    strIngredient2: "Lemon",
    strIngredient3: "Powdered sugar",
    strIngredient4: "Carbonated water",
  },
];

export const worker = setupWorker(
  rest.get(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php",

    (req, res, ctx) => {
      return res(
        ctx.status(200),

        ctx.json({
          drinks,
        })
      );
    }
  )
);
