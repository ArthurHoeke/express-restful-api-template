function redConsoleLog(str) {
    return "\x1b[31m" + str + "\x1b[0m";
}

function greenText(str) {
    return "\x1b[32m" + str + "\x1b[0m";
}

function yellowConsoleLog(str) {
    return "\x1b[33m" + str + "\x1b[0m";
}

function grayConsoleLog(str) {
    return "\x1b[90m" + str + "\x1b[0m";
}

function getDividerLogString() {
    return "----------------------------------------------------------------------";
}

module.exports = {
    redConsoleLog,
    greenText,
    yellowConsoleLog,
    grayConsoleLog,
    getDividerLogString,
};
