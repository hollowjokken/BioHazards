'use strict'
// import request from '../node_modules/request-promise.js';
import User from './src/client/User/user.js';

const inputId = document.getElementById('input-amount');
const outputId = document.getElementById('output-amount');
const inputSelectId = document.getElementById('input-selection');
const outputSelectId = document.getElementById('output-selection');

function start() {
    const inputCurency = inputSelectId.options[inputSelectId.selectedIndex].value;
    const outputCurency = outputSelectId.options[outputSelectId.selectedIndex].value;
    const valueNumbers = inputId.value;

    let user = new User({ userName: `admin1`, email: `asd@asd.asd`, valueNumbers, inputCurency, outputCurency });
    user.showResult(outputId);
}

inputId.addEventListener("change", () => start());
inputSelectId.addEventListener("change", () => start());
outputSelectId.addEventListener("change", () => start());

function getData(theUrl, callBackFunction) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callBackFunction(xmlHttp.responseText);
        }

    }

    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send();
}

const submitBtn = document.getElementById('submit');

function callBackFunction(data) {
    console.log('data', data);
}
submitBtn.addEventListener("click", () => getData('http://localhost:5000/api', callBackFunction));