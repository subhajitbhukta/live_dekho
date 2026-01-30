import * as mediasoupClient from "mediasoup-client";

console.log("producer.js loaded");

const socket = new WebSocket("wss://live-dekho.onrender.com");


let device;
let transport;

const videoEl = document.getElementById("video");
const startBtn = document.getElementById("startBtn");

socket.onopen = () => {
  socket.send(JSON.stringify({ type: "getRtpCapabilities" }));
};

socket.onmessage = async ({ data }) => {
  const msg = JSON.parse(data);

  if (msg.type === "rtpCapabilities") {
    device = new mediasoupClient.Device();
    await device.load({ routerRtpCapabilities: msg.data });

    socket.send(JSON.stringify({
      type: "createTransport",
      role: "producer"
    }));
  }

  if (msg.type === "transportCreated") {
    transport = device.createSendTransport(msg.params);

    transport.on("connect", ({ dtlsParameters }, cb) => {
      socket.send(JSON.stringify({
        type: "connectTransport",
        role: "producer",
        dtlsParameters
      }));
      cb();
    });

    transport.on("produce", ({ rtpParameters }, cb) => {
      socket.send(JSON.stringify({
        type: "produce",
        rtpParameters
      }));
      cb();
    });

    startBtn.onclick = async () => {
      console.log("Start button clicked");

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoEl.srcObject = stream;

      await transport.produce({
        track: stream.getVideoTracks()[0]
      });
    };
  }
};
