function drawTF(totalFitness, maxIters)
{
  let maxFit = 0;
  for (let i = 0; i < totalFitness.length; i++)
  {
    if (totalFitness[i][1] > maxFit)
    {
      maxFit = totalFitness[i][1];
    }
  }

  var svgFT = d3.select(".totalFitness");

  var lineF  = d3.line()
  .x(function(d){ return d[0] / maxIters * svgFT.attr("width"); })
  .y(function(d){ return svgFT.attr("height") - (d[1]/maxFit*svgFT.attr("height")); });

  svgFT.selectAll("path").remove();
  svgFT.append("path").data([totalFitness]).attr("d", lineF).attr("stroke", "blue").attr("stroke-width", 2).attr("fill", "none");
}
