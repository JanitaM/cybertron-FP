import { test } from "tape-modern";
import hex2color from "./lib/hex2color";
import { map, filter, reduce, compose } from "ramda";

export default function() {
  /* Level 2 - colors */

  const ex1 =
    "Use map and the hex2color function to convert list of hex values to list of colors";
  const exercise1 = _ => {
    const hexes = ["#0000ff", "#f5f5dc", "#cd853f", "#663399", "#ffa500"];
    return map(hex2color, hexes);
  };

  const ex2 =
    "Use filter and the hex2color function to filter list of hex values to only list colors that are not blue, red, or green";
  const exercise2 = _ => {
    const hexes = ["#0000ff", "#f5f5dc", "#cd853f", "#663399", "#ffa500"];
    const notBRG = hex =>
      hex2color(hex) !== "blue" &&
      hex2color(hex) !== "red" &&
      hex2color(hex) !== "green";
    return filter(notBRG, hexes);
  };

  const ex3 =
    "Use reduce and the hex2color function to count list of hex values than have r in their name";
  const exercise3 = _ => {
    const hexes = ["#0000ff", "#f5f5dc", "#cd853f", "#663399", "#ffa500"];
    const isRThere = (acc, hex) =>
      hex2color(hex).includes("r") ? acc + 1 : acc;
    return reduce(isRThere, 0, hexes);
  };

  const ex4 =
    'Use map, filter and reduce with compose to convert all hex codes to colors then filter out (blue, red, green) and count all the colors that contain a "b"';
  const exercise4 = _ => {
    const hexes = ["#0000ff", "#f5f5dc", "#cd853f", "#663399", "#ffa500"];
    const toColors = hex => hex2color(hex);
    const notBRG = hex => hex !== "blue" && hex !== "red" && hex !== "green";
    const isBThere = (acc, hex) => (hex.includes("b") ? acc + 1 : acc);
    return compose(
      reduce(isBThere, 0),
      filter(notBRG),
      map(toColors)
    )(hexes);
  };

  /* tests to validate exercises go here */
  test("Level 2", assert => {
    assert.deepequals(
      exercise1(),
      ["blue", "beige", "peru", "rebeccapurple", "orange"],
      ex1
    );
    assert.deepequals(
      exercise2(),
      ["#f5f5dc", "#cd853f", "#663399", "#ffa500"],
      ex2
    );
    assert.equal(exercise3(), 3, ex3);
    assert.equal(exercise4(), 2, ex4);
  });
}
