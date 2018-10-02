'use strict'
// import request from '../node_modules/request-promise.js';
import User from './src/client/Controller/User/user.js';
// import rp from '../request-promise';
// import rp from 'request-promise';

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
const submitPromisBtn = document.getElementById('promis');

function callBackFunction(data) {
    console.log('data', data);
}
submitBtn.addEventListener("click", () => getData('http://localhost:5000/api', callBackFunction));

// rp('http://localhost:5000/api')
//     .then(function(data) {
//         console.log('data:', data)
//     })
//     .catch(function(err) {
//         console.log('err', err)
//     
// });

// let promise = new Promise((res, rej) => {
//     let xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() {

//     if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
//         res(xmlHttp.responseText);
//         console.log(xmlHttp.responseText);
//     }
// })

// promise.then(function(value) {
//     console.log(value);
//     // expected output: "foo"
// });
function getPromisData(theUrl) {
    return new Promise(function(resolve, reject) {


        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                // callBackFunction(xmlHttp.responseText);
                return resolve(xmlHttp.responseText);
            } else {
                reject('Error');
            }
        }
        console.log('theUrl', theUrl);
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send();
    });
}

submitPromisBtn.addEventListener("click", () => {
    getPromisData('http://localhost:5000/api')
        .then((response) => { console.log(response) })
});