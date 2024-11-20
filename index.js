

const {data} = require ("./data");
const Ingredients = require ("./ingredients");
const Cauldron = require ("./cauldron");

//Creamos los ingredientes
const ingredients = Ingredients.load(data);

console.log(ingredients);

//Creamos el calderon de pociones
const cauldron = new Cauldron(ingredients);

// //Creamos pociones
const potion1 = cauldron.createPotion("Bear Claws", "Blue Mountain Flower");
showPotion(potion1);

const potion2 = cauldron.createPotion("Chicken's Egg", "Chaurus Eggs");
showPotion(potion2);

const potion3 = cauldron.createPotion("Chaurus Eggs", "Bleeding Crown");
showPotion(potion3);

function showPotion(potion) {
  console.log(`${potion.name}`);
  console.log(`Value:         ${potion.value}`);
  console.log(`Weight:        ${potion.weight}`);
  console.log(`Time:          ${potion.time}`);
  console.log(`------------------------------`);
}






