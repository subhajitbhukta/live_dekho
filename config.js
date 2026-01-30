module.exports = {
  mediasoup: {
    worker: {
      rtcMinPort: 40000,
      rtcMaxPort: 49999,
    },
    router: {
      mediaCodecs: [
        {
          kind: "video",
          mimeType: "video/VP8",
          clockRate: 90000,
        }
      ]
    },
    webRtcTransport: {
      listenIps: [{ ip: "127.0.0.1", announcedIp: null }],
      enableUdp: true,
      enableTcp: true,
      preferUdp: true
    }
  }
};
