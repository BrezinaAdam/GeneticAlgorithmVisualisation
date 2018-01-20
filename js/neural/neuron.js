'using strict';

/**
  class Neuron represents a single neuron in a neural network
  every neuron can have different activation function
  while by default the activation function is a sigmoid function
  @member {number} input defines the value for the neuron
  @member {number} output defines the value for the neuron after neuron activation
  @member {number} bias defines the bias for the neuron
  @member {Array} prevLayer represents an array of neurons connected to the current neurons
  @member {Array} weights defines the weights of the synapsies of the neurons in previous layers
  @member {function} activation defines the activation function of the neuron
*/

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

  /**
  method setBias sets the value of bias
  @param {!number} bias defines the value of the bias
  */
  setBias(bias)
  {
    this.bias = bias;
  }

  /**
    method setInput sets the value for the neuron
    @param {!number} input defines value for a single neron
    @param {!Array} input defines values for an array of neurons
   */
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

  /**
    method setWeights sets the weight for a specific neuron
    @param {!number} index defines the index of the weight
    @param {!number} value defines the weight value
   */
  setWeight(index, value)
  {
    if (index >= this.weights.length)
    {
      throw new Error('Invalid index of weight!');
    }

    this.weights[index] = value;
  }

  getWeight(index)
  {
    if (index >= this.weights.length)
    {
      throw new Error('Invalid index of weight!');
    }

    return this.weights[index];
  }

  getBias()
  {
    return this.bias;
  }

  /**
  method getOutput returns the value of the neurons
  @returns {number} specifies the value of the output
  */
  getOutput()
  {
    return this.output;
  }

  /**
  method activate recurently activates all of the neurons in a previous layers
  and counts output for the current neuron (feedforward)
  */
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

/**
Neuron is exposed as a module
*/
//module.exports = Neuron;
