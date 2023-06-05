const express = require("express");
const axios = require("axios");
const { v4: uuid } = require("uuid");

require('dotenv').config();

const PORT = 8110;
const app = express();

const SCB_TOKEN = 'https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token'
const SCB_AUTHORIZE = 'https://api-sandbox.partners.scb/partners/sandbox/v2/oauth/authorize'
const applicationKey = process.env.API_KEY;
const applicationSecret = process.env.API_SECRET;

app.use(express.json());

app.get('/healthcheck', (req, res) => {
  res.send("Hello, world");
})

// test axios
app.get("/fetch-data", async (req, res) => {
  try {
    const response = await axios.get('http://localhost:8220/');
    const message = response.data.message;
    res.send(message);
  } catch (e) {
    console.error(e.message);
  }
});

app.get("/access-token", async (req, res) => {
  try {
    const requestUId = uuid();
    const token_response = await axios.post(SCB_TOKEN,
    {
      applicationKey: applicationKey,
      applicationSecret: applicationSecret,
    },
    {
      headers: {
        resourceOwnerId: applicationKey,
        requestUId: requestUId,
      }
    });
    res.send(token_response);
  } catch (e) {
    console.error(e.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
