class InitPopulation {
  /**
    This function returns ...
    @param {Array.<number>} genotyp ...
    @param {string} type ...
    @param {number} min ...
    @param {number} max ...
  */
  constructor(genotyp, type, min = 0, max = 1) {
    this.type = type;
    this.length = genotyp.length;
    this.max = max;
    this.min = min;
    this.genotyp = [this.length];
  }

  /**
    This function  ...
    @returns {Array.<number>}
  */
  getGenotyp() {
    this.genotyp = [this.length];

    if (this.type == "BINARY") {
      for (var i = 0; i < this.length; i++) {
        this.genotyp[i] = Math.round(Math.random()) * (this.max - this.min) + this.min;
      }
    }
    else if (this.type == "INTEGER") {
      for (var i = 0; i < this.length; i++) {
        this.genotyp[i] = Math.round(Math.random() * (this.max - this.min) + this.min);
      }
    }
    else if (this.type == "FLOAT") {
      for (var i = 0; i < this.length; i++) {
        this.genotyp[i] = Math.random() * (this.max - this.min) + this.min;
      }
    }

    return this.genotyp;
  }

  /**
    This function  ...
    @param {number} size ...
    @returns {Array.Array.<number>}
  */
  getPopulation(size){
    var population = [size];

    for(var i = 0; i < size; i++){
      population[i] = this.getGenotyp();
    }

    return population;
  }

}

/*  example of usage
var a = new InitPopulation([0, 0, 0, 0, 0, 0, 0], "BINARY");
console.log(a.getPopulation(10));
*/
module.exports = InitPopulation
