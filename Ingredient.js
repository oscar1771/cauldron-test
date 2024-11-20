//import Effect from './effect.mjs';
const Effect = require('./effect');

module.exports = class Ingredient {
  constructor(name, effects, value, weight) {
    this.name = name;
    this.effects = effects;
    this.value = value;
    this.weight = weight;
  }

  static from({name, effects, value, weight}) {
    return new Ingredient(
      name,
      effects.map(effect => Effect.from(effect)),
      value,
      weight
    );
  }

  hasName(name) {
    return this.name === name;
  }

  hasEffect(effect) {
    return this.effects.some(candidate => effect.name === candidate.name);
  }

  findCommonEffects(otherIngredient) {
    return this.effects.filter(effect => otherIngredient.hasEffect(effect));
  }
}

