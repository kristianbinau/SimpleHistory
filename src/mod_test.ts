import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { History } from "./mod.ts";

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

  Deno.test(`Getter should work with ${typeName}`, () => {
    const history = new History(originalValue);

    assertEquals(history.value, originalValue);
  });

  Deno.test(`Setter should work with ${typeName}`, () => {
    const history = new History(originalValue);

    history.value = newValue;

    assertEquals(history.value, newValue);
  });

  Deno.test(`Undo should work with ${typeName}`, () => {
    const history = new History(originalValue);

    history.value = newValue;

    assertEquals(history.value, newValue);

    assertEquals(history.undo(), true);

    assertEquals(history.value, originalValue);

    assertEquals(history.undo(), false);

    assertEquals(history.value, originalValue);
  });

  Deno.test(`Redo should work with ${typeName}`, () => {
    const history = new History(originalValue);

    history.value = newValue;

    assertEquals(history.value, newValue);

    assertEquals(history.undo(), true);

    assertEquals(history.value, originalValue);

    assertEquals(history.redo(), true);

    assertEquals(history.value, newValue);

    assertEquals(history.redo(), false);

    assertEquals(history.value, newValue);
  });

  Deno.test(`Has changed should work with ${typeName}`, () => {
    const history = new History(originalValue);

    assertEquals(history.hasChanged(), false);

    history.value = newValue;

    assertEquals(history.hasChanged(), true);

    history.undo();

    assertEquals(history.hasChanged(), false);
  });

  Deno.test(`Reset should work with ${typeName}`, () => {
    const history = new History(originalValue);

    history.value = newValue;

    assertEquals(history.value, newValue);

    history.reset();

    assertEquals(history.value, originalValue);
  });

  Deno.test(`SetOriginal should work with ${typeName}`, () => {
    const history = new History(originalValue);

    history.value = newValue;

    assertEquals(history.value, newValue);

    history.setOriginal(newOriginalValue);

    assertEquals(history.value, newOriginalValue);
  });
}
