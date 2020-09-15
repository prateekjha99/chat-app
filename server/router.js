const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('Server running');
});

module.exports = router;