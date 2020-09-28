// Let's make an object and start adding methods to it!
class LoScore {
  identity(val) {
    return val;
  }

  /**
  | ARRAYS
  |~~~~~~~~~~
  * */
  uniq(array) {
    // YOUR CODE HERE
    const output = [];
    for (let i = 0; i < array.length; i++) {
      if (!output.includes(array[i])) {
        output.push(array[i]);
      }
    }
    return output;
  }

  /**
  | COLLECTIONS
  |~~~~~~~~~~
  * */
  each(collection, iterator) {
    if (collection instanceof Array) {
      for (let i = 0; i < collection.length; i += 1) {
        iterator(collection[i], i, collection);
      }
    } else {
      const keys = Object.keys(collection);
      for (let i = 0; i < keys.length; i += 1) {
        iterator(collection[keys[i]], keys[i], collection);
      }
    }
  }

  map(collection, iteratee) {
    const output = [];
    this.each(collection, (...args) => {
      output.push(iteratee(...args));
    });
    return output;
  }

  filter(collection, test) {
    const result = [];
    this.each(collection, (val) => test(val) && result.push(val));
    return result;
  }

  reject(collection, test) {
    const output = [];
    this.filter(collection, (...args) => {
      if (!test(...args)) {
        output.push(...args);
      }
    });
    return output;
  }

  reduce(collection, iterator, accumulator) {
    if (accumulator === undefined) {
      let output = collection[0];
      const newCollection = collection.slice(1, collection.length);

      this.each(newCollection, (...args) => {
        output = iterator(output, ...args);
      });
      return output;
    }

    let output = accumulator;

    this.each(collection, (...args) => {
      output = iterator(output, ...args);
    });
    return output;
  }

  every(collection, test) {
    if (collection.length === 0) return true;
    const newCollection = [];
    for (let i = 0; i < collection.length; i++) {
      if (test === undefined) {
        newCollection.push(collection[i]);
      } else {
        if (test(collection[i]) === collection[i]) {
          if (collection[i]) {
            newCollection.push(true);
          } else {
            newCollection.push(false);
          }
        } else {
          newCollection.push(test(collection[i]));
        }
      }
    }
    return this.reduce(newCollection, (result, bool) => {
      if (bool === undefined) {
        return result;
      }
      return result && bool;
    });
  }

  /**
  | OBJECTS
  |~~~~~~~~~~
  * */
  extend(...obj) {
    const output = obj[0];
    for (let i = 1; i < obj.length; i++) {
      this.each(obj[i], (value, key) => {
        output[key] = value;
      });
    }
    return output;
  }

  /**
  | FUNCTIONS
  |~~~~~~~~~~
  * */

  once(func) {
    let counter = 0;
    let value;
    return function() {
      if (counter < 1) {
        value = func();
        counter++;
        return value;
      }
      return value;
    };
  }

  memoize(func) {
    const list = {};
    return function(input) {
      if (list.hasOwnProperty(input)) {
        return list[input];
      }
      list[input] = func(input);

      return list[input];
    };
  }

  invoke(collection, functionOrKey) {
    const output = [];

    if (typeof functionOrKey === "string") {
      for (let i = 0; i < collection.length; i++) {
        output.push(collection[i][functionOrKey]());
      }
    } else {
      for (let i = 0; i < collection.length; i++) {
        output.push(functionOrKey.apply(collection[i]));
      }
    }
    return output;
  }

  /**
  | ADVANCED REQUIREMENTS
  |~~~~~~~~~~~~~
  * */

  sortBy() {
    // YOUR CODE HERE
  }

  zip() {
    // YOUR CODE HREE
  }

  delay() {
    // YOUR CODE HERE
  }

  defaults() {
    // YOUR CODE HERE
  }

  throttle() {
    // YOUR CODE HERE
  }
}

module.exports = new LoScore();
