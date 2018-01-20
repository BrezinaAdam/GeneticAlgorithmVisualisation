import InitPopulation from './js/genetic/initPopulation'
import CrossOver from './js/genetic/crossOver'
import Mutation from './js/genetic/mutation'
import Selection from './js/genetic/selection'
import GenotypBuilder from './js/genetic/genotypBuilder'

class GeneticAlgoritm {
  constructor(neuralNetork, key, popSize=50, type = "BINARY", mutProb=20, replProb=55) {
    this.key = key;
    this.popSize = popSize;
    this.type = type;
    this.mutProb = mutProb;
    this.replProb = replProb;
    this.NeNe = neuralNetork;
  }

  initPop(){
    let genBuilder = new GenotypBuilder();

    // create template genotyp with key for creating population
    this.genPrototype = genBuilder.getGenotyp(this.key); // [a,b,c,d]

    // create population generator with prototype genotype
    let popGenerator = new InitPopulation(this.genPrototype, this.type);

    // create population with specific size
    this.population = popGenerator.getPopulation(this.popSize);
  }

  getPopulation(){
    return this.population;
  }

  getNewPopulation(){
    return this.newPopulation;
  }

  setParams(mut, repl){
    this.mutProb = mut;
    this.replProb = repl;
  }

  calculateFitness(pop){
    let dataset = Dataset.generate(0,2*Math.PI,0.01);
    let fit = [];

    let error = 0;

    for(let i = 0; i < pop.size; i++)
    {
        let weights = pop[i].subarray(0, pop.length / 2);
        let biases = pop[i].subarray(pop.length / 2 + 1, pop.length - 1);

        biases = biases.unshift(0);

        this.NeNe.setWeights(weights);
        this.NeNe.setBiases(biases);

        error = this.NeNe.getTotalError(dataset);
        if(error == 0){
          fit.push(10000000);
        }
        else {
          fit.push(1/ error);
        }
    }
  }

  getHalfPopulation(pop, newPop){
    
  }

  step(){
    // ohodnotit
    this.fitness = this.calculateFitness(this.population);

    // roulette
    let selector = new Selection();
    let pop = selector.getSelectedParrents(this.population, this.fitness);

    //krizenie
    let crossOver = new CrossOver();
    this.newPopulation = crossOver.getNewGeneration(pop);

    //mutacia
    let mutator = new Mutation(this.mutProb, this.replProb);
    this.newPopulation = mutator.getMutatedPopulation(this.newPopulation, type);

    //random jedinci kazdu x iteraciu
    //something to do

    //vyberem najlepsich z rodicov a deti
    this.population = getHalfPopulation(this.population, this.newPopulation);
  }


}
