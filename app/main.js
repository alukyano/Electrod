"use strict"

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
// Module to create tray icon
const Tray = electron.Tray 
// Module to create context meny for tray icon
const Menu = electron.Menu 

const shell = electron.shell
const path = require('path')
const url = require('url')
const nconf = require('nconf')
const autoLaunch = require('auto-launch');


//require('app-module-path').addPath(__dirname);
//const config = require('./config/config.json')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, settingsWindow, tray, contextMenu

function createTray () {
  //create tray icon
  tray = new Tray(path.join(__dirname, 'tray/apple2.png'))
      
  //Create context menu
  contextMenu = Menu.buildFromTemplate([
      {label: "Open iCloud", click() { 
          if ( mainWindow == null ) { createWindow() }
      }},
      {label: "Notes", click() { openNotes() }},
      //{label: "Numbers", click() { openNumbers() }},            ,
      {label: "Settings", click() { openSettings() }},
      {label: "Quit", click() { app.quit() }},
      {type: "separator"},
      {label: "GitHub", click() {
          shell.openExternal('https://github.com/alukyano/electrod')
      }}
  ])

  tray.setContextMenu(contextMenu)
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 900, height: 700, show: true, frame: true, webPreferences: { nodeIntegration: false, zoomFactor: 0.9 }});

  // and load the index.html of the app.
  mainWindow.loadURL(`https://www.icloud.com`)


  //hide the default menu
  mainWindow.setMenu(null)
  
  //prevent window title changing
  mainWindow.on('page-title-updated', event => {
      event.preventDefault()
  })
  
  //when contents are loaded, show main window 
  mainWindow.once('ready-to-show', () => {
      mainWindow.show()
  }) 
  
  // Emitted when the window is closed.
  mainWindow.on('close', function () {
    if (mainWindow !== null ) { mainWindow = null }
})

mainWindow.webContents.on('new-window', (event, url) => {
  // stop Electron from opening another BrowserWindow
  event.preventDefault()
  // open the url in the default system browser
  var urlDest = url.split('=')[1]
  shell.openExternal(decodeURIComponent(urlDest))

})}

function openSettings () {
  settingsWindow = new BrowserWindow({width: 850, 
                                height: 650, 
                                webPreferences: {nodeIntegration: false}})
  settingsWindow.loadURL('https://www.icloud.com/#settings')
  
  settingsWindow.on('page-title-updated', event => {
      event.preventDefault()
  })
  
  settingsWindow.setMenu(null)
}

function openNotes () {
  settingsWindow = new BrowserWindow({width: 850, 
                                height: 650, 
                                webPreferences: {nodeIntegration: false}})
  settingsWindow.loadURL('https://www.icloud.com/#notes2')
  
  settingsWindow.on('page-title-updated', event => {
      event.preventDefault()
  })
  
  settingsWindow.setMenu(null)
}

function openNumbers () {
  settingsWindow = new BrowserWindow({width: 850, 
                                height: 650, 
                                webPreferences: {nodeIntegration: false}})
  settingsWindow.loadURL('https://www.icloud.com/#numbers')
  
  settingsWindow.on('page-title-updated', event => {
      event.preventDefault()
  })
  
  settingsWindow.setMenu(null)
}

function startApp () {
  createTray()
  createWindow()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', startApp)


app.on('activate', function () {
  if (mainWindow === null) {
    startApp()
  }
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
