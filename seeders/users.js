const bcrypt = require("bcryptjs");
const hash = bcrypt.hashSync("admin123", 10);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "admin", password: hash },
      ]);
    });
};
