"use strict";

class CommandBuilder {
    constructor() {
        this.operation = null;
    }

    sayHi() {
        console.log('Hi');
    }
}

module.exports = CommandBuilder;