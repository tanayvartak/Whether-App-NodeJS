

console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const searchlocation = search.value
    message1.textContent='Loading weather...'
    message2.textContent=''
    fetch('http://localhost:3000/whether?address='+searchlocation).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           return message1.textContent=data.error
        }
        else{
            message1.textContent=data.location
            message2.textContent=data.forecast
        }
    })
})
})
