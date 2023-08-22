/**
 * A simple History class
 *
 * Stores the current value and keeps a stack of previous values for undo/redo
 */
declare class History<T> {
    private _value;
    private _undo;
    private _redo;
    private _originalValue;
    constructor(value: T);
    get value(): T;
    set value(value: T);
    /**
     * Undo the last change
     *
     * @returns boolean
     */
    undo(): boolean;
    /**
     * Redo the last undo
     *
     * @returns boolean
     */
    redo(): boolean;
    /**
     * Has the value changed from the original value?
     *
     * @returns boolean
     */
    hasChanged(): boolean;
    /**
     * Reset the history
     *
     * @returns void
     */
    reset(): void;
    /**
     * Set a new original value and reset the history
     *
     * @param value The new original value
     * @returns void
     */
    setOriginal(value: T): void;
    /**
     * Update the value and push the old value to the undo stack
     *
     * @param value The new value
     */
    private update;
}
export default History;
export { History };
