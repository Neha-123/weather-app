// const { response } = require("express");

console.log('Js file running from Client side');



const form = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

form.addEventListener('submit', e => {
    e.preventDefault();

    const queryAddress = input.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address='+queryAddress).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else if (data.Error) {
                messageOne.textContent = data.Error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = data.forecast;
                messageTwo.textContent = data.location;
            }

        })
    })
})