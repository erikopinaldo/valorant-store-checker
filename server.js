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
const express = requires('express');
const app = express();
const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
    const page = url.parse(req.url).pathname;
    console.log(page);
    
    if (page == '/') {
      fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }
    else if (page == '/api/result') {
      const client = new API(Regions.NorthAmerica);
      const content = new ContentAPI(Languages.English);
      
      res.writeHead(200, {'Content-Type': 'application/json'});
      
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
            res.end(JSON.stringify(itemJson));
          })
        })
        .catch((error) => {
              console.log(error);
        }) 
    }
    else if (page == '/css/style.css'){
      fs.readFile('css/style.css', function(err, data) {
        res.write(data);
        res.end();
      });
    }else if (page == '/js/main.js'){
      fs.readFile('js/main.js', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(data);
        res.end();
      });
    }else{
      figlet('404!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(page)
        res.write(data);
        res.end();
      });
    }
  });
  
  server.listen(8000);