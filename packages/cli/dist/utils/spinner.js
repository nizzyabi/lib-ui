"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spinner = spinner;
const nanospinner_1 = require("nanospinner");
function spinner(message) {
    const sp = (0, nanospinner_1.createSpinner)(message);
    return {
        start: () => {
            sp.start();
            return sp;
        },
        succeed: (text) => {
            sp.success({ text });
            return sp;
        },
        fail: (text) => {
            sp.error({ text });
            return sp;
        },
    };
}
