const Operation = require('../models/Operation');
const Record = require('../models/Record');
const User = require('../models/User');
const calculatorService = require('../services/calculatorService');
const axios = require('axios');

exports.performOperation = async (req, res) => {
  const { type, args } = req.body;
  try {
    const operation = await Operation.findOne({ type });
    if (!operation) {
      return res.status(404).send({ error: 'Operation not found' });
    }
    
    if (req.user.balance < operation.cost) {
      return res.status(403).send({ error: 'Insufficient balance' });
    }
    
    let result;
    if (type === 'random_string') {
      const response = await axios.get('https://www.random.org/strings/?num=1&len=10&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new');
      result = response.data.trim();
    } else {
      result = calculatorService.calculate(type, args);
    }
    req.user.balance -= operation.cost;
    await req.user.save();

    const record = new Record({
      operation_id: operation._id,
      type: operation.type,
      user_id: req.user._id,
      amount: operation.cost,
      user_balance: req.user.balance,
      operation_response: result,
    });
    await record.save();

    res.send({ result });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getOperations = async (req, res) => {
  try {
    const operations = await Operation.find();
    res.json(operations);
  } catch (error) {
    console.error('Error fetching operations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};