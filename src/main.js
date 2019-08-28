const { app, BrowserWindow } = require('electron');

///////////////////////////////////////////////////////
///   Some potential changes to make loading work   ///
///////////////////////////////////////////////////////

// Recommended on opencv-electron for windows
// if (process.platform === 'win32' && !process.env.OPENCV4NODEJS_DISABLE_AUTOBUILD) {
//   process.env.path += ';' + require('../renderer/node_modules/opencv-build').opencvBinDir
// }

// Hacks to make opencv4nodejs detect electron
// https://github.com/justadudewhohacks/opencv4nodejs/blob/4425af57cada1753d13c7f4bbd3fe562e9d85985/lib/opencv4nodejs.js#L4-L11
// https://github.com/electron/electron/issues/2288
delete process.env.path;
global.window = {
  process,
};
global.navigator = {
  userAgent: ' electron/'
};
const cv = require('opencv4nodejs');

///////////////////////
///   End changes   ///
///////////////////////

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
