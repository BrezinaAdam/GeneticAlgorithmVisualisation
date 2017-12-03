class InitPopulation {
  constructor(length, type) {
    this.type = type;
    this.length = length;
    this.max = 1;
    this.min = 0;
    this.genotyp = [this.length];
  }

  setLimits(min, max) {
    this.min = min;
    this.max = max;
  }

  getGenotyp() {
    this.genotyp = [this.length];
    if (this.type == "BINARY") {
      for (var i = 0; i < this.length; i++) {
        this.genotyp[i] = Math.round(Math.random()) * (this.max - this.min) + this.min;
      }
    } else if (this.type == "INTEGER") {
      for (var i = 0; i < this.length; i++) {
        this.genotyp[i] = Math.round(Math.random() * (this.max - this.min) + this.min);
      }
    } else if (this.type == "FLOAT") {
      for (var i = 0; i < this.length; i++) {
        this.genotyp[i] = Math.random() * (this.max - this.min) + this.min;
      }
    }

    return this.genotyp;
  }

  getPopulation(size){
    var population = [size];

    for(var i = 0; i < size; i++){
      population[i] = this.getGenotyp();
    }

    return population;
  }

}

/*  example of usage
var a = new InitPopulation(10, "INTEGER");
a.setLimits(2,8);
console.log(a.getPopulation(20));
*/
