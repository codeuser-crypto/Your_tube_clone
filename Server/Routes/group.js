const express = require('express');
const router = express.Router();
const groupController = require('../Controllers/group');
const auth = require('../middleware/auth');

router.post('/create', auth, groupController.createGroup);
router.get('/', auth, groupController.getGroups);
router.post('/join/:groupId', auth, groupController.joinGroup);

module.exports = router;