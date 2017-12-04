class Selection {
  constructor() {

  }

  getFitness(pop){
    var fitness = [pop.legth];

    for(var i = 0; i < pop.length; i++)
    {
      fitness[i] = Math.random()*10;
    }

    return fitness;
  }

  getRoulete(pop){
    var fitness = getFitness(pop);

    //...
  }

  getBinary(pop){
    // something to do
  }
}

module.exports = Selection
