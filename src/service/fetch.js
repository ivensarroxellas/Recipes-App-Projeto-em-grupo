export const fetchMealsByIngredient = async (search) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
  const { meals } = await response.json();
  return meals;
};

export const fetchMealsByName = async (search) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
  const { meals } = await response.json();

  if (meals === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await result.json();
    return data.meals;
  }

  return meals;
};

// fetchMealsByName('Arrabiata');

export const fetchMealsByFirstLetter = async (search) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
  const { meals } = await response.json();
  return meals;
};

// DRINKS FETCHS------------------------------------------------------------

export const fetchDrinksByIngredient = async (search) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
  const { drinks } = await response.json();

  return drinks;
};

export const fetchDrinksByName = async (search) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
  const { drinks } = await response.json();

  if (drinks === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await result.json();
    return data.drinks;
  }
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

// FILTER BUTTON FETCHS-----------------------------------------------------------

export const fetchButtonMealsCategory = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const { meals } = await response.json();
  return meals;
};

export const fetchButtonDrinksCategory = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
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

// FETCH DETAILS POR ID ------------------

export const fetchDrinkDetails = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await response.json();
  return (drinks[0]);
};

// FETCH POR CATEGORY ---------------------

export const fetchMealsCategory = async (category) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const { meals } = await response.json();

  if (meals === null) {
    return [];
  } return meals;
};

// https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef

export const fetchDrinksCategory = async (category) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const { drinks } = await response.json();

  if (drinks === null) {
    return [];
  } return drinks;
};

// FETCH BUTTONS CATECORY---------------------

// export const fetchButtonMealsCategory = async () => {
//   const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
//   const { meals } = await response.json();
//   return meals;
// };

// export const fetchButtonDrinksCategory = async () => {
//   const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
//   const { drinks } = await response.json();
//   return drinks;
// };
