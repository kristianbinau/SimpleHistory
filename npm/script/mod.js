"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
/**
 * A simple History class
 *
 * Stores the current value and keeps a stack of previous values for undo/redo
 */
class History {
    constructor(value) {
        Object.defineProperty(this, "_value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_undo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "_redo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "_originalValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._value = value;
        this._originalValue = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this.update(value);
    }
    /**
     * Undo the last change
     *
     * @returns boolean
     */
    undo() {
        if (this._undo.length === 0) {
            return false;
        }
        this._redo.push(this._value);
        this._value = this._undo.pop();
        return true;
    }
    /**
     * Redo the last undo
     *
     * @returns boolean
     */
    redo() {
        if (this._redo.length === 0) {
            return false;
        }
        this._undo.push(this._value);
        this._value = this._redo.pop();
        return true;
    }
    /**
     * Has the value changed from the original value?
     *
     * @returns boolean
     */
    hasChanged() {
        if (this._undo.length === 0) {
            return false;
        }
        return JSON.stringify(this._originalValue) !== JSON.stringify(this._value);
    }
    /**
     * Reset the history
     *
     * @returns void
     */
    reset() {
        this._value = this._originalValue;
        this._undo = [];
        this._redo = [];
    }
    /**
     * Set a new original value and reset the history
     *
     * @param value The new original value
     * @returns void
     */
    setOriginal(value) {
        this._originalValue = value;
        this.reset();
    }
    /**
     * Update the value and push the old value to the undo stack
     *
     * @param value The new value
     */
    update(value) {
        this._undo.push(this._value);
        this._value = value;
        this._redo = [];
    }
}
exports.History = History;
exports.default = History;
