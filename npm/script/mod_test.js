"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dntShim = __importStar(require("./_dnt.test_shims.js"));
const asserts_js_1 = require("./deps/deno.land/std@0.192.0/testing/asserts.js");
const mod_js_1 = require("./mod.js");
const testValues = [
    {
        typeName: "number",
        originalValue: 42,
        newValue: 43,
        newOriginalValue: 44,
    },
    {
        typeName: "string",
        originalValue: "42",
        newValue: "43",
        newOriginalValue: "44",
    },
    {
        typeName: "boolean",
        originalValue: true,
        newValue: false,
        newOriginalValue: true,
    },
    {
        typeName: "array",
        originalValue: [42],
        newValue: [42, 43],
        newOriginalValue: [42, 43, 44],
    },
    {
        typeName: "object",
        originalValue: { a: 42 },
        newValue: { a: 42, b: 43 },
        newOriginalValue: { a: 42, b: 43, c: 44 },
    },
];
for (const testValue of testValues) {
    const typeName = testValue.typeName;
    const originalValue = testValue.originalValue;
    const newValue = testValue.newValue;
    const newOriginalValue = testValue.newOriginalValue;
    dntShim.Deno.test(`Getter should work with ${typeName}`, () => {
        const history = new mod_js_1.History(originalValue);
        (0, asserts_js_1.assertEquals)(history.value, originalValue);
    });
    dntShim.Deno.test(`Setter should work with ${typeName}`, () => {
        const history = new mod_js_1.History(originalValue);
        history.value = newValue;
        (0, asserts_js_1.assertEquals)(history.value, newValue);
    });
    dntShim.Deno.test(`Undo should work with ${typeName}`, () => {
        const history = new mod_js_1.History(originalValue);
        history.value = newValue;
        (0, asserts_js_1.assertEquals)(history.value, newValue);
        (0, asserts_js_1.assertEquals)(history.undo(), true);
        (0, asserts_js_1.assertEquals)(history.value, originalValue);
        (0, asserts_js_1.assertEquals)(history.undo(), false);
        (0, asserts_js_1.assertEquals)(history.value, originalValue);
    });
    dntShim.Deno.test(`Redo should work with ${typeName}`, () => {
        const history = new mod_js_1.History(originalValue);
        history.value = newValue;
        (0, asserts_js_1.assertEquals)(history.value, newValue);
        (0, asserts_js_1.assertEquals)(history.undo(), true);
        (0, asserts_js_1.assertEquals)(history.value, originalValue);
        (0, asserts_js_1.assertEquals)(history.redo(), true);
        (0, asserts_js_1.assertEquals)(history.value, newValue);
        (0, asserts_js_1.assertEquals)(history.redo(), false);
        (0, asserts_js_1.assertEquals)(history.value, newValue);
    });
    dntShim.Deno.test(`Has changed should work with ${typeName}`, () => {
        const history = new mod_js_1.History(originalValue);
        (0, asserts_js_1.assertEquals)(history.hasChanged(), false);
        history.value = newValue;
        (0, asserts_js_1.assertEquals)(history.hasChanged(), true);
        history.undo();
        (0, asserts_js_1.assertEquals)(history.hasChanged(), false);
    });
    dntShim.Deno.test(`Reset should work with ${typeName}`, () => {
        const history = new mod_js_1.History(originalValue);
        history.value = newValue;
        (0, asserts_js_1.assertEquals)(history.value, newValue);
        history.reset();
        (0, asserts_js_1.assertEquals)(history.value, originalValue);
    });
    dntShim.Deno.test(`SetOriginal should work with ${typeName}`, () => {
        const history = new mod_js_1.History(originalValue);
        history.value = newValue;
        (0, asserts_js_1.assertEquals)(history.value, newValue);
        history.setOriginal(newOriginalValue);
        (0, asserts_js_1.assertEquals)(history.value, newOriginalValue);
    });
}
