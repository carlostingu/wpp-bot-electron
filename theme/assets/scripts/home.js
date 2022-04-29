import {
    statuses
} from './helpers.js'

(async () => {
    const statusBlock = document.getElementById('statusBlock')
    const qrCodeBlock = document.getElementById('qrCodeBlock')

    const btnShowContacts = document.getElementById('btnShowContacts')

    btnShowContacts.onclick = function (event) {
        window.ipcEvents.showContacts()
    }

    window.ipcEvents.onStatus((event, data) => {
        statusBlock.innerHTML = `
			<span class="text-muted text-uppercase">${ data.sessionName }: ${ statuses[data.sessionStatus] }</span>
		`
    })

    window.ipcEvents.onQrCode((event, data) => {
        qrCodeBlock.innerHTML = `
			<img width="350" height="350" src="${ data.base64 }">
		`
    })
})()