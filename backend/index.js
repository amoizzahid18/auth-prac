const express = require('express'); 
const app = express();  
require('dotenv').config(); 
const connectToDB = require('./models/db');
const cors = require('cors');   
const bodyParser = require('body-parser');  

app.use(cors({
    
}));
app.use(bodyParser.json());


const PORT = process.env.PORT || 8080;

connectToDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });    
})
.catch((error) => {
    console.log("Mongo db error\n", error);
});

app.get("/", (req, res) => {            
    res.send(`Hello from the server running on port ${PORT}`);
});