const express = require('express');

const router = express.Router();

const talkerControllers = require('../controllers/talkerControllers');

const checkToken = require('../middlewares/checkToken');
const checkTalker = require('../middlewares/checkTalker');
const checkNewTalker = require('../middlewares/checkNewTalker');
const checkUpdatedTalker = require('../middlewares/checkUpdateTalker');
const checkTokenAndRate = require('../middlewares/checkTokenAndRate');
const checkTokenURLDateAndURLRate = require('../middlewares/checkTokenURLDateAndURLRate');

router.get('/', talkerControllers.getAllTalkers);
router.get('/db', talkerControllers.getAllTalkersFromDB);
router.get('/search', checkTokenURLDateAndURLRate, talkerControllers.getTalkersFromURLSearch);
router.get('/:id', checkTalker, talkerControllers.getTalkerByID);
router.post('/', checkNewTalker, talkerControllers.addNewTalker);
router.put('/:id', checkUpdatedTalker, talkerControllers.updateTalker);
router.patch('/rate/:id', checkTokenAndRate, talkerControllers.updateTalkersRatingByID);
router.delete('/:id', checkToken, talkerControllers.excludeTalkerByID);

module.exports = router;