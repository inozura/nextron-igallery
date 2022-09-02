import { app } from "electron";
import { connect } from "trilogy";
import path from "path";

export const getDBPath = (filename: string): string => {
  let base = app.getAppPath();
  if (app.isPackaged) {
    base = base.replace("/app.asar", "");
  }

  return path.resolve(base, `databases/${filename}`);
};

const db = connect(getDBPath("db.sqlite"));

export default db;
