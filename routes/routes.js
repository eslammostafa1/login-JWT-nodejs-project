import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
        res.redirect("login")
})

router.get('/signup', (req, res) => {
    res.render("signup" )
})

router.get('/login', (req, res) => {
    res.render("login" )
})

export default router;
