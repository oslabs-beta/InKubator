const { BrowserWindow } = require('electron')
const appWindow = require('electron').app;
const {app, startServer} = require('./server/express.js');

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  
  // Load the URL of the React app
  win.loadURL('http://localhost:3001');
};

appWindow.whenReady().then(() => {
  startServer(); // Start the Express server
  createWindow();
});

