const express = require('express');
const router = express.Router();

const {
  getUsers,
  createUsers,
  deleteUsers,
  getUser
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUsers);
router.get('/:email', getUser)
router.delete('/:id', deleteUsers);

module.exports = router;