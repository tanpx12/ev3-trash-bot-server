const mqtt = require("mqtt");
const express = require("express");
const app = express();
var cors = require("cors");

app.use(cors());

const host = "localhost";
const port = "1883";
const clientID = "tan";
const topic = "server/msg";
const connectURL = `mqtt://${host}:${port}`;

const client = mqtt.connect(connectURL, {
  clientID,
  clean: true,
  connectTimeout: 4000,
  username: "tan",
  reconnectPeriod: 1000,
});

client.on("connect", () => {
  console.log("connected");
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic ${topic}`);
  });
  // client.publish(
  //   topic,
  //   "nodejs mqtt test",
  //   { qos: 0, retain: false },
  //   (err) => {
  //     if (err) console.log(err);
  //   }
  // );
});

client.on("message", (topic, payload) => {
  console.log("Received Message: ", topic, payload.toString());
});

app.post("/command", (req, res) => {
  const { direction } = req.query;

  switch (direction) {
    case "1":
      console.log("turn left");
      client.publish(topic, "turn left", { qos: 0, retain: false }, (err) => {
        if (err) console.log(err);
      });
      break;
    case "2":
      console.log("turn right");
      client.publish(topic, "turn right", { qos: 0, retain: false }, (err) => {
        if (err) console.log(err);
      });
      break;
    case "3":
      console.log("go forward");
      client.publish(topic, "go forward", { qos: 0, retain: false }, (err) => {
        if (err) console.log(err);
      });
      break;
    case "4":
      console.log("go back");
      client.publish(topic, "go back", { qos: 0, retain: false }, (err) => {
        if (err) console.log(err);
      });
      break;
    default:
      break;
  }
  return res.status(201).json({ success: true });
});

app.listen(5000, () => {
  console.log("server is listening on port 5000 ...");
});
