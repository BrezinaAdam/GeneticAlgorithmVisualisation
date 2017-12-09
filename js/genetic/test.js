// here you can find basic usage of genetic algorithm



var crossOver = new CrossOver();
var genBuilder = new GenotypBuilder();
var mutator = new Mutation(20,55);
var selector = new Selection();

// first create genotyp with key
var key = "-i-i-i-i";   // 4 signed integers (-i)
var type = "BINARY";
var size = 16; // must be even number

// create template genotyp with key for creating population
var genPrototype = genBuilder.getGenotyp(key); // [a,b,c,d]

// create population generator with prototype genotype
var popGenerator = new InitPopulation(genPrototype, type);

// create population with specific size
var population = popGenerator.getPopulation(size)

console.log("first population");
for(var i = 0; i < size; i++)
{
  console.log(genBuilder.getElements(key, population[i]));
}

//create new generation
var newPopulation = crossOver.getNewGeneration(population);

// now mutate new getPopulation
newPopulation = mutator.getMutatedPopulation(newPopulation, type);

console.log("new population");
for(var i = 0; i < size; i++)
{
  console.log(genBuilder.getElements(key, newPopulation[i]));
}
