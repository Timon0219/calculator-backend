const Record = require('../models/Record');

exports.getRecords = async (req, res) => {
  try {
    const records = await Record.find({ user_id: req.user._id, deleted: false });
    res.send(records);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findOneAndUpdate({ _id: req.params.id, user_id: req.user._id }, { deleted: true }, { new: true });
    if (!record) {
      return res.status(404).send({ error: 'Record not found' });
    }
    res.send(record);
  } catch (error) {
    res.status(400).send(error);
  }
};