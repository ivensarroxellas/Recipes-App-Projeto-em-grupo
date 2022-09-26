export const fetchMealsByIngredient = async (search) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
  const { meals } = await response.json();
  return (meals);
};

export const fetchMealsByName = async (search) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
  const { meals } = await response.json();
  return meals;
};

export const fetchMealsByFirstLetter = async (search) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
  const { meals } = await response.json();
  return console.log(meals);
};

export const fetchDrinksByIngredient = async (search) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
  const { drinks } = await response.json();
  return console.log(drinks);
};
