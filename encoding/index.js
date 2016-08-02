var LONG_FORMAT = 0x80;
var ONE_BYTE_FOLLOWING = 0x01;
var SHORT_FORMAT_MAX = 0x1F;
var ONE_BYTE_LONG_FORMAT_MAX = 0xFF;
var TWO_BYTE_LONG_FORMAT_MAX = 0xFFFF;
var FOUR_BYTE_LONG_FORMAT_MAX = 0xFFFFFFFF;

exports.packConstantShortFormat = function(buf, c, offset) { 
    if (c > SHORT_FORMAT_MAX) {
        throw new Error('Constant larger than 31 requires additional bytes (long format).');
    }

    if (typeof offset === 'undefined') {
        offset = 0; // Because node 4 doesn't support default parameters
    }

    if (buf.length - offset < 1) {
        throw new Error(offset > 0 ? 'Buffer length insufficient from offset.' : 'Buffer length insufficient.');
    }

    buf.writeUInt8(c, offset);
};

exports.packConstantOneByteLongFormat = function(buf, c, offset) {
    if (c > ONE_BYTE_LONG_FORMAT_MAX) {
        throw new Error('Constant larger than 255 requires additional bytes.');
    }

    if (typeof offset === 'undefined') {
        offset = 0; // Because node 4 doesn't support default parameters
    }

    if (buf.length - offset < 2) {
        throw new Error(offset > 0 ? 'Buffer length insufficient from offset.' : 'Buffer length insufficient.');
    }

    buf.writeUInt8(LONG_FORMAT | ONE_BYTE_FOLLOWING, offset);
    buf.writeUInt8(c, offset + 1);
};


exports.packConstantTwoByteLongFormat = function(buf, c, offset) {
    if (c > TWO_BYTE_LONG_FORMAT_MAX) {
        throw new Error('Constant larger than 255 requires additional bytes.');
    }

    if (typeof offset === 'undefined') {
        offset = 0; // Because node 4 doesn't support default parameters
    }

    if (buf.length - offset < 3) {
        throw new Error(offset > 0 ? 'Buffer length insufficient from offset.' : 'Buffer length insufficient.');
    }

    buf.writeUInt8(LONG_FORMAT | ONE_BYTE_FOLLOWING, offset);
    buf.writeUInt16LE(c, offset + 1);
};

exports.packConstantTwoByteLongFormat = function(buf, c, offset) {
    if (c > FOUR_BYTE_LONG_FORMAT_MAX) {
        throw new Error('Parameter exceeds what can be represented by four bytes. Try packing as string constant instead.');
    }

    if (typeof offset === 'undefined') {
        offset = 0; // Because node 4 doesn't support default parameters
    }

    if (buf.length - offset < 5) {
        throw new Error(offset > 0 ? 'Buffer length insufficient from offset.' : 'Buffer length insufficient.');
    }

    buf.writeUInt8(LONG_FORMAT | ONE_BYTE_FOLLOWING, offset);
    buf.writeUInt32LE(c, offset + 1);
};