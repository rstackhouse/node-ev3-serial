/*
Instruction
Opcode Arguments Dispatch status Description
opSound (CMD, ...)
0x94
(Data8) CMD => Specific command parameter documented below Unchanged
Sound control entry
    CMD: BREAK = 0x00 (Stop current sound playback)
    CMD: TONE = 0x01 Arguments
        (Data8) VOLUME – Specify volume for playback, [0 - 100] (Data16) FREQUENCY – Specify frequency, [250 - 10000] (Data16) DURATION – Specify duration in millisecond
    CMD: PLAY = 0x02 Arguments
        (Data8) VOLUME – Specify volume for playback, [0 - 100] (Data8) NAME – First character in filename (Character string)
    CMD: REPEAT = 0x03 Arguments
        (Data8) VOLUME – Specify volume for playback, [0 - 100] (Data8) NAME – First character in filename (Character string)
*/

class Sound {
    constructor () {
        this.command = null;
    }

    tone () {
        this.command = new Tone(this);
        return this.tone;
    }

    toBuffer(cmdBuf) {
        if (cmdBuf) {
            var buf = new Buffer();
            buf.writeUint8(OP_SOUND);
            return buf.concat(cmdBuf);
        }
        else {
            return this.command.toBuffer();
        }
    }
}

class Tone {
    constructor (op) {
        this.op = op;
        this.volume = null;
        this.frequency = null;
        this.duration = null;
    }

    /* Convenience Method that allows chaining */
    toBuffer() {
        var buf = new Buffer();

        // append values for volume, frequency, and duration here

        return this.op.toBuffer(buf);
    }
}

exports.Sound = Sound;
