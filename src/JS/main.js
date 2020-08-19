const {app, BrowserWindow, Menu} = require('electron')
require('firebase');
function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1280,
        height: 1024,
        webPreferences: {
            nodeIntegration: true
        },
        options: {
            fullscreen: true
        },
        darkTheme: false,
        //frame: false,
    })
    // Disable default menubar
    win.removeMenu(null);//For Windows and Linux only

    // Browser Window to be maximize (a.k.a "Fullscreen")
    //win.maximize();

    //Set Browser Window be not resizable
    win.setResizable(false);

    //Set Browser Window be not maximizable
    win.setMaximizable(false);

    //Customize Menubar
    const menu = Menu.buildFromTemplate([
        // Empty Menu
    ]);

    // Set The Menu To Customize Menubar (Expected: Nothing)
    Menu.setApplicationMenu(menu);

    // and load the index.html of the app.
    win.loadFile('./src/HTML/index.html')

    // Open the DevTools.
    win.webContents.openDevTools()
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 有些 API 只能在這個事件發生後才能用。
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // 在 macOS 中，一般會讓應用程式及選單列繼續留著，
    // 除非使用者按了 Cmd + Q 確定終止它們
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在 macOS 中，一般會在使用者按了 Dock 圖示
    // 且沒有其他視窗開啟的情況下，
    // 重新在應用程式裡建立視窗。
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. 
// 你也可以將它們放在別的檔案裡，再由這裡 require 進來。
