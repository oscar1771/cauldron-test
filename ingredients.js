//import Ingredient from "./Ingredient.js";
//import Effect from "./effect.mjs";
const Ingredient = require('./Ingredient');

// function load(data) {
//   const ingredients = {};

//   data.ingredients.forEach(({name, effects, value, weight}) => {
//     ingredients[name] = new Ingredient(
//       name,
//       effects.map(effect => Effect.from(effect)),
//       value,
//       weight
//     );
//   });

//   return ingredients;
// }

// module.exports = {load};

module.exports = class Ingredients {
  constructor(ingredients){
      this.ingredients = ingredients;
  }

  static load(data) {
      return new Ingredients(data.ingredients.map(Ingredient.from))
  }

  find(name)
  {
      const ingredient = this.ingredients.find(element => element.hasName(name));
      if(ingredient === undefined)
      {
          throw new Error (`Uknknown ingredient ${name}`);
      }

      return ingredient;
  }
}
