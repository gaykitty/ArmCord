import { contextBridge, ipcRenderer } from "electron";
import { getDisplayMediaSelector } from "./capturer";
import { injectTitlebar } from "./titlebar";

contextBridge.exposeInMainWorld("armcord", {
  window: {
    show: () => ipcRenderer.send("win-show"),
    hide: () => ipcRenderer.send("win-hide"),
    minimize: () => ipcRenderer.send("win-minimize"),
    maximize: () => ipcRenderer.send("win-maximize"),
  },
  titlebar: {
    injectTitlebar: () => injectTitlebar(),
  },
  electron: process.versions.electron,
  channel: ipcRenderer.sendSync("channel"),
  version: ipcRenderer.sendSync("get-app-version", "app-version"),
  getDisplayMediaSelector: getDisplayMediaSelector,
  restart: () => ipcRenderer.send("restart"),
  saveSettings: (...args: any) => ipcRenderer.send("saveSettings", ...args),
  splashEnd: () => ipcRenderer.send("splashEnd"),
});
contextBridge.exposeInMainWorld("electron", {
  //deprecated, used for legacy purposes, will be removed in future versions
  window: {
    show: () => ipcRenderer.send("win-show"),
    hide: () => ipcRenderer.send("win-hide"),
    minimize: () => ipcRenderer.send("win-minimize"),
    maximize: () => ipcRenderer.send("win-maximize"),
  },
  electron: process.versions.electron,
  warning: 'This is a deprecated API and will be removed in future versions (3.0.0 --> 3.1.0).',
  version: ipcRenderer.sendSync("get-app-version", "app-version"),
}); 