# macOS Volume Control Backend

A minimal, secure Node.js backend to control your Mac's system volume over a local Wi-Fi network. This allows you to use devices like your iPhone (via Shortcuts or any HTTP client) to remotely adjust the volume of your Mac.

## Features

- **Get Volume**: Check current volume level and mute status.
- **Set Volume**: Set a specific volume level (0-100).
- **Adjust Volume**: Increase or decrease volume by 1 step.
- **Mute Control**: Mute or unmute the system.
- **Secure**: Uses token-based authentication to prevent unauthorized access on your local network.
- **Rate Limited**: Protects against spamming volume changes.
- **No Extra Permissions**: Uses native macOS AppleScript commands (`osascript`), so it doesn't require invasive Accessibility or Screen Sharing permissions.

## Setup Instructions

### 1. Requirements

- Node.js (v14+ recommended)
- A macOS computer

### 2. Installation

Clone or download this repository, then install the dependencies:

```bash
cd mac-control-backend
npm install
```

### 3. Configuration

Create a `.env` file based on the example:

```bash
cp .env.example .env
```

Open the `.env` file and set a secure `API_TOKEN`. This token will act as your password when making requests from other devices.

```env
PORT=3000
API_TOKEN=your_super_secret_token_here
```

### 4. Running the Server

Start the server:

```bash
npm start
```

For development with auto-reloading:

```bash
npm run dev
```

The server will start on `http://0.0.0.0:3000`, meaning it is accessible to other devices on your local Wi-Fi network.

## How to use from another device (e.g., iPhone)

1. Find your Mac's local IP address:
   - Go to System Settings > Network > Wi-Fi (or your active connection).
   - Look for the IP address (usually looks like `192.168.x.x` or `10.0.x.x`).

2. Send HTTP requests to your Mac's IP address. Make sure to include the `Authorization` header.

### API Endpoints

**Base URL**: `http://<YOUR_MAC_IP>:3000/api/volume`
**Headers Required**: `Authorization: Bearer <YOUR_API_TOKEN>`

#### Get Current Volume
```bash
curl -H "Authorization: Bearer test_token_123" http://localhost:3000/api/volume
# Response: {"volume": 50, "muted": false}
```

#### Set Volume
```bash
curl -X POST -H "Authorization: Bearer test_token_123" -H "Content-Type: application/json" -d '{"volume": 75}' http://localhost:3000/api/volume
```

#### Increase Volume
```bash
curl -X POST -H "Authorization: Bearer test_token_123" http://localhost:3000/api/volume/up
```

#### Decrease Volume
```bash
curl -X POST -H "Authorization: Bearer test_token_123" http://localhost:3000/api/volume/down
```

#### Set Mute
```bash
curl -X POST -H "Authorization: Bearer test_token_123" -H "Content-Type: application/json" -d '{"muted": true}' http://localhost:3000/api/volume/mute
```

### Creating an iOS Shortcut

You can easily create an iOS Shortcut to control your Mac's volume:
1. Open the **Shortcuts** app on your iPhone.
2. Add a new shortcut.
3. Add the **"Get contents of URL"** action.
4. Set the URL to `http://<YOUR_MAC_IP>:3000/api/volume/up` (or any other endpoint).
5. Tap the arrow to expand the action details.
6. Change the **Method** to `POST`.
7. Add a new **Header**:
   - Key: `Authorization`
   - Text: `Bearer your_super_secret_token_here`
8. Save and run the shortcut!
