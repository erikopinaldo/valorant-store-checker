// https://github.com/liamcottle/valorant.js

// Config
require('dotenv').config();

// Import valorant modules
const { API, ContentAPI, Languages, Regions } = require("@liamcottle/valorant.js");
const Valorant = require('@liamcottle/valorant.js');
const valorantApi = new Valorant.API('NA');
const riotUser = process.env.RIOT_USER;
const riotPass = process.env.RIOT_PASS;

// Import express modules
const express = require('express');
const app = express();

// Set template engine to ejs
app.set('view engine', 'ejs')

// Serve static files in the public directory
app.use(express.static('public'))

// Page routing
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
        const contents = await content.getWeaponSkinLevelByUuid(skin);
        skinArr.push(contents)
      }

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

app.listen(8000, () => {
  console.log('listening on 8000')
})