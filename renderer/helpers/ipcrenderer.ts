import electron from "electron";
const ipcRenderer = electron.ipcRenderer || false;

export function querySqlite(sql: Object) {
  return new Promise((resolve, reject) => {
    if (ipcRenderer) {
      ipcRenderer.send("sqlite-query", JSON.stringify(sql));

      ipcRenderer.once("sqlite-reply", (_, arg) => {
        arg = JSON.parse(arg);
        console.log("arg", arg);

        if (arg.state === "success") {
          resolve(arg.data);
        }

        if (arg.state === "error") {
          reject(arg.data);
        }
      });
    }
  });
}

export function queryUser(sql: { event: "login" | "update"; user: Object }) {
  return new Promise((resolve, reject) => {
    if (ipcRenderer) {
      ipcRenderer.send("users-query", JSON.stringify(sql));

      ipcRenderer.once("users-auth-reply", (_, arg) => {
        arg = JSON.parse(arg);

        if (arg.state === "success") {
          resolve(arg.data);
        }

        if (arg.state === "error" || "not found" || "invalid") {
          reject(arg.data);
        }
      });
    }
  });
}
