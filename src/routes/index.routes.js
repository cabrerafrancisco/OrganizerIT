const { Router } = require('express')

const router = Router();
const { renderIndex , renderEstudiar} = require('../controllers/index.controller')

router.get('/', renderIndex )

router.get('/estudiar', renderEstudiar )
module.exports = router;