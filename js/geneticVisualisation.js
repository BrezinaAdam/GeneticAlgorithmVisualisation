
function drawGA(best24pop)
{
  if(best24pop === null)
    return;

  let minFitness = best24pop[0].fitness;
  let maxFitness = best24pop[0].fitness;

  for(let i = 0; i < best24pop.length; i++)
  {
    if(best24pop[i].fitness > maxFitness)
      maxFitness = best24pop[i].fitness;
    if(best24pop[i].fitness < minFitness)
      minFitness = best24pop[i].fitness;
  }

  let svgContainer = d3.select(".geneticAlgorithm");
  let width = 800;
  let height = 610;

  svgContainer.selectAll('*').remove();

  svgContainer.attr("width", width);
  svgContainer.attr("height", height);

  let circles = svgContainer.selectAll("circle")
  .data(best24pop)
  .enter()
  .append("circle")
  .attr("id", function(d) {
    return "g"+d.id;
  })
  .attr("cx", function (d) {
    if (d.id <= best24pop.length/3)
      return (width-100)/best24pop.length*3*d.id;
    else if (d.id <= 2*best24pop.length/3)
      return (width-100)/best24pop.length*3*(d.id-best24pop.length/3);
      else
      return (width-100)/best24pop.length*3*(d.id-2*best24pop.length/3);
  })
  .attr("cy", function (d) {
    if (d.id <= best24pop.length/3)
    return 100;
    else if (d.id <= 2*best24pop.length/3)
      return 270;
      else {
        return 450;
      }
    })
  .attr("r", function (d) {
    if(maxFitness-minFitness < 0.00001)
      return 35;
    return 35*(d.fitness-minFitness)/(maxFitness-minFitness)+5;
  })
  .style("fill", function(d) {
    let normFitness = 0;
    if(maxFitness-minFitness < 0.00001)
      normFitness = 0.5;
    else {
      normFitness = (d.fitness-minFitness)/(maxFitness-minFitness);
    }
    //alert("rgba(0,"+(d.fitness*255/(maxFitness-minFitness))+","+(d.fitness*255/(maxFitness-minFitness))+",1)");
    //let red = Math.round((d.fitness-minFitness)*255.0/(maxFitness-minFitness));
    //let green = Math.round((d.fitness-minFitness)*255.0/(maxFitness-minFitness));
    //let normFitness = (d.fitness-minFitness)/(maxFitness-minFitness);
    let green = 0;
    let red = 0;
    let brightness = 0.92;
    if(normFitness <= 0.75){
      red = Math.floor(-340 * normFitness + 255);

    }
    if(normFitness < 0.5){
      red += Math.floor((340*normFitness)*brightness);
      green += Math.floor((340*normFitness)*brightness*0.85);
    }
    if(normFitness >= 0.25){
      green = Math.floor((normFitness-0.25)*340);
    }
    if(normFitness >= 0.5){
      red += Math.floor((340-340*normFitness)*brightness);
      green += Math.floor((340-340*normFitness)*brightness*0.85);
    }
      return  "rgba("+red+","+green+",0,1)";
    })
  .call(d3.drag()
  .on("start", dragstarted2));

  function dragstarted2(d) {
    let weight = genAlg.getBest24()[d.id-1].weight;
    for(let i = 0; i < weight.length; i++){
      d3.select(".neuralNetworkmini").selectAll("line[id='w"+(i+1)+"']")
      .attr('stroke-width', function(d) {
        return Math.abs(weight[i]);
      })
      .attr("stroke", function(d){
        return d.color = (weight[i] > 0 ? "rgb(230, 145, 106)" : "rgb(52, 98, 128)");
      })
      .select("title").text("W: " + weight[i]);
    }
  }
}
