"use strict";

var OP_SOUND = 0x94;
var BREAK = 0,
    TONE = 1,
    PLAY = 2,
    REPEAT = 3,
    SERVICE = 4;

var encoding = require('../encoding');

/* # opSound (0x94)
Object used to represent a sound operation for sending to an EV3 as a direct command.
*/
class Sound {
    constructor () {
        this.command = null;
    }

    tone () {
        this.command = new Tone(this);
        return this.command;
    }

    toBuffer(cmdBuf) {
        if (cmdBuf) {
            var buf = new Buffer(1);
            buf.writeUInt8(OP_SOUND);
            return Buffer.concat([buf,cmdBuf]);
        }
        else {
            return this.command.toBuffer();
        }
    }
}

/* ## TONE (0x01)
Object used to represent a tone command.

Takes 3 parameters:
*/
class Tone {
    constructor (op) {
        this._op = op;
        this._volume = 0;
        this._frequency = 0;
        this._duration = 0;
    }

    toBuffer() {
        var buf = new Buffer(9);

        encoding.packConstantShortFormat(buf,TONE);
        encoding.packConstantOneByteLongFormat(buf, this._volume, 1);
        encoding.packConstantTwoByteLongFormat(buf, this._frequency, 3);
        encoding.packConstantTwoByteLongFormat(buf, this._duration, 6);

        return this._op.toBuffer(buf);
    }

/* 
* Volume: Range 0-100. Expressed as one control byte followed by a byte constant.
*/
    volume(v) {
        this._volume = v;
        return this;
    }

/*
* Frequency: Range 250-10000. Expressed as one control byte followed by a two byte constant.
*/
    frequency(f) {
        this._frequency = f;
        return this;
    }

/*
* Duration: A time interval in milliseconds. Expressed as one control byte followed by a two byte constant.
*/
    duration(d) {
        this._duration = d;
        return this;
    }
}

module.exports = Sound;
