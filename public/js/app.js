const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const massageOne = document.querySelector('#massage-1')
const massageTwo = document.querySelector('#massage-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    massageOne.textContent = 'Loading...'
    massageTwo.textContent = ''

    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location)
    fetch( url ).then((response) => {
        response.json().then(({ error, location, forecast } = data) => {
            if (error) {
                massageOne.textContent = error
            } else {
                massageOne.textContent = location
                massageTwo.textContent = forecast
            }
        })
    })
})