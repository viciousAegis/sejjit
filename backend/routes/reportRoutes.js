const express = require('express');

const { createReport, getReports, blockUser, ignoreReport, deleteReport } = require('../controllers/reportControllers');
const { protect } = require('../middlewares/authMiddlewares');

const router = express.Router();

router.route('/create/:id').post(protect, createReport);
router.route('/block/:sub').post(protect, blockUser);
router.route('/ignore/:id').put(protect, ignoreReport);
router.route('/delete/:id').delete(protect, deleteReport);
router.route('/:sub').get(protect, getReports);

module.exports = router;