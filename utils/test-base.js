const base = require("@playwright/test");

exports.customtest = base.test.extend({
  testDataForOrder: {
    username: "valerianoalexander@gmail.com",
    password: "Petit_22$",
    productName: "zara coat 3",
  },
});
