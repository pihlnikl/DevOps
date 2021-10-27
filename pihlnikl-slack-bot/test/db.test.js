// Check if the database in db.json really is JSON and valid
const db = require('./../db');

function isJson(item) {
  item = typeof item !== "string"
      ? JSON.stringify(item)
      : item;

  try {
      item = JSON.parse(item);
  } catch (e) {
      return false;
  }

  if (typeof item === "object" && item !== null) {
      return true;
  }

  return false;
}

test('if db is valid', () => {
    expect(isJson(db)).toBe(true);
});