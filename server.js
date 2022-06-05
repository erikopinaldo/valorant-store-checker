// https://github.com/liamcottle/valorant.js

// // Config
// require('dotenv').config();

// const cors = require('cors')
// app.use(cors())

const PORT = 8000

// Import valorant modules
const { API, ContentAPI, Languages, Regions } = require("@liamcottle/valorant.js");
const Valorant = require('@liamcottle/valorant.js');
const valorantApi = new Valorant.API('NA');
const riotUser = process.env.RIOT_USER;
const riotPass = process.env.RIOT_PASS;

// Import express modules
const express = require('express');
const app = express();

// Set template engine to ejs. This is done so that the server can server ejs files to be rendered by the client
app.set('view engine', 'ejs')

// Serve static files like style.css and main.js in the public directory
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
      
      // Get an array of storefront items
      const skins = response.data.SkinsPanelLayout.SingleItemOffers
      
      // Empty array to catch individual skin data
      let skinArr = []
      
      // Loop through array of storefront items, grab skin content, and push to new array
      for (skin of skins) { 
        const contents = await content.getWeaponSkinLevelByUuid(skin);
        skinArr.push(contents)
      }

      return skinArr
    })
    .then(response => {
      const itemJson = {
        result: response
      }
      
      // Log response to client before it is sent
      console.log(itemJson)

      // Second argument, itemJson, is now an accessible variable by index.ejs
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

app.listen(process.env.PORT || PORT, () => {
  console.log('listening on 8000')
})