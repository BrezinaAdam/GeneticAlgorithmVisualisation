'use strict';

var MAX_ITERS = 200;

var WIDTH = 500;
var HEIGHT = 300;
var PADDING = 12;

var line = d3.line()
.x(function(d){ return (d[0] + 1)*250;})
.y(function(d){return HEIGHT-d[1]*250 - PADDING;});

var lineErr = d3.line()
.x(function(d){ return (d[0] / MAX_ITERS)*500;})
.y(function(d){ return HEIGHT-d[1]*20000.0 });//- PADDING;});

var uscalex = d3.scaleLinear()
.domain([0, 500])
.range([0, 500]);

var uscaley = d3.scaleLinear()
.domain([0, 300])
.range([0, 300]);

function make_x_gridlines() {
  return d3.axisBottom(uscalex)
  .ticks(10)
}

function make_y_gridlines() {
  return d3.axisLeft(uscaley)
  .ticks(5)
}

var canvas = d3.select(".neuralNetworkOutput");
canvas.attr("width", WIDTH);
canvas.attr("height", HEIGHT);

canvas.append("g")
.attr("class", "grid")
.call(make_y_gridlines()
.tickSize(-500)
.tickFormat(""));

canvas.append("g")
.attr("class", "grid")
.attr("transform", "translate(0," + 300 + ")")
.call(make_x_gridlines()
.tickSize(-300)
.tickFormat(""));

var canvasErr = d3.select(".neuralNetworkError");
canvasErr.attr("width", WIDTH);
canvasErr.attr("height", HEIGHT);

canvasErr.append("g")
.attr("class", "grid")
.call(make_y_gridlines()
.tickSize(-500)
.tickFormat(""));

canvasErr.append("g")
.attr("class", "grid")
.attr("transform", "translate(0," + 300 + ")")
.call(make_x_gridlines()
.tickSize(-300)
.tickFormat(""));

var totalError = [];

function startMagic()
{
  let genAlg = new GeneticAlgoritm(sizeNN-2);
  let counter = MAX_ITERS;
  totalError = [];
  executeGen();

  function executeGen()
  {
    console.log("in");
    setTimeout(function(){
      genAlg.step();
      let result = genAlg.getOutput();
      console.log(genAlg.getBest24());

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
        })
        .select("title").text("W: " + weights[i]);
      }

      totalError.push([MAX_ITERS-counter, 0]);
      totalError.push([MAX_ITERS-counter, getSquareError(result[1], result[2])]);
      canvasErr.selectAll("path").remove();
      canvasErr.append("path").data([totalError]).attr("d", lineErr).attr("stroke", "red").attr("stroke-width", 2).attr("fill", "none");

      counter--;
      if (counter > 0)
      {
        executeGen();
      }

    }, 200);
  }
}

function getSquareError(requested, real)
{
  let sum = 0;

  for (let i = 0; i < requested.length; i++)
  {
    sum += Math.pow(requested[i] - real[i], 2);
  }

  return sum / requested.length;
}