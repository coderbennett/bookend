const router = require('express').Router();

router.get("/", (req, res) =>
{
    res.json({ message: "Route hit!" });
});

module.exports = router;