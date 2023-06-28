const express = require("express");
const axios = require("axios");
const { v4: uuid } = require("uuid");

require("dotenv").config();

const PORT = 8110;
const app = express();

const SCB_TOKEN =
  "https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token";
const SCB_AUTHORIZE =
  "https://api-sandbox.partners.scb/partners/sandbox/v2/oauth/authorize";
const SCB_QRCODE =
  "https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create";
const applicationKey = process.env.API_KEY;
const applicationSecret = process.env.API_SECRET;

app.use(express.json());

app.get("/healthcheck", (req, res) => {
  res.send("Hello, world");
});

app.get("/payment", async (req, res) => {
  try {
    const requestUId = uuid();

    // request access token from SCB
    const scb_response = await axios.post(
      SCB_TOKEN,
      {
        applicationKey: applicationKey,
        applicationSecret: applicationSecret,
      },
      {
        headers: {
          resourceOwnerId: applicationKey,
          requestUId: requestUId,
        },
      }
    );
    const res_data = scb_response.data;
    res.send(res_data);
  } catch (e) {
    console.error(e.message);
  }
});

app.get("/qrcode", async (req, res) => {
  try {
    const requestUId = uuid();

    // request access token from SCB
    const token_response = await axios.post(
      SCB_TOKEN,
      {
        applicationKey: applicationKey,
        applicationSecret: applicationSecret,
      },
      {
        headers: {
          resourceOwnerId: applicationKey,
          requestUId: requestUId,
        },
      }
    );

    const token = token_response.data;

    const qrcode_response = await axios.post(
      SCB_QRCODE,
      {},
      {
        headers: {
          authorization: token,
          resourceOwnerId: applicationKey,
          requestUId: requestUId,
        },
      }
    );
  } catch (e) {
    console.error(e.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
