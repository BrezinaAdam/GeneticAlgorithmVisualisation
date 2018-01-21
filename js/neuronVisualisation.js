
function drawNN(svgCont, sizeX, sizeY)
{
  let graph = {
    nodes:[],
    links:[]
  };

  if(svgCont === ".neuralNetwork"){
    graph.nodes.push({"id": String.fromCharCode('A'.charCodeAt()), "group": 1})
    graph.nodes.push({"id": String.fromCharCode('A'.charCodeAt() + sizeNN-1), "group": 3})
    for(let i = 1; i < sizeNN-1; i++){
      graph.nodes.push({"id": String.fromCharCode('A'.charCodeAt() + i), "group": 2})
      graph.links.push({"id": ('w'+i), "source": String.fromCharCode('A'.charCodeAt()), "target": String.fromCharCode('A'.charCodeAt() + i), "value": Math.random()*3.5+2.5});
      graph.links.push({"id": ('w'+(i+sizeNN-2)),"source": String.fromCharCode('A'.charCodeAt() + i), "target": String.fromCharCode('A'.charCodeAt() + sizeNN-1), "value": Math.random()*3.5+2.5});
    }
  }
  else{
    graph.nodes.push({"id": String.fromCharCode('A'.charCodeAt()), "group": 1})
    graph.nodes.push({"id": String.fromCharCode('A'.charCodeAt() + sizeNN-1), "group": 3})
    for(let i = 1; i < sizeNN-1; i++){
      graph.nodes.push({"id": String.fromCharCode('A'.charCodeAt() + i), "group": 2})
      graph.links.push({"id": ('w'+i), "source": String.fromCharCode('A'.charCodeAt()), "target": String.fromCharCode('A'.charCodeAt() + i), "value": Math.random()*3.5+2.5});
      graph.links.push({"id": ('w'+(i+sizeNN-2)),"source": String.fromCharCode('A'.charCodeAt() + i), "target": String.fromCharCode('A'.charCodeAt() + sizeNN-1), "value": Math.random()*3.5+2.5});
    }
  }

  let svgContainer = d3.select(svgCont);
  svgContainer.selectAll('*').remove();
  let width = sizeX;
  let height = sizeY;

  svgContainer.attr("width", width);
  svgContainer.attr("height", height);

  let circles = svgContainer.selectAll("circle")
  .data(graph.nodes)
  .enter()
  .append("circle")
  .attr("id", function(d){return d.id})
  .attr("cx", function (d) {
    if(d.group === 1){
      return width/2 - width/3;
    }else if(d.group === 2){
      return width/2;
    }
    else {
      return width/2 + width/3;
    }

  })
  .attr("cy", function (d) {
    if(d.id === "A" || d.id === String.fromCharCode('A'.charCodeAt() + sizeNN - 1)){
      return height/2;
    }
    else
    {
      return 5 + (height-40)/(sizeNN-2) * (d.id.charCodeAt()-65);
    }
  })
  .attr("r", function (d) {
    if(d.id === "A"){
      return 15;
    }
    else if(d.id === String.fromCharCode('A'.charCodeAt() + sizeNN - 1))
    {
      return 18;
    }
    else {
      return 12;
    }
  })
  .style("fill", function(d) {
    if(d.id === "A"){
      return "#a0df6e";
    }
    else if(d.id === String.fromCharCode('A'.charCodeAt() + sizeNN - 1))
    {
      return "#1b84c8";
    }
    else {
      return "rgb(255, 214, 41)";
    }
  })
  .call(d3.drag()
  .on("start", dragstarted));

  let line = svgContainer.selectAll("line")
  .data(graph.links)
  .enter().append("line")
  .attr("id", function(d){return d.id})
  .attr("x1", function(d){
    let xx1 = svgContainer.selectAll("circle[id='"+d.source+"']").attr("cx");
    let yy1 = svgContainer.selectAll("circle[id='"+d.source+"']").attr("cy");
    let xx2 = svgContainer.selectAll("circle[id='"+d.target+"']").attr("cx");
    let yy2 = svgContainer.selectAll("circle[id='"+d.target+"']").attr("cy");
    let r = parseInt(svgContainer.selectAll("circle[id='"+d.source+"']").attr("r"))+4;
    //let r = 20;

    let k = (xx2-xx1) / (yy2-yy1);
    let newx = Math.sqrt(r*r/(1+1/(k*k)));
    let newy = newx/k;
    return parseInt(svgContainer.selectAll("circle[id='"+d.source+"']").attr("cx"))+newx;

  })
  .attr("y1", function(d){
    let xx1 = svgContainer.selectAll("circle[id='"+d.source+"']").attr("cx");
    let yy1 = svgContainer.selectAll("circle[id='"+d.source+"']").attr("cy");
    let xx2 = svgContainer.selectAll("circle[id='"+d.target+"']").attr("cx");
    let yy2 = svgContainer.selectAll("circle[id='"+d.target+"']").attr("cy");
    let r = parseInt(svgContainer.selectAll("circle[id='"+d.source+"']").attr("r"))+4;
    //let r = 20;

    let k = (xx2-xx1) / (yy2-yy1);
    let newx = Math.sqrt(r*r/(1+1/(k*k)));
    let newy = newx/k;
    return parseInt(svgContainer.selectAll("circle[id='"+d.source+"']").attr("cy"))+newy;
  })
  .attr("x2", function(d){
    let xx1 = svgContainer.selectAll("circle[id='"+d.source+"']").attr("cx");
    let yy1 = svgContainer.selectAll("circle[id='"+d.source+"']").attr("cy");
    let xx2 = svgContainer.selectAll("circle[id='"+d.target+"']").attr("cx");
    let yy2 = svgContainer.selectAll("circle[id='"+d.target+"']").attr("cy");
    let r = parseInt(svgContainer.selectAll("circle[id='"+d.target+"']").attr("r"))+4;
    //let r = 21;

    let k = (xx2-xx1) / (yy2-yy1);
    let newx = Math.sqrt(r*r/(1+1/(k*k)));
    let newy = newx/k;

    return parseInt(svgContainer.selectAll("circle[id='"+d.target+"']").attr("cx")) - newx;
  })
  .attr("y2", function(d){
    let xx1 = svgContainer.selectAll("circle[id='"+d.source+"']").attr("cx");
    let yy1 = svgContainer.selectAll("circle[id='"+d.source+"']").attr("cy");
    let xx2 = svgContainer.selectAll("circle[id='"+d.target+"']").attr("cx");
    let yy2 = svgContainer.selectAll("circle[id='"+d.target+"']").attr("cy");
    let r = parseInt(svgContainer.selectAll("circle[id='"+d.target+"']").attr("r"))+4;
    //let r = 20;

    let k = (xx2-xx1) / (yy2-yy1);
    let newx = Math.sqrt(r*r/(1+1/(k*k)));
    let newy = newx/k;
    return parseInt(svgContainer.selectAll("circle[id='"+d.target+"']").attr("cy")) - newy;
  })
  .attr('stroke-width', function(d) {
    return d.value;
  })
  .attr('stroke',"gray")
  .call(d3.drag()
  .on("start", dragstarted));

  function dragstarted(d) {
    alert(d.id);
  }
}
