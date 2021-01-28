const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:admin@cluster0.1ux6w.mongodb.net/userForm?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection succesfull");
}).catch((err) => {
    console.log("error ", err[0]);
});

