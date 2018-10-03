'use strict'
import User from './src/client/Controller/User/user.js';

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

//GET request with clallback()
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

//GET request with promise()
function getPromiseData(theUrl) {
    return new Promise(function(resolve, reject) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.onload = () => {
            xmlHttp.status === 200 ? resolve(xmlHttp.responseText) : reject(Error(`Errors: ${xmlHttp.statusText}`));
        }
        xmlHttp.onerror = () => reject(Error(`Errors: ${xmlHttp.statusText}`));
        xmlHttp.send();
    });
}

// submitPromisBtn.addEventListener("click", () => {
//     Promise.all([
//             getPromiseData('http://localhost:5000/api'),
//             getPromiseData('http://localhost:5000/apii'),
//             getPromiseData('http://localhost:5000/apiii')
//         ])
//         .then((response) => {
//             console.log('RESPONSE:', response);
//             response.forEach((data) => {
//                 console.log('DATA:', JSON.parse(data));
//             })
//         })
//         .catch((error) => { console.log('error', error) })
// });

//POST for login 
function apiPromisRequest(apiType, apiUrl, data, jwtoken) {
    return new Promise(function(resolve, reject) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open(apiType, apiUrl, true); // true for asynchronous 
        xmlHttp.onload = () => {
            xmlHttp.status === 200 ? resolve(xmlHttp.responseText) : reject(Error(`Errors: ${xmlHttp.statusText}`));
        }
        if (jwtoken) xmlHttp.setRequestHeader('Authorization', 'Bearer ' + jwtoken);
        xmlHttp.onerror = () => reject(Error(`Errors: ${xmlHttp.statusText}`));

        var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

        xmlHttp.send(blob);
    });
}

submitPromisBtn.addEventListener("click", () => {
    const apiType = 'POST';
    const apiUrl = 'http://localhost:5000/api/login';
    const data = {
        username: 'asdasd',
        password: 'asdasd'
    };
    apiPromisRequest(apiType, apiUrl, data)
        .then((response) => {
            console.log('RESPONSE:', response);
        })
        .catch((error) => { console.log('error', error) })
});