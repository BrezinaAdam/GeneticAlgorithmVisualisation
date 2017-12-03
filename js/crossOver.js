class CrossOver {
  constructor() {
  }

  setParrents(parrent1, parrent2){
    this.parrent1 = parrent1;
    this.parrent2 = parrent2;
  }

  getChilds(){
    var range = this.parrent1.length;

    var random = Math.round(Math.random() * (range - 1));

    var child1 = [];
    var child2 = [];
    for(var i = 0; i < range; i++){
      if(i < random)
      {
        child1[i] = this.parrent1[i];
        child2[i] = this.parrent2[i];
      }
      else {
        child1[i] = this.parrent2[i];
        child2[i] = this.parrent1[i];
      }
    }

    var output = {child1, child2};
    return output;
  }
}

/*
var a = new CrossOver();
a.setParrents([1, 0, 0, 1, 0, 1],[0, 1, 0, 0, 1, 0]);
console.log(a.getChilds());
*/
