/**
 * A simple History class
 *
 * Stores the current value and keeps a stack of previous values for undo/redo
 */
class History<T> {
  private _value: T;
  private _undo: T[] = [];
  private _redo: T[] = [];

  private _originalValue: T;

  constructor(value: T) {
    this._value = value;
    this._originalValue = value;
  }

  get value(): T {
    return this._value;
  }

  set value(value: T) {
    this.update(value);
  }

  /**
   * Undo the last change
   *
   * @returns boolean
   */
  public undo(): boolean {
    if (this._undo.length === 0) {
      return false;
    }

    this._redo.push(this._value);
    this._value = this._undo.pop() as T;

    return true;
  }

  /**
   * Redo the last undo
   *
   * @returns boolean
   */
  public redo(): boolean {
    if (this._redo.length === 0) {
      return false;
    }

    this._undo.push(this._value);
    this._value = this._redo.pop() as T;

    return true;
  }

  /**
   * Has the value changed from the original value?
   *
   * @returns boolean
   */
  public hasChanged(): boolean {
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
  public reset(): void {
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
  public setOriginal(value: T): void {
    this._originalValue = value;
    this.reset();
  }

  /**
   * Update the value and push the old value to the undo stack
   *
   * @param value The new value
   */
  private update(value: T) {
    this._undo.push(this._value);
    this._value = value;
    this._redo = [];
  }
}

export default History;
export { History };
