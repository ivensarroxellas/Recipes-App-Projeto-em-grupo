const routValidator = async (path, meals, drinks, history) => {
  if (await meals.length === 1 && path === '/meals') {
    return history.push(`/meals/${meals[0].idMeal}`);
  } if (await drinks.length === 1 && path === '/drinks') {
    return history.push(`/drinks/${drinks[0].idDrink}`);
  }
};

export default routValidator;
