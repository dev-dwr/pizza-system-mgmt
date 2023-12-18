export enum Role {
  USER = "USER",
  EMPLOYEE = "EMPLOYEE",
}

export type User = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  userRole: Role;
  token: string;
};

export enum Dough {
  ITALIAN = "italian",
  POLISH = "polish",
  AMERICAN = "american",
}

export enum Size {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  MEGA_LARGE = "mega",
}

export enum Sauce {
  TOMATO = "tomato",
  CHEESE = "cheese",
  TOMATO_CHEESE = "tomato and cheese",
  PAPRIKA = "paprika",
}

export enum Ingredient {
  HAM = "ham",
  BACON = "bacon",
  SALAMI = "salami",
  MUSHROOMS = "mushrooms",
  TOMATO = "tomato",
  PINEAPPLE = "pineapple",
  CHILI = "chili",
  MEAT = "meat",
}

export enum Status {
  INIT = "INIT",
  START = "START",
  FINISH = "FINISH",
}

export type Pizza = {
  id?: number;
  name: string;
  dough: Dough;
  size: Size;
  sauce: Sauce;
  ingredientsList: Ingredient[];
  price?: number;
  currentStatus?: Status;
};
