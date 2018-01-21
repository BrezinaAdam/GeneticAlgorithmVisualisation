'using strict';

/**
  Static class Dataset creates training data for neural network
  @param {!number} from defines first data sample
  @param {!number} to defines last data sample
  @param {!number} step defines differentiations between sampling points
 */

class Dataset
{
  static x_map(x, from, to)
  {
    return x / (to - from) * 2.0 - 1.0;
  }

  static y_map(y)
  {
    return (y + 1.0) / 2.0;
  }

  static generate(from, to, step)
  {
    let res = [2];
    res[0] = [];
    res[1] = [];

    let curr = from;
    do
    {
      res[0].push(this.x_map(curr, from, to));
      //res[1].push(this.y_map(Math.sin(curr)/3*2));
      //res[1].push(Math.pow(this.x_map(curr, from, to), 2)/3*2);
      //res[1].push((0.5 * Math.pow(this.x_map(curr, from, to), 3) + 0.5)/3*2);
      res[1].push(Math.exp(-Math.pow((this.x_map(curr, from, to)) / 0.3408, 2))/3*2);
      curr += step;
    }
    while (curr < to);

    return res;
  }
}

//module.exports = Dataset;
