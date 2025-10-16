// main.js - Gerenciador da Aplicação Electron

const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');

let tray = null; // Para manter o objeto da bandeja do sistema
let mainWindow = null; // Para manter o objeto da janela principal

// Função que cria a janela do navegador (inicialmente oculta)
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false, // Inicia a janela oculta
        frame: false, // Janela sem bordas (para o modo alerta)
        fullscreenable: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Script que roda antes da página
        }
    });

    // Carrega o seu client.html
    mainWindow.loadFile('public/client.html');

    // Quando a janela for fechada, limpamos a referência
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

// Função para criar o ícone na bandeja do sistema
const createTray = () => {
    // Recomendo criar um ícone .ico para a aplicação
    // Por agora, usaremos um ícone padrão do Electron (mas troque por um seu)
    tray = new Tray(path.join(__dirname, 'icon.ico')); // Você precisará criar um icon.ico

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Sistema de Alertas Ativo', enabled: false },
        { type: 'separator' },
        {
            label: 'Fechar',
            click: () => {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    tray.setToolTip('Sistema de Alertas de Emergência');
    tray.setContextMenu(contextMenu);
};

// Evita que a aplicação seja fechada, apenas oculta
app.on('window-all-closed', (e) => {
    e.preventDefault();
});


// Este evento é disparado quando o Electron termina a inicialização
app.whenReady().then(() => {
    createWindow();
    createTray();
});

// =============================================================
// LÓGICA DO ALERTA - A MÁGICA ACONTECE AQUI
// =============================================================
// O client.html vai nos avisar quando um alerta chegar via WebSocket
ipcMain.on('show-alert', () => {
    if (mainWindow) {
        mainWindow.show(); // Mostra a janela
        mainWindow.setFullScreen(true); // Coloca em tela cheia
        mainWindow.setAlwaysOnTop(true, 'screen-saver'); // Força a janela a ficar no topo de tudo
        mainWindow.focus();
    }
});

// O client.html vai nos avisar quando o alerta for confirmado
ipcMain.on('hide-alert', () => {
    if (mainWindow) {
        mainWindow.setAlwaysOnTop(false);
        mainWindow.hide(); // Oculta a janela novamente, em vez de fechar
    }
});