export const fetchMealsByIngredient = async (search) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
  const { meals } = await response.json();
  return meals;
};

export const fetchMealsByName = async (search) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
  const { meals } = await response.json();
  return meals;
};

export const fetchMealsByFirstLetter = async (search) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
  const { meals } = await response.json();
  return meals;
};

// DRINKS FETCHS------------------------------------------------------------

export const fetchDrinksByIngredient = async (search) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
  const { drinks } = await response.json();
  return console.log(drinks);
};

export const fetchDrinksByName = async (search) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
  const { drinks } = await response.json();
  return drinks;
};

export const fetchDrinksByFirstLetter = async (search) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`);
  const { drinks } = await response.json();
  return drinks;
};

// INITIAL FETCHS-----------------------------------------------------------

export const fetchInitialMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await response.json();
  return meals;
};

export const fetchInitialDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await response.json();
  return drinks;
};

// FETCH POR ID ---------------------------

export const fetchMealRecipeById = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { meals } = await response.json();
  return meals;
};

export const fetchDrinkRecipeById = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await response.json();
  return drinks;
};