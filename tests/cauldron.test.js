const { data } = require("../data");
const Ingredients = require("../ingredients");
const Cauldron = require("../cauldron");
const { log } = require("console");



describe("function for creating potions", () => {

    describe("when ingredients have 1 effect or more in common", () => {

        describe("when ingredients are 'Nightshade' and 'Ectoplasm' ", () => {
            it("creates the 'Potion of Sanity' ", () => {

                const ingredients = Ingredients.load(data);
                const cauldron = new Cauldron(ingredients);
                const ingredientsFiltered = ingredients.ingredients.filter(ingredient => ingredient.effects.some(effect => effect.name.includes("Restore Health")));

                const potionOfSanity = cauldron.createPotion('Nightshade', 'Ectoplasm');


                expect(potionOfSanity).toMatchObject(
                    {
                        name: "Potion of Sanity",
                        value: 100,
                        weight: 10,
                        time: 10
                    }

                )

            });
        });

        describe("when ingredients are not 'Nightshade' or 'Ectoplasm' ", () => {

            it(`The resulting weight is the sum of both weights`, () => {

                const ingredients = Ingredients.load(data);
                const cauldron = new Cauldron(ingredients);

                const ingredient1 = ingredients.ingredients.find(ingredient => ingredient.name === "Blisterwort");
                const ingredient2 = ingredients.ingredients.find(ingredient => ingredient.name === "Blue Mountain Flower");

                const potion = cauldron.createPotion(ingredient1.name, ingredient2.name);
                expect(potion.weight).toBe(ingredient1.weight + ingredient2.weight);



            })

            it(`The resulting value is the sum of both values`, () => {

                const ingredients = Ingredients.load(data);
                const cauldron = new Cauldron(ingredients);

                const ingredient1 = ingredients.ingredients.find(ingredient => ingredient.name === "Blisterwort");
                const ingredient2 = ingredients.ingredients.find(ingredient => ingredient.name === "Blue Mountain Flower");

                const potion = cauldron.createPotion(ingredient1.name, ingredient2.name);
                expect(potion.value).toBe(ingredient1.value + ingredient2.value);



            });

            it(`The resulting time is always 10`, () => {

                const ingredients = Ingredients.load(data);
                const cauldron = new Cauldron(ingredients);

                const ingredient1 = ingredients.ingredients.find(ingredient => ingredient.name === "Blisterwort");
                const ingredient2 = ingredients.ingredients.find(ingredient => ingredient.name === "Blue Mountain Flower");

                const potion = cauldron.createPotion(ingredient1.name, ingredient2.name);
                expect(potion.time).toBe(10);



            })

            const positiveTokens = ["Fortify", "Resist", "Cure", "Restore", "Regenerate", "Invisibility", "Waterbreathing"];
            for (let i = 0; i < positiveTokens.length; ++i)
            {
                const token = positiveTokens[i];
                describe(`when ingredients have '${token}'  effect type in common`, () => {
                    it(`creates a beneficial 'Potion' `, () => {
    
                        const ingredients = Ingredients.load(data);
                        const cauldron = new Cauldron(ingredients);
                        const ingredientsFiltered = ingredients.ingredients.filter(ingredient =>
                            ingredient.name !== "Nightshade" &&
                            ingredient.name !== "Ectoplasm" &&
                            ingredient.effects.some(effect => effect.name.includes(token)));
    
                        const ingredient1 = ingredientsFiltered[0];
    
                        //Filtramos los que tengan el efecto igual al del primer ingrediente con el nombre del token
                        const ingredient2Posibilities = ingredientsFiltered.filter(ingredient => 
                            ingredient != ingredient1 &&
                            ingredient.effects.filter(effect => ingredient1.effects.some(effect1 => effect1.name === effect.name && 
                                                                                                    effect.name.includes(token))).length !== 0);
    
                        const ingredient2 = ingredient2Posibilities[0];
    
                        const restoreStaminaPotion = cauldron.createPotion(ingredient1.name, ingredient2.name);
    
                        //
                        //expect(restoreStaminaPotion).toBe(5);
                        expect(restoreStaminaPotion.name.includes(`Potion of`)).toBeTruthy();
                        expect(restoreStaminaPotion.name.includes("Sanity")).not.toBeTruthy();
    
                    });
    
                });


            }


            const negativeTokens = ["Damage", "Fear", "Ravage", "Paralysis", "Weakness", "Lingering", "Slow", "Frenzy"];
            for (let i = 0; i < negativeTokens.length; ++i)
            {
                const token = negativeTokens[i];
                describe(`when ingredients have '${token}'  effect type in common`, () => {
                    it(`creates a harmful 'Poison' `, () => {
    
                        const ingredients = Ingredients.load(data);
                        const cauldron = new Cauldron(ingredients);
                        const ingredientsFiltered = ingredients.ingredients.filter(ingredient =>
                            ingredient.name !== "Nightshade" &&
                            ingredient.name !== "Ectoplasm" &&
                            ingredient.effects.some(effect => effect.name.includes(token)));
    
                        const ingredient1 = ingredientsFiltered[0];
    
                        //Filtramos los que tengan el efecto igual al del primer ingrediente con el nombre del token
                        const ingredient2Posibilities = ingredientsFiltered.filter(ingredient => 
                            ingredient != ingredient1 &&
                            ingredient.effects.filter(effect => ingredient1.effects.some(effect1 => effect1.name === effect.name && 
                                                                                                    effect.name.includes(token))).length !== 0);
    
                        const ingredient2 = ingredient2Posibilities[0];
    
                        const restoreStaminaPotion = cauldron.createPotion(ingredient1.name, ingredient2.name);
    
                        //
                        //expect(restoreStaminaPotion).toBe(5);
                        expect(restoreStaminaPotion.name.includes(`Poison of`)).toBeTruthy();
    
                    });
    
                });


            }
            

           

        })

    });

    describe("when ingredients have no effect in common", () => {
        it("creates a 'Failed Potion' ", () => {

            const ingredients = Ingredients.load(data);
            const cauldron = new Cauldron(ingredients);

            const ingredient1 = ingredients.ingredients[0];
            const ingredientsFiltered = ingredients.ingredients.filter(ingredient => 
                ingredient != ingredient1 &&
                ingredient.effects.filter(effect => ingredient1.effects.some(effect1 => effect1.name === effect.name)).length === 0
            );

            const ingredient2 = ingredientsFiltered[0];

            const failedPotion = cauldron.createPotion(ingredient1.name, ingredient2.name);


            expect(failedPotion).toMatchObject(
                {
                    name: "Failed potion",
                    value: 0,
                    weight: 10,
                    time: 10
                }

            )

        });
    });

});


