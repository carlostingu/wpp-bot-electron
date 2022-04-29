const {
    BrowserWindow,
	ipcMain
} = require('electron')

const path = require('path')

module.exports = function() {
	const contacts = new BrowserWindow({
		width: 300,
		height: 450,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	})

	contacts.menuBarVisible = false

	contacts.loadFile('./theme/views/contacts.html')

	ipcMain.removeAllListeners('onMessage')

	ipcMain.on('onMessage', async (event, data) => {
		try {
			await global.wppSession.sendText(data.wpp, data.message)
		} catch (error) {}
	})

	const window = contacts.webContents

	window.once('dom-ready', async () => {
		const contactsList = await global.wppSession.getAllContacts()
		
		window.send('onContacts', contactsList)
	})
}