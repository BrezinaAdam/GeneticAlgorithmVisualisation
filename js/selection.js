class Selection {

  getOne(){
    let sum = 0;
    let rand = Math.random()*this.totalFittness;
    let index = 0;

    while(rand > sum){
      sum += this.fitness[index];
      index++;
    }

    return this.population[index-1];

  }

  getRoulete(){
    this.selected = [this.population.length];

    for(let i = 0; i < this.population.length; i = i + 2){
      this.selected[i] = getOne();
      do{
        this.selected[i+1] = getOne();
      }while (this.selected[i] == this.selected[i+1]);
    }
  }

  getBinary(){
    this.selected = [this.population.length];
    // something to do
  }

  getSelectedParrents(pop, fitness type){
    this.population = pop;
    this.fitness = fitness;
    this.type = type;
    this.totalFittness = fitness.reduce((a, b) => { return a + b; });

    if(type == "ROULETTE"){
      this.getRoulete();

      return this.selected;
    }

    else if(type == "BINARY"){
      this.getBinary();
      return this.selected;
    }
  }
}

module.exports = Selection
