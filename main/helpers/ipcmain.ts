import { ipcMain } from "electron";
const bcrypt = require("bcryptjs");
import db from "../db";

// SQLITE QUERY
ipcMain.on("sqlite-query", async (event, arg) => {
  arg = JSON.parse(arg);

  if (arg.status === "get") {
    try {
      const query = await db.knex("images");

      event.reply(
        "sqlite-reply",
        JSON.stringify({ state: "success", data: query })
      );
    } catch (error) {
      event.reply("sqlite-reply", JSON.stringify({ state: "error", error }));
    }
  } else if (arg.status === "create") {
    try {
      const query = await db.knex("images").insert(arg.data);

      event.reply(
        "sqlite-reply",
        JSON.stringify({ state: "success", data: query })
      );
    } catch (error) {
      event.reply("sqlite-reply", JSON.stringify({ state: "error", error }));
    }
  } else if (arg.status === "edit") {
    try {
      const query = await db
        .knex("images")
        .where({ id: arg.id })
        .update(arg.data);

      event.reply(
        "sqlite-reply",
        JSON.stringify({ state: "success", data: query })
      );
    } catch (error) {
      event.reply("sqlite-reply", JSON.stringify({ state: "error", error }));
    }
  } else if (arg.status === "delete") {
    try {
      const query = await db.knex("images").where({ id: arg.id }).delete();

      event.reply(
        "sqlite-reply",
        JSON.stringify({ state: "success", data: query })
      );
    } catch (error) {
      event.reply("sqlite-reply", JSON.stringify({ state: "error", error }));
    }
  } else if (arg.status === "find") {
    try {
      const query = await db
        .knex("images")
        .where("title", "like", `%${arg.title}%`);

      event.reply(
        "sqlite-reply",
        JSON.stringify({ state: "success", data: query })
      );
    } catch (error) {
      event.reply("sqlite-reply", JSON.stringify({ state: "error", error }));
    }
  }
});

// QUERY USERS
ipcMain.on("users-query", async (event, arg) => {
  arg = JSON.parse(arg);

  if (arg.event === "login") {
    try {
      const query = await db
        .knex("users")
        .where({ username: arg.user.username })
        .first();

      if (!query) {
        event.reply(
          "users-auth-reply",
          JSON.stringify({ state: "not found", data: "User not found" })
        );
      } else {
        bcrypt.compare(arg.user.password, query.password).then((matched) => {
          if (matched) {
            event.reply(
              "users-auth-reply",
              JSON.stringify({ state: "success", data: query })
            );
          } else {
            event.reply(
              "users-auth-reply",
              JSON.stringify({
                state: "invalid",
                data: "Invalid username or password",
              })
            );
          }
        });
      }
    } catch (error) {
      event.reply(
        "users-auth-reply",
        JSON.stringify({ state: "error", error })
      );
    }
  } else if (arg.event === "update") {
    try {
      const query = db
        .knex("users")
        .update({
          username: arg.user.username,
          password: bcrypt.hashSync(arg.user.password, 10),
        })
        .where({ username: arg.user.username });

      if (query) {
        event.reply(
          "users-auth-reply",
          JSON.stringify({ state: "success", data: query })
        );
      }
    } catch (error) {
      event.reply(
        "users-auth-reply",
        JSON.stringify({ state: "error", error })
      );
    }
  }
});
