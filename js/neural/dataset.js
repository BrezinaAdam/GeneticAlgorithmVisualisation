'using strict';

/**
  Static class Dataset creates training data for neural network
  @param {!number} from defines first data sample
  @param {!number} to defines last data sample
  @param {!number} step defines differentiations between sampling points
 */

class Dataset
{
  static generate(from, to, step)
  {
    let res = [2];
    res[0] = [];
    res[1] = [];

    let curr = from;
    do
    {
      res[0].push(curr);
      res[1].push(Math.sin(curr));
      curr += step;
    }
    while (curr < to);

    return res;
  }
}

module.exports = Dataset;
