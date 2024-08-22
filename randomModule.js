const EventEmmiter = require("events");

class RandomEmmiter extends EventEmmiter {
  foo(arg) {
    this.emit("message", arg);
  }
}

module.exports = RandomEmmiter;
