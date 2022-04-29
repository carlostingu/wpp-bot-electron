const {
    BrowserWindow,
    ipcMain
} = require('electron')

const path = require('path')

const wpp = require('../../tools/wpp')

const contacts = require('../contacts/index')

module.exports = function () {
    const home = new BrowserWindow({
        width: 1024,
        height: 550,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    home.menuBarVisible = false

    home.loadFile('./theme/views/home.html')

    ipcMain.on('showContacts', () => {
        contacts()
    })

    const window = home.webContents

    window.once('dom-ready', async () => {
        global.wppSession = await wpp('session', (qrCode) => {
            window.send('onQrCode', qrCode)
        }, (status) => {
            window.send('onStatus', status)
        })
    })
}