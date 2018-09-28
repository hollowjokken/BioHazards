// Auto class has only wheels
function Auto() {
    this.wheels = 4;
    // this.drive = () => { console.log("Drive Auto") };

}

// Car "class" instantiate
function Car(name, dors) {

    // Car inherits from Auto class
    Auto.call(this);

    // Car atributes & metods
    this.name = name;
    this.type = dors === 2 ? 'Sport' : 'Sedan';
    this.modifyDors = function(dors) {
        this.type = dors === 2 ? 'Sport' : 'Sedan';
    }
    this.drive = () => { console.log("Drive Car") };
    this.cornerStop = () => { console.log("Stop") };
    this.carData = () => { return `Name:${this.name} | Type:${this.type} | Nr of wheels:${this.wheels}`; }
}

// Audi is a Car, it inherits from the Car "class"
let Audi = new Car('Audi', 2, 4); //the nr of wheels is 4

// main()
// console.log('Car to buy:', Audi.carData());

// Audi.drive();
// Audi.cornerStop();
Audi.modifyDors(4);

// console.log('Modyfied car:', Audi.carData());

//////////////////////////////////////////////////////////////////////////////
function Prezents(label) {
    this.label = label;
}

function Shape(label, value, state) {
    this.label = label;
    this.value = value;
    this.state = state;
    this.getData = () => { return `${this.label} + ${this.value} + ${this.state}`; }
}

Shape.prototype.solver = function() {
    return `${this.label}`;
};

// console.log('Shape.prototype', Shape.prototype);
// console.log('Prezents.prototype', Prezents.prototype);

// console.log('Shape', Shape);
// console.log('Prezents', Prezents);

Prezents.prototype = Object.create(Shape.prototype);
// console.log('Prezents.prototype', Prezents.prototype);


let presents = new Prezents('Shady', 5, 'unsolved');
// console.log(presents.getData());
// console.log(presents.solver());

// let shape = new Shape('Shady', 5, 'unsolved');
// console.log(shape.getData());
// console.log(shape.solver());

//////////////////////////////////////////////////////////////////////////////

let a = 10;
let b = 20;
let c = 30;

let sum = function() {
        console.log(a + b + c);
    }
    // sum();

//////////////////////////////////////////////////////////////////////////////

let car = {};
// let Car = new Object();
// console.log('1111Car:', Car);
// console.log('1111car:', car);

// Object.defineProperties(Car, {
//     "name": "Name",
//     type: "type",
//     hasSomeValues: {},
//     drive: function() { console.log("Drive") },
//     cornerStop: function() { console.log('Stop') },
//     hasSomeValues: function(values) { return { values } },
//     set type(dors) { this.type = dors === 2 ? "Sport" : "Family" }
// });

car = {
    name: "Name",
    type: "type",
    hasSomeValues: {},
    drive: function() { console.log("Drive") },
    cornerStop: function() { console.log('Stop') },
    hasSomeValues: function(values) { return { values } },
    set carType(dors) {
        this.type = dors === 2 ? "Sport" : "Family";
    },
    get carDate() {
        return `Car==> Name:${this.name} | Type:${this.type}`;
    }
};
// console.log('2222Car:', Car);
// console.log('2222car:', car);

car.carType = 2;
// console.log('3333car:', car.carDate);

console.log('(=============================== < * > ===============================)');

console.log('car.prototype', car.prototype);
console.log('car.__proto__', car.__proto__);
console.log('car', car);

console.log('(=============================== < * > ===============================)');

console.log('Shape.prototype', Shape.prototype);
console.log('Shape.__proto__', Shape.__proto__);
console.log('Shape', Shape);

console.log('(=============================== < * > ===============================)');

const currensy = {
    RON_EUR: 0.21,
    RON_USD: 0.25,
    RON_HUF: 69.41,
    EUR_RON: 4.66,
    EUR_USD: 1.17,
    EUR_HUF: 323.72,
    USD_RON: 3.97,
    USD_EUR: 0.85,
    USD_HUF: 275.70,
    HUF_RON: 0.014,
    HUF_EUR: 0.003,
    HUF_USD: 0.003
}

class User {

    constructor(props) {
        this.props = props;
        this.userName = props.userName;
        this.email = this.props.email;
        this.valueNumbers = props.valueNumbers;
        this.inputCurency = props.inputCurency;
        this.outputCurency = props.outputCurency;
    }

    getData() {
        return `Email: ${this.email} | Username: ${this.userName}`;
    }

    getExchangeType() {
        return `${this.inputCurency}_${this.outputCurency}`;
    }

    calcExchange() {
        return currensy[this.getExchangeType()] ?
            this.valueNumbers * currensy[this.getExchangeType()] :
            this.valueNumbers;
    }

    showResult(elTarget) {
        elTarget.value = this.calcExchange();

    }
}

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


// user.showResult(outputId);

// user.showResult(outputId);

console.log('(=============================== < * > ===============================)');

let user = new User({ userName: `admin1`, email: `asd@asd.asd` });
console.log('user', user);
console.log('user', user.getData());

console.log('(=============================== < * > ===============================)');

console.log('User', User);
console.log('User.getData', new User({ userName: `admin1`, email: `asd@asd.asd` }).getData());

console.log('(=============================== < * > ===============================)');
console.log('(=============================== < * > ===============================)');