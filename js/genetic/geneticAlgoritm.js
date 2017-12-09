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

  calculateFitness(){

  }

  getHalfPopulation(){
    
  }

  step(){
    // ohodnotit
    this.calculateFitness();

    //krizenie
    let crossOver = new CrossOver();
    this.newPopulation = crossOver.getNewGeneration(this.population);

    //mutacia
    let mutator = new Mutation(this.mutProb, this.replProb);
    this.newPopulation = mutator.getMutatedPopulation(this.newPopulation, type);

    //random jedinci kazdu x iteraciu
    //something to do

    //vyberem najlepsich z rodicov a deti
  }


}
