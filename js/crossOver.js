class CrossOver {
  /**
    Empty contructor for CrossOver class.
  */
  constructor() {
  }

  /**
    This function  ...
    @param {Array.<number>} parrent1
    @param {Array.<number>} parrent2
    @returns {Array.Array.<number>}
  */
  getChilds(parrent1, parrent2){
    var range = parrent1.length;

    var random = Math.round(Math.random() * (range - 1));

    var child1 = [];
    var child2 = [];
    for(var i = 0; i < range; i++){
      if(i < random)
      {
        child1[i] = parrent1[i];
        child2[i] = parrent2[i];
      }
      else {
        child1[i] = parrent2[i];
        child2[i] = parrent1[i];
      }
    }

    var output = [child1, child2];
    return output;
  }

  /**
    This function  ...
    @param {Array.Array.<number>} pop
    @returns {Array.Array.<number>}
  */
  getNewGeneration(pop){
    var newGen = [];

    for(var i = 0; i < pop.length; i += 2)
    {
      var p1 = pop[i];
      var p2 = pop[i+1];

      var childs = this.getChilds(p1,p2);
      newGen.push(childs[0]);
      newGen.push(childs[1]);
    }

    return newGen;
  }
}

///*
var a = new CrossOver();
var pop = [[1, 0, 1, 1, 1, 1, 1],[1, 1, 1, 1, 0, 1, 1],[0, 1, 1, 1, 1, 1, 1],[1, 1, 1, 1, 1, 1, 0]];
console.log(a.getNewGeneration(pop));
//*/
