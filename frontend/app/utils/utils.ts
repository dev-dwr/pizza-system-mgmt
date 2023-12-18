import { Dough, Ingredient, Pizza, Sauce, Size, Status } from "./types";

export function getDough(value: string): Dough {
  switch (value.toLowerCase()) {
    default:
    case "italian":
      return Dough.ITALIAN;
    case "polish":
      return Dough.POLISH;
    case "american":
      return Dough.AMERICAN;
  }
}
export function getIngredient(value: string): Ingredient {
  switch (value.toLowerCase()) {
    default:
    case "ham":
      return Ingredient.HAM;
    case "tomato":
      return Ingredient.TOMATO;
    case "mushrooms":
      return Ingredient.MUSHROOMS;
    case "bacon":
      return Ingredient.BACON;
    case "SALAMI":
      return Ingredient.SALAMI;
    case "chilli":
    case "chili":
      return Ingredient.CHILI;
    case "meat":
      return Ingredient.MEAT;
    case "pineapple":
      return Ingredient.PINEAPPLE;
  }
}

export function getSize(value: string): Size {
  switch (value.toLowerCase()) {
    case "small":
      return Size.SMALL;
    case "medium":
      return Size.MEDIUM;
    case "large":
      return Size.LARGE;
    default:
    case "mega":
    case "mega_large":
      return Size.MEGA_LARGE;
  }
}

export function getSauce(value: string): Sauce {
  switch (value.toLowerCase()) {
    case "tomato":
      return Sauce.TOMATO;
    case "cheese":
      return Sauce.CHEESE;
    default:
    case "tomato with cheese":
    case "tomato_cheese":
      return Sauce.TOMATO_CHEESE;
    case "paprika":
      return Sauce.PAPRIKA;
  }
}

export function getStatus(value: string): Status {
  switch (value.toLowerCase()) {
    case "init":
      return Status.INIT;
    case "start":
      return Status.START;
    default:
    case "finish":
      return Status.FINISH;
  }
}

export function getDoughs() {
  return Object.values(Dough).filter((key) => isNaN(Number(key)));
}

export function getIngredients() {
  return Object.values(Ingredient).filter((key) => isNaN(Number(key)));
}

export function getSizes() {
  return Object.values(Size).filter((key) => isNaN(Number(key)));
}

export function getSauces() {
  return Object.values(Sauce).filter((key) => isNaN(Number(key)));
}

export function getStatuses() {
  return Object.values(Status).filter((key) => isNaN(Number(key)));
}

export function PizzaToPizzaDto(pizza: Pizza) {
  const size = (
    pizza.size === Size.MEGA_LARGE ? "MEGA_LARGE" : pizza.size
  ).toUpperCase();

  const sauce = (
    pizza.sauce === Sauce.TOMATO_CHEESE ? "TOMATO_CHEESE" : pizza.sauce
  ).toUpperCase();

  return {
    name: pizza.name,
    dough: pizza.dough.toUpperCase(),
    size,
    sauce,
    ingredientsList: pizza.ingredientsList
      .map((ingredient) => ingredient.toUpperCase())
      .sort(),
    currentStatus: pizza.currentStatus,
  };
}

export function PizzaDtoToPizza(pizza: any): Pizza {
  return {
    id: pizza.id,
    name: pizza.name,
    dough: getDough(pizza.dough),
    size: getSize(pizza.size),
    sauce: getSauce(pizza.sauce),
    ingredientsList: (pizza.ingredientsList as any[])
      .map((ingredient) => getIngredient(ingredient))
      .sort(),
    price: pizza.price,
    currentStatus: getStatus(pizza.currentStatus),
  };
}

export function capitalize(word: string) {
  return word[0].toUpperCase() + word.substring(1);
}
