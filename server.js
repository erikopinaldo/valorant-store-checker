// https://github.com/liamcottle/valorant.js

// Config
require('dotenv').config();

// import valorant modules
const { API, ContentAPI, Languages, Regions } = require("@liamcottle/valorant.js");
const Valorant = require('@liamcottle/valorant.js');
const valorantApi = new Valorant.API('NA');
const riotUser = process.env.RIOT_USER;
const riotPass = process.env.RIOT_PASS;

//import server modules
const express = require('express');
const app = express();
const figlet = require('figlet')

// Set rendering engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.listen(8000, () => {
  console.log('listening on 8000')
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/api/result', (req, res) => {
  const client = new API(Regions.NorthAmerica);
  const content = new ContentAPI(Languages.English);
  
    // authorize using the ClientAPI
    client.authorize(riotUser, riotPass)
    .then(() => {
      client.getPlayerStoreFront(client.user_id)
      .then(async (response) => {
        const skins = response.data.SkinsPanelLayout.SingleItemOffers
        let skinArr = []
        for (skin of skins) {
        // get assets for the first Skin in the Store
          const contents = await content.getWeaponSkinLevelByUuid(
              skin
          );
          skinArr.push(contents)
        }
        // log item
        console.log(skinArr)
        return skinArr
      })
      .then(response => {
        const itemJson = {
          result: response
        }
        console.log(itemJson)
        res.render('index.ejs', itemJson);
      })
    })
    .catch((error) => {
          console.log(error);
    }) 
})

// This route will handle all the requests that are 
// not handled by any other route handler. In 
// this hanlder we will redirect the user to 
// an error page with NOT FOUND message and status
// code as 404 (HTTP status code for NOT found)
app.all('*', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});