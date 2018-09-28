import currensy from '../../utils/constants.js';

export default class User {

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