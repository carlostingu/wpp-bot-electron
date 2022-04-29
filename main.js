const {
	app
} = require('electron')

const home = require('./src/controllers/home/index')

app.whenReady().then(async () => {
	home()
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) home()
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})