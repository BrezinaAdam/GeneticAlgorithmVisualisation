'using strict';

class Neuron
{
  constructor(activation = (x) => { return 1 / (1 + Math.exp(-x)) })
  {
    this.input = 0.0;
    this.output = 0.0;
    this.bias = 0.0;

    this.prevLayer = [];
    this.weights = [];

    this.activation = activation;
  }

  setBias(bias)
  {
    this.bias = bias;
  }

  setInput(input)
  {
    if (typeof(input) == 'number')
    {
      this.input = input;
    }
    else if (typeof(input) == 'object')
    {
      this.prevLayer = input;
      this.weights = [input.length];
      for (let i = 0; i < input.length; i++)
      {
        this.weights[i] = 0.0;
      }
    }
    else
    {
      throw new Error('Invalid input of neuron!');
    }
  }

  setWeight(index, value)
  {
    if (index >= this.weights.length)
    {
      throw new Error('Invalid index of weight!');
    }

    this.weights[index] = value;
  }

  getOutput()
  {
    return this.output;
  }

  activate()
  {
    if (this.prevLayer.length > 0)
    {
      this.input = 0.0;

      for (let i = 0; i < this.prevLayer.length; i++)
      {
        this.prevLayer[i].activate();
        this.input += this.weights[i] * this.prevLayer[i].getOutput();
      }

      this.input += this.bias;
    }

    this.output = this.activation(this.input);
  }
}

module.exports = Neuron;
