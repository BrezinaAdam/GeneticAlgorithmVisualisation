'use strict';

var WIDTH = 300;
var HEIGHT = 270;
var PADDING = 12;

var canvas = d3.select(".neuralNetworkOutput");
canvas.attr("width", WIDTH);
canvas.attr("height", HEIGHT);

var line = d3.line()
.x(function(d){ return (d[0] + 1)*150;})
.y(function(d){return HEIGHT-d[1]*250 - PADDING;});

var uscale = d3.scaleLinear()
.domain([0, 300])
.range([0, 300]);

function make_x_gridlines() {
  return d3.axisBottom(uscale)
  .ticks(5)
}

function make_y_gridlines() {
  return d3.axisLeft(uscale)
  .ticks(3)
}

canvas.append("g")
.attr("class", "grid")
.call(make_y_gridlines()
.tickSize(-300)
.tickFormat(""));


canvas.append("g")
.attr("class", "grid")
.attr("transform", "translate(0," + 300 + ")")
.call(make_x_gridlines()
.tickSize(-300)
.tickFormat(""));

function startMagic()
{
  let genAlg = new GeneticAlgoritm(sizeNN-2);
  let counter = 200;
  executeGen();

  function executeGen()
  {
    console.log("in");
    setTimeout(function(){
      genAlg.step();
      let result = genAlg.getOutput();

      let data1 = [], data2 = [];
      for (let j = 0; j < result[0].length; j++)
      {
        data1.push([result[0][j], result[1][j]]);
        data2.push([result[0][j], result[2][j]]);
      }

      canvas.selectAll("path").remove();
      canvas.selectAll("text").remove();
      canvas.append("text").attr("x", 0).attr("y", 20).text(counter);
      canvas.append("path").data([data1]).attr("d", line).attr("stroke", "blue").attr("stroke-width", 2).attr("fill", "none");
      canvas.append("path").data([data2]).attr("d", line).attr("stroke", "red").attr("stroke-width", 2).attr("fill", "none");

      let weights = genAlg.getWeights();
      for(let i = 0; i < weights.length; i++){
        d3.selectAll("line[id='w"+(i+1)+"']")
        .attr('stroke-width', function(d) {
          return Math.abs(weights[i]);
        })
        .attr("stroke", function(d){
          return d.color = (weights[i] > 0 ? "rgb(230, 145, 106)" : "rgb(52, 98, 128)");
        });
      }
      counter--;
      if (counter > 0)
      {
        executeGen();
      }

    }, 200);
  }
}
