const puppeteer = require("puppeteer");
//const parent = await page.$eval('div[class=bkWMgd]', result => result);
//const parent = await page.$eval('div[class=LC20lb DKV0Md]', result => result);
//parent = parent.querySelector('div[class=g]');
////const title = parent.querySelector('div[class=rc] > div[class=r] > a >  h3').innerText
//const url = parent.querySelector('div[class=rc] > div[class=r] > a').href;
//const desc = parent.querySelector('div[class=rc] > div[class=s] > div > span[class=st]').innerText;
//


//
/*
const searchResults = await page.$$eval('div[class=LC20lb DKV0Md]', results => {
    //Array to hold all our results
    let data = [];

    results.forEach(parent => {
        const ele = parent.querySelector("h3");

        if(ele === null){
            return;
        }
    
    let gCount = parent.querySelector('div[class=g]');

    if (gCount.length === 0) {
        gCount = parent.querySelectorAll('div[class=srg]')
    }
    //Iterate over all the divs with class 'g'
    gCount.forEach(result => {
        //Target the title
        const title = result.querySelector('div[class=rc] > div[class=r] > a >  h3').innerText;

        //Target the url
        const url = result.querySelector('div[class=rc] > div[class=r] > a').href;

        //Target the description
        const desciption = result.querySelector('div[class=rc] > div[class=s] > div > span[class=st]').innerText;

        //Add to the return Array
        data.push({title, desciption, url});
    })
    })
    return data;

})
*/

const searchGoogle = async(searchQuery) =>{
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    
    await page.goto("https://www.google.co.uk/");

    //the input element on google is q for the search bar
    await page.type('input[name="q"]', searchQuery);

    //finds the search button 
    await page.$eval('input[name="btnK"]', button => button.click())

    await page.waitForSelector('div[id=search]');

    //google code ------------------------------------------------------------------------------------------------------------------------------------
    const searchResults = await page.$$eval('div[class=mw]', results => {
        //Array to hold all our results
        let data = [];

        results.forEach( parent => {
            const ele = parent.querySelector('h2');
            if (ele === null) {
                data.push("Line 72")
                return;
            }
            let colCount = parent.querySelectorAll('div[class=col]');
            
            colCount.forEach(result => {
                const title = result.querySelector('div[class=g] > div[class=rc] > div[class=yuRUbf] > a').href;
                data.push({title})
            })
            
        })
        return data
    })
            //Check if parent has h2 with text 'Web Results'
            //const ele = parent.querySelector('h2');
        //let gCount = results.querySelectorAll('div[class=g]');
/*
        for (let i = 0; i < 5; i++) {
            //Target the title
            const title = result.querySelector('div[class=rc] > div[class=yuRUbf] > div[class=LC20lb DKV0Md] > span').innerText;

            //Target the url
            const url = result.querySelector('div[class=rc] > div[class=yuRUbf] > a').href;

            //Target the description
            const hello = "Hello"

            //Add to the return Array
            data.push({title, url, hello});

        }
        return data;
        */
        //Iterate over all the results
        //results.forEach(parent => {
    
            //Check if parent has h2 with text 'Web Results'
            //const ele = parent.querySelector('h2');
    
            //If element with 'Web Results' Title is not found  then continue to next element
           // if (ele === null) {
                //console.log("Hello line 77 is wrong")
               // return;
            
            //Check if parent contains 1 div with class 'g' or contains many but nested in div with class 'srg'
            
    
            //If there is no div with class 'g' that means there must be a group of 'g's in class 'srg'
           
            //Iterate over all the divs with class 'g'
            
        
        
    
    //end of google code ---------------------------------------------------------------------------------------------------------------------------------



    //this was only for test purposes remove for final version
    //await page.screenshot({path: "example.png"});


    await browser.close();

    return searchResults
}

module.exports = searchGoogle;

//searchGoogle("Micheal jackson")