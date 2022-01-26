console.log('Client side java script file is loaded!')

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const massageOne = document.querySelector('#massage-1')
const massageTwo = document.querySelector('#massage-2')

// massageOne.textContent = 'dd'

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