// setTimeout(() => console.log("a"), 0);
// new Promise((resovle) => resovle("b")).then((data) => console.log(data));

function fn() {
  console.log("inside function", this === global);
}

function strictFn() {
  "use strict";
  console.log("strict inside function", this === undefined);
}

const fatArrowFn = () => {
  //parent`s scope
  console.log("inside fat arrow fn", this === module.exports);
};

class Dog {
  constructor() {
    console.log("instance of the class", this instanceof Dog);
  }
}

console.log(this === module.exports);

strictFn();
fn();
fatArrowFn();
const max = new Dog();
