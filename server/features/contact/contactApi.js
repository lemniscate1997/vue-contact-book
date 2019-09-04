const router = express.Router();
const validator = require('express-joi-validator');

const { idSchema } = require('../../utils/schema');
const ContactController = require('./contactRepository');

router.route('/getAll').get(ContactController.getAll);
router.route('/get/:id').get(ContactController.get);
router.route('/create').post(ContactController.create);
router.route('/update/:id').put(ContactController.update);
router.route('/remove/:id').delete(ContactController.remove);

module.exports = router;