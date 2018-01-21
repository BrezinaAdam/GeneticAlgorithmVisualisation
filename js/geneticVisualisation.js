{
  let popul = [];
  let weights = [1,2,3,4,2,1,2,0.5,1,2,3,1];
  popul.push({"id":1, "fitness":5, "weight":weights});
  popul.push({"id":2, "fitness":15, "weight":weights});
  popul.push({"id":3, "fitness":10, "weight":weights});
  popul.push({"id":4, "fitness":20, "weight":weights});
  popul.push({"id":5, "fitness":5, "weight":weights});
  popul.push({"id":6, "fitness":15, "weight":weights});
  popul.push({"id":7, "fitness":10, "weight":weights});
  popul.push({"id":8, "fitness":21, "weight":weights});
  popul.push({"id":9, "fitness":5, "weight":weights});
  popul.push({"id":10, "fitness":15, "weight":weights});
  popul.push({"id":11, "fitness":10, "weight":weights});
  popul.push({"id":12, "fitness":2, "weight":weights});
  popul.push({"id":13, "fitness":5, "weight":weights});
  popul.push({"id":14, "fitness":5, "weight":weights});
  popul.push({"id":15, "fitness":10, "weight":weights});
  popul.push({"id":16, "fitness":20, "weight":weights});
  popul.push({"id":17, "fitness":5, "weight":weights});
  popul.push({"id":18, "fitness":15, "weight":weights});
  popul.push({"id":19, "fitness":10, "weight":weights});
  popul.push({"id":20, "fitness":20, "weight":weights});
  popul.push({"id":21, "fitness":14, "weight":weights});
  popul.push({"id":22, "fitness":15, "weight":weights});
  popul.push({"id":23, "fitness":10, "weight":weights});
  popul.push({"id":24, "fitness":1, "weight":weights});

  let minFitness = 1;
  let maxFitness = 25;


  let svgContainer = d3.select(".geneticAlgorithm");
  let width = 880;
  let height = 550;

  svgContainer.attr("width", width);
  svgContainer.attr("height", height);


  let circles = svgContainer.selectAll("circle")
  .data(popul)
  .enter()
  .append("circle")
  .attr("id", function(d) {
    return "g"+d.id;
  })
  .attr("cx", function (d) {
    if (d.id <= popul.length/3)
      return (width-100)/popul.length*3*d.id;
    else if (d.id <= 2*popul.length/3)
      return (width-100)/popul.length*3*(d.id-popul.length/3);
      else
      return (width-100)/popul.length*3*(d.id-2*popul.length/3);
  })
  .attr("cy", function (d) {
    if (d.id <= popul.length/3)
    return 100;
    else if (d.id <= 2*popul.length/3)
      return 270;
      else {
        return 450;
      }
    })
  .attr("r", function (d) {
    return d.fitness+10;
  })
  .style("fill", function(d) {
    //alert("rgba(0,"+(d.fitness*255/(maxFitness-minFitness))+","+(d.fitness*255/(maxFitness-minFitness))+",1)");
      return  "rgba(0,"+Math.round(d.fitness*255/(maxFitness-minFitness))+","+Math.round(d.fitness*255/(maxFitness-minFitness))+",1)";
    })
  .call(d3.drag()
  .on("start", dragstarted2));
}

function dragstarted2(d) {
  alert(d.id);
}
