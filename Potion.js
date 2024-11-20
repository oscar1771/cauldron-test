class Potion {
  constructor(name, value, weight, time) {
    this.name = name;
    this.value = value;
    this.weight = weight;
    this.time = time;
  }

  static with(effect, weight, value) {
    const type = effect.type === 'beneficial' ? "Potion" : "Poison";
    const potion_name = `${type} of ${effect.name}`;
    const time = 10;
    return new Potion(potion_name, value, weight, time);
  }

  static failed() {
    return new FailedPotion();
  }

  static sanity() {
    return new PotionOfSanity();
  }
}

class FailedPotion extends Potion {
  constructor() {
    super("Failed potion", 0, 10, 10);
  }
}

class PotionOfSanity extends Potion {
  constructor() {
    super("Potion of Sanity", 100, 10, 10);
  }
}

module.exports = Potion;
