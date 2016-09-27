'use strict';

module.exports = Collection;

function Collection(col) {
   this.col = col;
}

Collection.prototype.find = () => {
   console.log(`find: ${this.name}`);
}

Collection.prototype.findOne = () => {
   console.log(`findOne: ${this.name}`);
}

Collection.prototype.update = () => {
   console.log(`update: ${this.name}`);
}

Collection.prototype.delete = () => {
   console.log(`delete: ${this.name}`);
}

Collection.prototype.count = () => {
   console.log(`count: ${this.name}`);
}
