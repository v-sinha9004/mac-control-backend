# macOS Volume Control Backend

A minimal, secure Node.js backend to control your Mac's system volume over a local Wi-Fi network. It broadcasts a Bonjour service (`mac-control-api.local`), making it extremely easy to access from a frontend app without needing to know your Mac's IP address.

## Features
- **Zero Configuration Discovery**: Uses Bonjour (`mac-control-api.local`) so your IP address doesn't matter.
- **Native Commands**: Uses native macOS `osascript`, requiring no invasive accessibility permissions.
- **Secure & Rate-Limited**: Protected by a token and rate limiter.
- **API Endpoints**: Get volume, set volume, increase, decrease, mute/unmute.

## Setup & Running

1. **Install Dependencies**
   ```bash
   cd mac-control-backend
   npm install
   ```

2. **Configuration**
   Create a `.env` file:
   ```bash
   cp .env.example .env
   ```
   Set your `API_TOKEN`. (You can optionally change `PORT`, but it defaults to 3000).

3. **Start the Server**
   ```bash
   npm run dev
   ```

## How to Access

Once the backend is running alongside the frontend (`mac-control-frontend`), you are good to go!

Simply open Safari on your iPhone (connected to the same Wi-Fi) and go to:
**`http://mac-control-api.local:5173`**

You will be prompted to enter your `API_TOKEN`. After that, you can control your Mac's volume seamlessly! 

*(Note: The backend API runs at `http://mac-control-api.local:3000` by default, and the frontend communicates with it automatically).*
