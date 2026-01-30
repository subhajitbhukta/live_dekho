# MediaSoup Live Streaming Application

A real-time live streaming application built with Node.js, WebSockets (Socket.io), and MediaSoup for local testing.

## Features

- **Live Broadcasting**: Stream video and audio from your webcam/microphone
- **Real-time Viewing**: Multiple viewers can watch the live stream simultaneously
- **WebRTC Technology**: Uses MediaSoup for efficient media streaming
- **Modern UI**: Clean, responsive interface with real-time status updates
- **Local Testing Ready**: Configured for localhost development

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A modern web browser (Chrome, Firefox, Edge recommended)
- Webcam and microphone (for broadcasting)

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

### Broadcasting

1. Click the **"Start Broadcasting"** button in the Broadcaster section
2. Allow camera and microphone permissions when prompted
3. Your video stream will appear in the local video player
4. The status will change to "Broadcasting"
5. Click **"Stop Broadcasting"** to end the stream

### Viewing

1. Open the same URL in another browser window/tab or different device on the same network
2. Click the **"Start Viewing"** button in the Viewers section
3. You'll see all active streams appear in the viewers grid
4. Click **"Stop Viewing"** to stop watching

## Testing Locally

### Single Computer Testing

1. Open `http://localhost:3000` in one browser tab (Broadcaster)
2. Open `http://localhost:3000` in another tab (Viewer)
3. Start broadcasting in the first tab
4. Start viewing in the second tab

### Multiple Devices on Same Network

1. Find your local IP address:
   - Windows: `ipconfig` (look for IPv4 Address)
   - Mac/Linux: `ifconfig` or `ip addr` (look for inet)

2. On the broadcasting device:
   - Open `http://localhost:3000`
   - Start broadcasting

3. On viewing devices:
   - Open `http://[YOUR_IP]:3000` (e.g., `http://192.168.1.100:3000`)
   - Start viewing

## Configuration

Edit `config.js` to customize:

- **RTC Port Range**: Adjust `rtcMinPort` and `rtcMaxPort`
- **Media Codecs**: Add/remove video/audio codecs
- **Bitrate Settings**: Modify `maxIncomingBitrate` and initial bitrate

### For Production Deployment

When deploying to a server, update `config.js`:

```javascript
webRtcTransport: {
  listenIps: [
    {
      ip: '0.0.0.0',
      announcedIp: 'YOUR_PUBLIC_IP_HERE', // Replace with your server's public IP
    },
  ],
  // ... rest of config
}
```

## Project Structure

```
mediasoup-live-streaming/
├── server.js           # Main server file with MediaSoup setup
├── config.js           # MediaSoup configuration
├── package.json        # Dependencies
├── public/
│   ├── index.html     # Main HTML interface
│   └── client.js      # Client-side MediaSoup logic
└── README.md          # This file
```

## Troubleshooting

### Camera/Microphone Not Working

- Ensure you've granted permissions in your browser
- Check that no other application is using the camera
- Try a different browser

### Connection Issues

- Make sure the server is running (`npm start`)
- Check that port 3000 is not in use by another application
- Verify firewall settings allow connections on port 3000

### Video Not Appearing for Viewers

- Ensure broadcasting has started before viewing
- Check browser console for errors (F12)
- Verify both broadcaster and viewer are connected (check status)

### HTTPS Warning

For local testing, HTTP is fine. For production, you'll need:
- SSL/TLS certificate
- Update server.js to use HTTPS
- Update client connections accordingly

## Logs

The broadcaster section includes a real-time log viewer showing:
- Connection status
- Producer/consumer creation
- Transport connections
- Errors and warnings

## Browser Compatibility

Tested and working on:
- Chrome/Chromium (Recommended)
- Firefox
- Edge
- Safari (limited support)

## Performance Tips

- Use Chrome for best performance
- Close unnecessary browser tabs
- Ensure stable network connection
- Adjust video resolution in `client.js` if needed

## Next Steps for Production

1. **Add HTTPS**: Required for WebRTC in production
2. **Authentication**: Add user authentication
3. **Database**: Store stream metadata
4. **Scalability**: Implement load balancing
5. **Recording**: Add stream recording capability
6. **Chat**: Integrate real-time chat
7. **Analytics**: Track viewer counts and stats

## License

MIT

## Support

For issues or questions, check the logs in the browser console (F12) for detailed error messages.
