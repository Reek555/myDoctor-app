const express = require('express'); 
const app = express();
const cors  = require("cors")
require("dotenv").config()
const morgan = require('morgan')
const jwt = require("jsonwebtoken");
const registerRouter  = require ("./routers/register")
const loginRouter  = require ("./routers/login")
const meRouter = require("./routers/me")
const searchRouter = require("./routers/search")
const editRouter = require("./routers/edit")
const deleteRouter = require("./routers/delete")







app.use(cors())
app.use(express.json()); 
app.use(morgan('tiny'));

app.get("/", (req, res) => {
    res.send("this is home page")
})

app.use('/register', registerRouter)
app.use('/login', loginRouter)



app.use((req, res, next) => {
    try {
        let token = req.headers["authorization"]
        let payload = jwt.verify(token, process.env.SECRET);
        req.currentUser = payload;
        next()
    }
    
    catch (err){
        console.log(err)
        res.status(401).send("unauthorized")
    }
})

app.use("/me", meRouter)

app.use("/search", searchRouter)

app.use("/edit", editRouter)

app.use("/delete", deleteRouter)





app.listen(process.env.PORT || "3000", () =>{console.log ('server is running')})