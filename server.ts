import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();

// Support JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API ENDPOINT: Handle contact form submissions securely
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  let appsScriptUrl = (process.env.GOOGLE_APPS_SCRIPT_URL || '').trim();

  if (!appsScriptUrl) {
    console.error('❌ [CONFIG ERROR] GOOGLE_APPS_SCRIPT_URL no está configurada.');
    return res.status(500).json({ error: 'Configuración del servidor incompleta. Falta GOOGLE_APPS_SCRIPT_URL.' });
  }

  const emailSubject = `Nueva consulta de ${name} <${email}> – VIVE-X`;

  console.log('📬 [APPS SCRIPT DELIVERY] Relay de correo directo vía Google Apps Script Web App...');
  try {
    // Build urlencoded queries that match 'doPost(e)' parameters
    const queryParams = new URLSearchParams({
      nombre: name,
      name: name,
      email: email,
      mensaje: message,
      message: message,
      asunto: emailSubject,
      subject: emailSubject,
      para: 'info@vive-x.net'
    }).toString();

    const fullScriptUrl = appsScriptUrl.includes('?') 
      ? `${appsScriptUrl}&${queryParams}` 
      : `${appsScriptUrl}?${queryParams}`;

    const response = await fetch(fullScriptUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const textRes = await response.text();
      console.log(`[ENVÍO APPS SCRIPT ÉXITO] Mensaje enviado real con Apps Script. Respuesta:`, textRes);
      return res.json({
        success: true,
        message: '¡Tu consulta ha sido enviada de forma directa y segura a nuestro equipo!'
      });
    } else {
      throw new Error(`Google Apps Script retornó código HTTP ${response.status}`);
    }
  } catch (err: any) {
    console.error('⚠️ [APPS SCRIPT ERROR] Falló el despacho por Apps Script:', err.message);
    return res.status(500).json({
      error: 'No se pudo entregar el mensaje. Por favor, inténtalo de nuevo más tarde.',
      details: err.message
    });
  }
});

// Arranque en local (Dev / Producción sin Firebase)
async function startLocalServer() {
  const PORT = process.env.PORT || 3000;
  
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

// Si no estamos en Cloud Run / Firebase Functions, arrancamos el servidor web normal
if (!process.env.K_SERVICE && !process.env.FUNCTIONS_EMULATOR) {
  startLocalServer();
}

// Exportar para Firebase Functions v2
// Nota: Importamos dinámicamente o condicionalmente para no fallar en local si no está firebase-functions instalado,
// aunque la construiremos con esbuild que lo resolverá.
import { onRequest } from 'firebase-functions/v2/https';
export const ssr = onRequest({ region: 'europe-west1' }, app);
