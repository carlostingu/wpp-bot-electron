const {
    contextBridge,
    ipcRenderer
} = require('electron')

contextBridge.exposeInMainWorld('ipcEvents', {
    onStatus: (callback) => {
        ipcRenderer.on('onStatus', callback)
    },
    onQrCode: (callback) => {
        ipcRenderer.on('onQrCode', callback)
    },
    showContacts: () => {
        ipcRenderer.send('showContacts')
    }
})