import { Dough, Ingredient, Pizza, Sauce, Size, Status } from "./types";

export function getDough(value: string): Dough {
  switch (value) {
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
  switch (value) {
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
      return Ingredient.CHILLI;
    case "meat":
      return Ingredient.MEAT;
    case "pineapple":
      return Ingredient.PINEAPPLE;
  }
}

export function getSize(value: string): Size {
  switch (value) {
    case "small":
      return Size.SMALL;
    case "medium":
      return Size.MEDIUM;
    case "large":
      return Size.LARGE;
    default:
    case "mega":
      return Size.MEGA;
  }
}

export function getSauce(value: string): Sauce {
  switch (value) {
    case "tomato":
      return Sauce.TOMATO;
    case "cheese":
      return Sauce.CHEESE;
    default:
    case "tomato with cheese":
      return Sauce.TOMATO_CHEESE;
    case "paprika":
      return Sauce.PAPRIKA;
  }
}

export function getStatus(value: string): Status {
  switch (value) {
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

export function convertToPizzaDao(pizza: Pizza) {
  const size = (
    pizza.size === Size.MEGA ? "MEGA_LARGE" : pizza.size
  ).toUpperCase();

  const sauce = (
    pizza.sauce === Sauce.TOMATO_CHEESE ? "TOMATO_CHEESE" : pizza.sauce
  ).toUpperCase();

  return {
    name: pizza.name,
    dough: pizza.dough.toUpperCase(),
    size,
    sauce,
    ingredientsList: pizza.ingredientsList.map((ingredient) =>
      ingredient.toUpperCase()
    ),
  };
}
