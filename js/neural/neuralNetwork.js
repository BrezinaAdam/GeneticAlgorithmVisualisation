'using strict';

const Neuron = require('./neuron.js');

/**
  Class NeuralNetwork
  @param {!number} from defines first data sample
  @param {!number} to defines last data sample
  @param {!number} step defines differentiations between sampling points
 */

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

    getNumOfWeights()
    {
      let cnt = 0;

      for (let i = 1; i < this.layersStruct.length; i++)
      {
        cnt += this.layersStruct[i - 1] * this.layersStruct[i];
      }

      return cnt;
    }

    getNumOfBiases()
    {
      let cnt = 0;

      for (let i = 0; i < this.layersStruct.length; i++)
      {
        cnt += this.layersStruct[i];
      }

      return cnt;
    }

    assignPopElement(pop, idx)
    {
      let numOfW = this.getNumOfWeights();
      let numOfB = this.getNumOfBiases();

      let weightsArray = [];
      let biasesArray = [0];

      for(let i = 0; i < numOfW; i++)
      {
        weightsArray.push(pop[idx][i] / 10000.0);
      }
      for(let i = 0; i < numOfB - 1; i++)
      {
        biasesArray.push(pop[idx][numOfW + i] / 10000.0);
      }

      this.setWeights(weightsArray);
      this.setBiases(biasesArray);
    }

    /**
      method checkStruct checks whether layer is of type Object and doesn't have less than 2 layers (input and output layer)
      @param {!Array} layers defines number of neurons in specific layer
     */

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

    /**
      method generateNetwork creates 2D array of neuron layers
     */

    generateNetwork()
    {
      this.layers = [this.layersStruct.length];

      for (let i = 0; i < this.layersStruct.length; i++)
      {
        this.layers[i] = [this.layersStruct[i]];

        for (let j = 0; j < this.layersStruct[i]; j++)
        {
          this.layers[i][j] = new Neuron(i == 0 ? (x) => { return x; } : this.activation);
          //this.layers[i][j] = new Neuron(this.activation);

          if (i > 0)
          {
            this.layers[i][j].setInput(this.layers[i - 1]);
          }
        }
      }
    }

    /**
      method setBias set a bias for a particular neuron in the network
      @param {!number} neuron defines the neuron method is working with
      @param {!number} layer defines the layer method is working with
      @param {!number} bias sets a particular neuron in a paricular layer to specific value
     */

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

    /**
      method setBiases sets biases for all of the neurons in the network
      @param {!Array} biases defines biases for all neurons
     */
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

    /**
      method setWeights sets weights for all of the neurons in the network
      @param {!Array} weights defines weights for all neurons
     */
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

    getWeights()
    {
      let weights = [];

      for (let i = 1; i < this.layersStruct.length; i++)
      {
        for (let j = 0; j < this.layersStruct[i]; j++)
        {
          for (let k = 0; k < this.layersStruct[i - 1]; k++)
          {
            weights.push(this.layers[i][j].getWeight(k));
          }
        }
      }

      return weights;
    }

    /**
      method setInput sets the value for the neuron
      @param {!number} input defines value for single neron
      @param {!Array} input defines values for an array of neurons
     */
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

    /**
      method feedForward counts values for all neurons in the network
      @returns {Array.<number>}
     */
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
        let res = [this.layersStruct[last]];

        for (let i = 0; i < this.layersStruct[last]; i++)
        {
          res[i] = this.layers[last][i].getOutput();
        }

        return res;
      }
    }

    /**
      method getError counts error between evaluated and desired value
      @param {number} desired defines value for single neron
      @param {Array} desired defines values for an array of neurons
      @returns {number} states for overal square error between evaluated and desired values
     */
    getError(desired)
    {
      let last = this.layersStruct.length - 1;

      if (typeof(desired) == 'number')
      {
        return Math.pow(desired - this.layers[last][0].getOutput(), 4);
      }
      else if (typeof(desired) == 'object')
      {
        let sum = 0;
        for (let i = 0; i < this.layersStruct[last]; i++)
        {
          sum += Math.pow(desired[i] - this.layers[last][i].getOutput(), 4);
        }
        return sum;
      }
    }

    /**
    method getTotalError counts total error for the whole Dataset
    @param {Array} dataset defines the input dataset
    @returns {number} specifies the overal error over the network
    */
    getTotalError(dataset)
    {
      if (typeof(dataset) != "object" || dataset.length != 2)
      {
        throw new Error("Invalid dataset!");
      }
      let total = 0;
      for(let i = 0; i < dataset[0].length; i++)
      {
        this.setInput(dataset[0][i]);
        this.feedForward();
        total += this.getError(dataset[1][i]);
      }
      return total;
    }

}

/**
NeuralNetwork is exposed as a module
*/
module.exports = NeuralNetwork;
