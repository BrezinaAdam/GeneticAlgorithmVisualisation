//'using strict';
// here you can find basic usage of genetic algorithm
// Genetic Import
import CrossOver from "./js/genetic/crossOver";
import GenotypBuilder from "./js/genetic/genotypBuilder";
import Mutation from "./js/genetic/mutation";
import Selection from "./js/genetic/selection";
import InitPopulation from "./js/genetic/initPopulation";

// Neural Import
import Dataset from "./js/neural/dataset";
import NeuralNetwork from "./js/neural/neuralNetwork";

function getHalfPopulation(pop, newPop)
{
  let c0 = pop[0].concat(newPop[0]);
  let c1 = pop[1].concat(newPop[1]);
  let all = [c0, c1];
  //console.log(all.length);

  let reordered = [];
  for (let i = 0; i < all[0].length; i++)
  {
    reordered.push({ p1: all[0][i], p2: all[1][i]})
  }

  reordered.sort(function(a, b) {
    return b.p2 - a.p2;
  });

  all = [[], []];
  for (let i = 0; i < reordered.length / 2; i++)
  {
    all[0].push(reordered[i].p1);
    all[1].push(reordered[i].p2);
  }

  return all;
}

function calculateFitness(neural, numbers, trainSet)
{
  let fitness = [];
  for (let i = 0; i < numbers.length; i++)
  {
    neural.assignPopElement(numbers, i);
    let error = neural.getTotalError(trainSet);
    fitness.push(error == 0 ? 10000000 : 1/error);
  }

  return fitness;
}

// 1. create Dataset for neural network for training
var trainSet = Dataset.generate(0, 2*Math.PI, 0.1);

// 2. create neural NeuralNetwork
var neuralNetwork = new NeuralNetwork([1, 25, 1]);

// 3. create Genotyp form
var genBuilder = new GenotypBuilder(16);

let key = "";
for(let i = 0; i < neuralNetwork.getNumOfWeights() + neuralNetwork.getNumOfBiases() - 1; i++)
{
    key += "-i";
}

var genPrototype = genBuilder.getGenotyp(key);

// 4. Init new Population
var type = "INTEGER";
var size = 100; // size of Pop, must be even number
var popGenerator = new InitPopulation(genPrototype, type);
var population = [popGenerator.getPopulation(size), []];

console.log("new population");

// 5. setWeights to NeuralNetwork

let newNumbs1 = genBuilder.getAllElements(key, population[0]);

for (let i = 0; i < newNumbs1.length; i++)
{
  neuralNetwork.assignPopElement(newNumbs1, i);
  console.log(neuralNetwork.getTotalError(trainSet));
}
console.log("--");

/*neuralNetwork.setWeights([10,1]);
neuralNetwork.setBiases([0,-4,0]);

for (let i = 0; i < trainSet[0].length; i++)
{
  neuralNetwork.setInput(trainSet[0][i]);
  console.log(neuralNetwork.feedForward());
}*/


// main
let newPop = [[], []];
for (let i = 0; i < 500; i++)
{
  console.log((i/5).toString() + "%");

  let selection = new Selection();
  var numbers = genBuilder.getAllElements(key, population[0]);

  if(i % 20 == 0)
  {
    let newHalf = popGenerator.getPopulation(size / 5);
    //let newNumbers = genBuilder.getAllElements(key, newHalf[0]);
    //population[1] = calculateFitness(neuralNetwork, numbers, trainSet);
    //newHalf[1] = calculateFitness(neuralNetwork, newNumbers, trainSet);
    //population = getHalfPopulation(population, newHalf);
    for (let j = 0; j < size / 5; j++)
    {
      population[0][Math.round(Math.random() * (size - 1))] = newHalf[j];
    }
  }

  numbers = genBuilder.getAllElements(key, population[0]);
  population[1] = calculateFitness(neuralNetwork, numbers, trainSet);

  newPop = [[], []];
  for (let j = 0; j < population[0].length / 2; j++)
  {
    let parents = selection.getSelectedParrents(population[0], population[1]);
    newPop[0].push(parents[0]);
    newPop[0].push(parents[1]);
  }

  //krizenie
  let crossOver = new CrossOver();
  newPop[0] = crossOver.getNewGeneration(newPop[0]);

  //mutacia
  let mutator = new Mutation(50, 20);
  newPop[0] = mutator.getMutatedPopulation(newPop[0], type);

  let newNumbs = genBuilder.getAllElements(key, newPop[0]);
  newPop[1] = calculateFitness(neuralNetwork, newNumbs, trainSet);

  population[0] = getHalfPopulation(population, newPop)[0];
}

let newNumbs = genBuilder.getAllElements(key, population[0]);

for (let i = 0; i < newNumbs.length; i++)
{
  neuralNetwork.assignPopElement(newNumbs, i);
  console.log(neuralNetwork.getTotalError(trainSet));
}

console.log("--");

for (let i = 0; i < trainSet[0].length; i++)
{
  neuralNetwork.setInput(trainSet[0][i]);
  console.log(neuralNetwork.feedForward());
}

//console.log("--");
//console.log(neuralNetwork.getWeights());
