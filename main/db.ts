import { app } from "electron";
import { connect } from "trilogy";
import isDev from "electron-is-dev";
import path from "path";

export const getDBPath = (filename: string): string => {
  let base = app.getAppPath();

  if (isDev) {
    return path.resolve(base, `${filename}`);
  } else {
    return app.getAppPath().replace("app.asar", "db.sqlite");
  }
};

const db = connect(getDBPath("db.sqlite"), { client: "sqlite3" });

export default db;
