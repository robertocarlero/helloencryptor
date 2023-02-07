import { createRoot } from 'react-dom/client';
import App from '../routes/App';

import 'styles/index.css';
import 'styles/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container as Element);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
