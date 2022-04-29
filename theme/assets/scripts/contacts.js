(async () => {
	const contactsBlock = document.getElementById('contactsBlock')

	window.ipcEvents.onContacts((event, data) => {
		var contactsList = []

		const contacts = [...data]
		contacts.map(contact => {
			contactsList.push(`
				<p class="d-flex justify-content-between">
					${ contact.formattedName } 
					<a href="#" class="text-dark btn-send"
						data-wpp="${ contact.id._serialized }"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
					</a>
				</p>
			`)
		})	

		contactsBlock.innerHTML = contactsList.join('')

		const btnsSend = document.querySelectorAll('.btn-send')
		btnsSend.forEach(btnSend => {
			btnSend.onclick = function(event) {
				event.preventDefault()

				const wpp = this.dataset.wpp

				window.ipcEvents.onMessage({
					wpp: '5521998912078@c.us',
					message: 'e aqui ficará o conteúdo da mensagem...'
				})
			}
		})
	})
})()