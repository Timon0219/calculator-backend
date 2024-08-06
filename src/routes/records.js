const express = require('express');
const { getRecords, deleteRecord } = require('../controllers/recordController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getRecords);
router.delete('/:id', auth, deleteRecord);

module.exports = router;