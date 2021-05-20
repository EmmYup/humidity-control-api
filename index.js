import functions from "firebase-functions";

import admin from "firebase-admin";

import express from "express";

admin.initializeApp(functions.config().firebase);

const app = express();

const main = express();

main.use("/Myapi", app);

main.use(express.json());

main.use(express.urlencoded({ extended: false }));

const db = admin.firestore();

export const webApi = functions.https.onRequest(main);

app.get("/", (req, res) => {
  res.json({ message: "Humidity and temparature control API v0.0.0" });
});

app.get("/humidity", async (req, res) => {
  const humidityHistory = await db.collection("humidity");
  res.json(humidityHistory);
});
