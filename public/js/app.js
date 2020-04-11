const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')
const msg3 = document.querySelector('#msg-3')


weatherForm.addEventListener('submit', (e) =>{
	e.preventDefault()
	const location = search.value
	url = '/weather?add=' + location
	
	msg1.textContent = 'Loading....'
	msg2.textContent = ''
	msg3.textContent = ''
	fetch(url).then((response) => {
		response.json().then((data) => {
			if (data.Error){
				msg1.textContent = data.Error
			} else {
				msg1.textContent = 'Location: ' + data.Location
				msg2.textContent = 'Temperature: ' + data.Temp + ' degrees'
				msg3.textContent = 'Summary: ' + data.Summary + "."
			}
		})
	})
})