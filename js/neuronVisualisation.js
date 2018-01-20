var graph = {
  nodes:[],
  links:[]
};

let sizeNN = 12;
graph.nodes.push({"id": String.fromCharCode('A'.charCodeAt()), "group": 1})
graph.nodes.push({"id": String.fromCharCode('A'.charCodeAt() + sizeNN-1), "group": 3})
for(let i = 1; i < sizeNN-1; i++){
  graph.nodes.push({"id": String.fromCharCode('A'.charCodeAt() + i), "group": 2})
  graph.links.push({"id": ('w'+i), "source": String.fromCharCode('A'.charCodeAt()), "target": String.fromCharCode('A'.charCodeAt() + i), "value": Math.random()*3.5+2.5});
  graph.links.push({"id": ('w'+(i+sizeNN-2)),"source": String.fromCharCode('A'.charCodeAt() + i), "target": String.fromCharCode('A'.charCodeAt() + sizeNN-1), "value": Math.random()*3.5+2.5});
}

var svgContainer = d3.select(".neuralNetwork");
var width = 800;
var height = 550;

svgContainer.attr("width", width);
svgContainer.attr("height", height);

var circles = svgContainer.selectAll("circle")
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
    return "#6497b1";
  }
  else if(d.id === String.fromCharCode('A'.charCodeAt() + sizeNN - 1))
  {
    return "#005b96";
  }
  else {
    return "orange";
  }
})
.call(d3.drag()
.on("start", dragstarted));

var line = svgContainer.selectAll("line")
.data(graph.links)
.enter().append("line")
.attr("id", function(d){return d.id})
.attr("x1", function(d){
  let xx1 = d3.selectAll("circle[id='"+d.source+"']").attr("cx");
  let yy1 = d3.selectAll("circle[id='"+d.source+"']").attr("cy");
  let xx2 = d3.selectAll("circle[id='"+d.target+"']").attr("cx");
  let yy2 = d3.selectAll("circle[id='"+d.target+"']").attr("cy");
  let r = parseInt(d3.selectAll("circle[id='"+d.source+"']").attr("r"))+4;
  //let r = 20;

  let k = (xx2-xx1) / (yy2-yy1);
  let newx = Math.sqrt(r*r/(1+1/(k*k)));
  let newy = newx/k;
  return parseInt(d3.selectAll("circle[id='"+d.source+"']").attr("cx"))+newx;

})
.attr("y1", function(d){
  let xx1 = d3.selectAll("circle[id='"+d.source+"']").attr("cx");
  let yy1 = d3.selectAll("circle[id='"+d.source+"']").attr("cy");
  let xx2 = d3.selectAll("circle[id='"+d.target+"']").attr("cx");
  let yy2 = d3.selectAll("circle[id='"+d.target+"']").attr("cy");
  let r = parseInt(d3.selectAll("circle[id='"+d.source+"']").attr("r"))+4;
  //let r = 20;

  let k = (xx2-xx1) / (yy2-yy1);
  let newx = Math.sqrt(r*r/(1+1/(k*k)));
  let newy = newx/k;
  return parseInt(d3.selectAll("circle[id='"+d.source+"']").attr("cy"))+newy;
})
.attr("x2", function(d){
  let xx1 = d3.selectAll("circle[id='"+d.source+"']").attr("cx");
  let yy1 = d3.selectAll("circle[id='"+d.source+"']").attr("cy");
  let xx2 = d3.selectAll("circle[id='"+d.target+"']").attr("cx");
  let yy2 = d3.selectAll("circle[id='"+d.target+"']").attr("cy");
  let r = parseInt(d3.selectAll("circle[id='"+d.target+"']").attr("r"))+4;
  //let r = 21;

  let k = (xx2-xx1) / (yy2-yy1);
  let newx = Math.sqrt(r*r/(1+1/(k*k)));
  let newy = newx/k;

  return parseInt(d3.selectAll("circle[id='"+d.target+"']").attr("cx")) - newx;
})
.attr("y2", function(d){
  let xx1 = d3.selectAll("circle[id='"+d.source+"']").attr("cx");
  let yy1 = d3.selectAll("circle[id='"+d.source+"']").attr("cy");
  let xx2 = d3.selectAll("circle[id='"+d.target+"']").attr("cx");
  let yy2 = d3.selectAll("circle[id='"+d.target+"']").attr("cy");
  let r = parseInt(d3.selectAll("circle[id='"+d.target+"']").attr("r"))+4;
  //let r = 20;

  let k = (xx2-xx1) / (yy2-yy1);
  let newx = Math.sqrt(r*r/(1+1/(k*k)));
  let newy = newx/k;
  return parseInt(d3.selectAll("circle[id='"+d.target+"']").attr("cy")) - newy;
})
.attr('stroke-width', function(d) {
  return d.value;
})
.call(d3.drag()
.on("start", dragstarted));

function dragstarted(d) {
  alert(d.id);
}
