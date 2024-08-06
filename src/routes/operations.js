const express = require('express');
const { performOperation, getOperations  } = require('../controllers/operationController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, performOperation);
router.get('/', getOperations);

module.exports = router;