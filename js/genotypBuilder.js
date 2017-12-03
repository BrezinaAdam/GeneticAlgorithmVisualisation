class GenotypBuilder {
  constructor(maxInt = 4, maxFloat = 8) {
    this.maxInt = maxInt;
    this.maxFloat = maxFloat;
  }

  getGenotyp(key, elements =[]){
    var genotyp = [];

    for(var i = 0; i < key.length; i++)
    {
      switch (key[i]) {
        case '-':
          genotyp.push(0);
          break;
        case 'b':
          genotyp.push(0);
          break;
        case 'i':
          for(var j = 0; j < this.maxInt; j++){
            genotyp.push(0);
          }
          break;
        case 'f':
          for(var j = 0; j < this.maxFloat; j++){
            genotyp.push(0);
          }
          break;
      }
    }

    // missing second part for elements decomposition
    // when elements.length > 0

    return genotyp;
  }

  bin2dec(array){
    var sum = 0;
    for(var i = 0; i < array.length; i++){
      sum += array[i] * Math.pow(2,array.length - i - 1);
    }
    return sum;
  }

  getElements(key, genotyp){
    var i = 0;    // key position
    var j = 0;    // genotyp position
    var elements = [];
    var minusFlag = false;

    while(i < key.length)
    {
      var subgen = [];

      switch (key[i]) {
        case '-':
          if(genotyp[j] == 1)
            minusFlag = true;
          j++;

          break;

        case 'b':
          if(minusFlag == true && genotyp[j-1] == 1)
            elements.push(-1*genotyp[j]);
          else
            elements.push(genotyp[j]);

          minusFlag = false;
          j++;

          break;

        case 'i':
          for(var x = j; x < j + this.maxInt; x++)
          {
            subgen.push(genotyp[x]);
          }

          if(minusFlag == true && genotyp[j-1] == 1)
            elements.push(-this.bin2dec(subgen));
          else
            elements.push(-this.bin2dec(subgen));

          minusFlag = false;
          j += this.maxInt;

          break;

        case 'f':
          minusFlag = false;
          j += this.maxFloat;
          // not finished yet
          break;
      }
      i++;
    }

    return elements;
  }
}

var a = new GenotypBuilder();
var key = "-bb-i";
console.log(a.getElements(key,[1,   1,    0,   1,   1, 1, 1, 0]));
//console.log()

/*
"f"
"-f"
"b"
"i"
"-i"
*/
