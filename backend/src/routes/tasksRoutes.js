const express = require('express');
const router = express.Router();

router.post('/task/create', (req, res) => {
    res.send('task created');
});

export default router;