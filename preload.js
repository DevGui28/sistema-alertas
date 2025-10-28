// preload.js

const { contextBridge, ipcRenderer } = require('electron');

// Expõe funções seguras para o seu client.html
contextBridge.exposeInMainWorld('electronAPI', {
    showAlert: () => ipcRenderer.send('show-alert'),
    hideAlert: () => ipcRenderer.send('hide-alert'),
});