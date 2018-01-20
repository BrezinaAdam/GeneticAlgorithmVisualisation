'using strict';
// here you can find basic usage of genetic algorithm
// Genetic Import
//import CrossOver from "./js/genetic/crossOver";
//import GenotypBuilder from "./js/genetic/genotypBuilder";
//import Mutation from "./js/genetic/mutation";
//import Selection from "./js/genetic/selection";
//import InitPopulation from "./js/genetic/initPopulation";

// Neural Import
//import Dataset from "./js/neural/dataset";
//import NeuralNetwork from "./js/neural/neuralNetwork";

class GeneticAlgoritm {
  constructor(netSize=40, popSize=500, mutProb=10, replProb=70)
  {
    this.trainSet = Dataset.generate(0, 2*Math.PI, 0.1);
    this.neuralNetwork = new NeuralNetwork([1, netSize, 1]);
    this.genBuilder = new GenotypBuilder(32,32);

    this.key = "";
    for(let i = 0; i < this.neuralNetwork.getNumOfWeights() + this.neuralNetwork.getNumOfBiases() - 1; i++)
    {
        this.key += "-i";
    }

    this.genPrototype = this.genBuilder.getGenotyp(this.key);

    this.type = "INTEGER";
    this.size = popSize; // size of Pop, must be even number
    this.popGenerator = new InitPopulation(this.genPrototype, this.type);
    this.population = [this.popGenerator.getPopulation(this.size), []];

    this.stepCnt = 0;
  }

  step()
  {
    let newPop = [[], []];
    this.stepCnt++;

    let selection = new Selection();
    var numbers = this.genBuilder.getAllElements(this.key, this.population[0]);

    if(this.stepCnt % 10 == 0)
    {
      let newHalf = this.popGenerator.getPopulation(this.size / 5 * 2);
      for (let j = 0; j < this.size / 5 * 2; j++)
      {
        this.population[0][Math.round(Math.random() * (this.size - 1))] = newHalf[j];
      }
    }

    numbers = this.genBuilder.getAllElements(this.key, this.population[0]);
    this.population[1] = GeneticAlgoritm.calculateFitness(this.neuralNetwork, numbers, this.trainSet);

    for (let j = 0; j < this.population[0].length / 2; j++)
    {
      let parents = selection.getSelectedParrents(this.population[0], this.population[1]);
      newPop[0].push(parents[0]);
      newPop[0].push(parents[1]);
    }

    //krizenie
    let crossOver = new CrossOver();
    newPop[0] = crossOver.getNewGeneration(newPop[0]);

    //mutacia
    let mutator = new Mutation(50, 20);
    newPop[0] = mutator.getMutatedPopulation(newPop[0], this.type);

    let newNumbs = this.genBuilder.getAllElements(this.key, newPop[0]);
    newPop[1] = GeneticAlgoritm.calculateFitness(this.neuralNetwork, newNumbs, this.trainSet);

    this.population[0] = GeneticAlgoritm.getHalfPopulation(this.population, newPop)[0];
  }

  getFitness()
  {
    return this.population[1];
  }

  getWeights()
  {
    return this.neuralNetwork.getWeights();
  }

  getBiases()
  {
    return this.neuralNetwork.getBiases();
  }

  getTotalError()
  {
    return this.neuralNetwork.getTotalError(this.trainSet);
  }

  getOutput()
  {
    let result = [[], [], []];

    let idx = 0;
    for (let i = 1; i < this.population[1].length; i++)
    {
      if (this.population[1][i] > this.population[1][idx])
      {
        idx = i;
      }
    }

    let numbs = this.genBuilder.getAllElements(this.key, this.population[0]);
    this.neuralNetwork.assignPopElement(numbs, idx);

    for (let i = 0; i < this.trainSet[0].length; i++)
    {
      this.neuralNetwork.setInput(this.trainSet[0][i]);
      result[0].push(this.trainSet[0][i]);
      result[1].push(this.trainSet[1][i]);
      result[2].push(this.neuralNetwork.feedForward());
    }

    return result;
  }

  static getHalfPopulation(pop, newPop)
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

  static calculateFitness(neural, numbers, trainSet)
  {
    let fitness = [];
    for (let i = 0; i < numbers.length; i++)
    {
      neural.assignPopElement(numbers, i);
      let error = neural.getTotalError(trainSet);
      fitness.push(error == 0 ? 10000000 : Math.sqrt(Math.sqrt(1/error)));
    }

    return fitness;
  }

}

//module.exports = GeneticAlgoritm;
