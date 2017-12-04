'using strict';

import Neuron from './js/singleNeuron'

class NeuralNetwork
{
    constructor(layers = [1, 5, 1], activation = (x) => { return 1 / (1 + Math.exp(-x)) })
    {
      this.checkStruct(layers);

      this.layersStruct = layers;
      this.activation = activation;

      this.layers = [];
      this.generateNetwork();
    }

    checkStruct(layers)
    {
      if (typeof(layers) != 'object' || layers.length < 2)
      {
        throw new Error('NeuralNetwork layers parameter must be non-empty array');
      }

      for (let i = 0; i < layers.length; i++)
      {
        if (!Number.isInteger(layers[i]) || layers[i] < 1)
        {
          throw new Error('Neurons count in a layer must be positive integer!');
        }
      }
    }

    generateNetwork()
    {
      this.layers = [this.layersStruct.length];

      for (let i = 0; i < this.layersStruct.length; i++)
      {
        this.layers[i] = [this.layersStruct[i]];

        for (let j = 0; j < this.layersStruct[i]; j++)
        {
          this.layers[i][j] = new Neuron(this.activation);

          if (i > 0)
          {
            this.layers[i][j].setInput(this.layers[i - 1]);
          }
        }
      }
    }

    setBias(layer, neuron, bias)
    {
      if (!Number.isInteger(layer) || !Number.isInteger(neuron) || typeof(bias) != 'number')
      {
        throw new Error('Invalid parameters in setWeight!');
      }

      if (layer >= this.layersStruct.length || neuron >= this.layersStruct[layer])
      {
        throw new Error('Invalid index of layer or neuron!');
      }

      this.layers[layer][neuron].setBias(bias);
    }

    setBiases(biases)
    {
      if (typeof(biases) != 'object' || biases.length != this.layersStruct.reduce((a, b) => { return a + b; }))
      {
        throw new Error('Invalid biases array!');
      }

      let cnt = 0;
      for (let i = 0; i < this.layersStruct.length; i++)
      {
        for (let j = 0; j < this.layersStruct[i]; j++)
        {
          this.setBias(i, j, biases[cnt]);
          cnt++;
        }
      }
    }

    setWeights(weights)
    {
      let cnt = 0;
      for (let i = 1; i < this.layersStruct.length; i++)
      {
        cnt += this.layersStruct[i - 1] * this.layersStruct[i];
      }

      if (weights.length != cnt)
      {
        throw new Error('Invalid weights array!')
      }

      cnt = 0;
      for (let i = 1; i < this.layersStruct.length; i++)
      {
        for (let j = 0; j < this.layersStruct[i]; j++)
        {
          for (let k = 0; k < this.layersStruct[i - 1]; k++)
          {
            this.layers[i][j].setWeight(k, weights[cnt]);
            cnt++;
          }
        }
      }
    }

    setInput(input)
    {
      if (typeof(input) == 'number')
      {
        this.layers[0][0].setInput(input);
      }
      else if (typeof(input) == 'object')
      {
        if (input.length != this.layersStruct[0])
        {
          throw new Error('Invalid number of inputs!');
        }

        for (let i = 0; i < this.layersStruct[0]; i++)
        {
          this.layers[0][i].setInput(input[i]);
        }
      }
    }

    feedForward()
    {
      let last = this.layersStruct.length - 1;

      for (let i = 0; i < this.layersStruct[last]; i++)
      {
        this.layers[last][i].activate();
      }

      if (this.layersStruct[last] == 1)
      {
        return this.layers[last][0].getOutput();
      }
      else
      {
        var res = [this.layersStruct[last]];

        for (let i = 0; i < this.layersStruct[last]; i++)
        {
          res[i] = this.layers[last][i].getOutput();
        }

        return res;
      }
    }

    getError(desired)
    {
      let last = this.layersStruct.length - 1;

      if (typeof(desired) == 'number')
      {
        return Math.pow(desired - this.layers[last][0].getOutput());
      }
      else if (typeof(desired) == 'object')
      {
        let sum = 0;
        for (let i = 0; i < this.layersStruct[last]; i++)
        {
          sum += Math.pow(desired[i] - this.layers[last][i].getOutput());
        }
        return sum;
      }
    }
}

/*
var net = new NeuralNetwork([1, 4, 1], (x) => { return x; });
net.setBiases([0, 0, -1, -2, -3, 0]);
net.setWeights([2, 2, 2, 2, -1, -1, -1, -1]);
net.setInput(5);
console.log(net.feedForward());
*/
