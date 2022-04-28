"use strict";

const storage = {
  data: {},
  key: undefined,

  save: function () {
    if (this.key === undefined) {
      throw Error("Key is undefined cant save!");
    }
    localStorage.setItem(this.key, JSON.stringify(this.data));
  },

  delete: function (key) {
    delete this.data[key];
    this.save();
  },

  init: function (key) {
    this.key = key;
    this.data = {};

    let data = localStorage.getItem(this.key);
    if (data === null) {
      return false;
    }

    this.data = JSON.parse(data);

    return this;
  },
  append: function () {},
};
