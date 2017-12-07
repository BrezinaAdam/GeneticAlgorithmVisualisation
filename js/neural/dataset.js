'using strict';

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
