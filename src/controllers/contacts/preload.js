const {
    contextBridge,
    ipcRenderer
} = require('electron')

contextBridge.exposeInMainWorld('ipcEvents', {
    onContacts: (callback) => {
        ipcRenderer.once('onContacts', callback)
    },
    onMessage(data) {
        ipcRenderer.send('onMessage', data)
    }
})