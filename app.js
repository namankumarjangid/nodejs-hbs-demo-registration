const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const hbs = require('hbs');
const bcrypt = require('bcryptjs');

require('./db/conn')
const Register = require('./models/registers');

const static_path = path.join(__dirname, "./public");
const templates_path = path.join(__dirname, "./templates/views");
const partials_path = path.join(__dirname, "./templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get("", (req, res) => {
    res.render("index")
});

app.get("/login", (req, res) => {
    res.render("login")
});
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await Register.findOne({ email: email });
        // res.send(userEmail);

        const isMatch = await bcrypt.compare(password, userEmail.password);

        if (isMatch) {
            res.status(201).render("index");
        } else {
            res.send("invalid Login details");
        }

    } catch (error) {
        res.status(400).send("invalid email")
    }
});

app.get("/register", (req, res) => {
    res.render("register")
});
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        

        if (password === cpassword) {
            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: password,
                confirmpassword: cpassword
            })

            const registered = await registerEmployee.save();
            res.status(201).render("index");
        } else {
            res.send("password not match")
        }
    } catch (error) {
        console.log(error);
    }
    // res.render("register")
});

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});

