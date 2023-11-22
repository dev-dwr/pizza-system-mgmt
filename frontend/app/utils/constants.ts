import { Dough, Sauce, Size } from "./types";

export const PLUM = "#552647";
export const GREEN = "#254137";
export const LIGHT_GREY = "#e7dfdf";
export const DARK_GREY = "#d6c7c8";
export const BLACK = "#201c21";
export const WHITE = "#f2efed";
export const DEFAULT_PIZZA = {
  name: "",
  dough: Dough.ITALIAN,
  size: Size.MEGA,
  sauce: Sauce.TOMATO_CHEESE,
  ingredientsList: [],
};
