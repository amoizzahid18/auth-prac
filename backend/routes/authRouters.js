const router = require('express').Router();

router.get('/login', (req, res) => {
    res.send('Login page route');
});



module.exports = router;