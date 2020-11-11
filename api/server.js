const express = require("express");
const puppeteer = require("puppeteer");
const server = express();
const port = 3000;

const searchGoogle = require("./searchGoogle")

//Server Routes
//Catches requesets made to 3000/search
server.get("/search", (request, response) => {
    
    //Holds value of the query param "searchquery"
    const searchQuery = request.query.searchquery;

    //Want the code to run when there is a query 
    if(searchQuery != null) {

        searchGoogle(searchQuery)
            .then(results => {
                //retunrs a 200 ok status 
                response.status(200);
                response.json(results);
            })

    }
    else{
        response.end();
    }

    //Request paramenter - informtaion about the request coming in 

    //Response parameter - reposnse object that we can use to send a response
});








//Catches requests made to local host 3000
server.get("/", (req, res) => {
    res.send("jello world")

})


//Starts the server on the port 
server.listen(port, () => console.log(`Listening to port ${port}`))





