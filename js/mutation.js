class Mutation {
  /**
    Contructor for Mutation class.
    @param {!number} mutProb Number in % how much childs of pop will mutate.
    @param {!number} replProb Number in % how much genotyp will mutate.
   */
  constructor(mutProb, replProb) {
    this.mutProb = mutProb;
    this.replProb = replProb;
  }

  /**
    This function returns 'n' random numbers from 0-'max'
    @param {!number} n Number of indexes to create.
    @param {!number} max Maximal range(0-max)
    @returns {Array.<number>}
  */
  getRandList(n, max){
    var list = [n];

    for(var i = 0; i < n; i++)
    {
      var isThere = 1;
      var rand = 0;

      while(isThere == 1){
        rand = Math.floor(Math.random() * max);
        var isThere = 0;

        for(var j = 0; j < i; j++){
          if(rand == list[j]){
            isThere = 1;
          }
        }
      }
      list[i] = rand;
    }
    return list;
  }

  /**
    This function returns mutated population from the old one.
    @param {Array.Array.<number>} pop Array of all genotypes in population.
    @param {String} type Type of genotyp (BINARY|INTEGER|FLOAT).
    @param {number} min Minimal change of value in mutation.
    @param {number} max Maximal change of value in mutation.
    @returns {Array.Array.<number>}
  */
  getMutatedPopulation(pop, type, min=0, max=1){
    this.population = pop;
    var popSize = pop.length;
    var childSize = pop[0].length;

    var numOfMutPop = Math.floor(popSize * this.mutProb / 100);
    var numOfMutations = Math.floor(childSize * this.replProb / 100);

    var indexes = this.getRandList(numOfMutPop, popSize);

    for(var i = 0; i < numOfMutPop; i++){
      var mutPlaces = this.getRandList(numOfMutations, childSize);

      for(var j = 0; j < numOfMutations; j++){
        if(type == "BINARY"){
          if(this.population[indexes[i]][mutPlaces[j]] == min){
            this.population[indexes[i]][mutPlaces[j]] = min;
          }
          else {
            this.population[indexes[i]][mutPlaces[j]] = max;
          }
        }

        if(type == "INTEGER"){
          this.population[indexes[i]][mutPlaces[j]] += Math.round(Math.random() * (max - min - 1) + min + 1);
        }
      }
    }
    return this.population;
  }
}

/*
var a = new Mutation(20,55);
var pop = [[1, 1, 1, 1, 1, 1, 1],[1, 1, 1, 1, 1, 1, 1],[1, 1, 1, 1, 1, 1, 1],[1, 1, 1, 1, 1, 1, 1],[1, 1, 1, 1, 1, 1, 1],[1, 1, 1, 1, 1, 1, 1]];
console.log(a.getMutatedPopulation(pop,"BINARY"));
console.log(a.getMutatedPopulation(pop,"INTEGER", -8, 8));
*/
