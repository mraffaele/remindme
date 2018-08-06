const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");
const ipcMain = require("electron").ipcMain;

const isProd = process.execPath.indexOf("dist") === -1;
let win;

app.on("ready", () => {
  const menu = Menu.buildFromTemplate(menuTpl());
  win = new BrowserWindow({
    width: 600,
    height: 600,
    title: "Remind Me",
    backgroundColor: "#81ecec",
    center: true,
    resizable: true,
    maximizable: false,
    fullscreenable: false,
    minWidth: 400,
    minHeight: 350
  });

  win.loadFile("index.html");
  Menu.setApplicationMenu(menu);

  ipcMain.on("minimiseApp", () => {
    win.minimize();
    win.setAlwaysOnTop(false);
  });
  ipcMain.on("notifyFocus", () => {
    win.setAlwaysOnTop(true);
    win.show();
  });

  win.on("closed", () => app.quit());

  if (!isProd) {
    win.toggleDevTools();
  }
});

const menuTpl = () => {
  let menu = [
    {
      label: "Manage",
      submenu: [
        {
          label: "New Reminder",
          accelerator: "CommandOrControl+N",
          click() {
            win.webContents.send("NewReminder", {});
          }
        },
        {
          label: "Audio Manager",
          click() {
            win.webContents.send("AudioManager", {});
          }
        }
      ]
    },
    {
      label: "Batch",
      submenu: [
        {
          label: "Start All",
          click() {
            win.webContents.send("BatchStart", {});
          }
        },
        {
          label: "Stop All",
          click() {
            win.webContents.send("BatchStop", {});
          }
        }
      ]
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Author",
          click() {
            require("electron").shell.openExternal("https://github.com/mraffaele");
          }
        },
        {
          label: "Source",
          click() {
            require("electron").shell.openExternal("https://github.com/mraffaele/remindme");
          }
        },
        {
          label: "Credits",
          click() {
            require("electron").shell.openExternal(
              "https://github.com/mraffaele/remindme/blob/master/README.md#credits"
            );
          }
        },
        {
          label: "Cron Generator",
          click() {
            require("electron").shell.openExternal("https://crontab.guru");
          }
        }
      ]
    },
    {
      label: "Quit",
      role: "quit",
      accelerator: "CommandOrControl+Q",
      click() {
        app.quit();
      }
    }
  ];

  if (process.platform === "darwin") {
    menu[0].submenu.push({
      label: "Quit",
      role: "quit",
      accelerator: "CommandOrControl+Q",
      click() {
        app.quit();
      }
    });
    menu.unshift({}); //Hide Electron on Mac
  }

  if (!isProd) {
    menu.push({
      label: "DevTools",
      click(item, focusedWindow) {
        focusedWindow.toggleDevTools();
      }
    });
  }

  return menu;
};
