
const express = require('express');
const cors = require('cors');
require("dotenv").config()

const db = require('./db');

const dnsrouter = require('./routes/dnsRoutes');
const { UserRouter } = require('./routes/authRoutes');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', UserRouter);
app.use('/api', dnsrouter);
app.get("/", (req, res) => {
   res.send("home")
})
const PORT = process.env.PORT || 7999;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
