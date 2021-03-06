import { test, assert } from "tape-modern";
import { map, filter, reduce, compose, prop } from "ramda";

const stars = [
  { first: "elvis", last: "presley", alive: false },
  { first: "jim", last: "morrison", alive: false },
  { first: "bob", last: "dylan", alive: true },
  { first: "buddy", last: "holly", alive: false }
];
const fullname = o => `${prop("first", o)} ${prop("last", o)}`;

/* Level 3 - rockstars */

export default function() {
  const ex1 =
    "Use map to transform list of rockstar first,last name objects to objects with fullname";
  const exercise1 = _ => {
    const addFullname = o => ({ fullname: fullname(o) });
    return map(addFullname, stars);
  };

  const ex2 = "Use filter to filter list of rockstars that are still alive";
  const exercise2 = _ => {
    const isAlive = o => prop("alive", o) === true;
    return filter(isAlive, stars);
  };

  const ex3 =
    "Use reduce and count the number of stars that are no longer living";
  const exercise3 = _ => {
    const dead = (acc, o) => (prop("alive", o) === false ? acc + 1 : acc);
    return reduce(dead, 0, stars);
  };

  const ex4 =
    "Use map, filter and reduce with compose show a concatenated string of the fullnames of each alive star";
  const exercise4 = _ => {
    const addFullname = o => fullname(o);
    const isAlive = o => prop("alive", o) === true;
    const listStars = (acc, o) => o;
    return compose(
      reduce(listStars, 0),
      map(addFullname),
      filter(isAlive)
    )(stars);
  };

  /* tests to validate exercises go here */
  test("Level 3", assert => {
    assert.deepequals(
      exercise1(),
      [
        { fullname: "elvis presley" },
        { fullname: "jim morrison" },
        { fullname: "bob dylan" },
        { fullname: "buddy holly" }
      ],
      ex1
    );

    assert.deepequals(
      exercise2(),
      [{ first: "bob", last: "dylan", alive: true }],
      ex2
    );
    assert.equal(exercise3(), 3, ex3);
    assert.equal(exercise4(), "bob dylan", ex4);
  });
}
