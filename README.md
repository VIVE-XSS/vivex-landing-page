# VIVE-X — Landing Page de Facturación Electrónica para España

Esta es la landing page interactiva oficial de **VIVE-X**, un servicio innovador y de "código abierto diferido" para resolver la facturación electrónica en España cumpliendo con la **Ley Crea y Crece** y el **Reglamento Verifactu**. 

Está diseñada como un soporte visual ágil, de carga rápida y adaptado a móviles, óptimo para captar la atención de autónomos, pymes e integradores técnicos en ferias presenciales y eventos sectoriales de transformación digital.

---

## 🎨 Principios de Diseño Visual y de Interacción

*   **Modo Oscuro Premum por Defecto (`Cyber-Slate`):** Pensado para destacar en pantallas grandes y tótems interactivos de estands de feria sin cansar la vista de los visitantes.
*   **Aero-Background Fluido:** Fondo tecnológico animado con una cuadrícula tridimensional flotante y partículas dinámicas programadas mediante transformaciones optimizadas con `motion` (Framer Motion v12).
*   **Enfoque Mobile-First Riguroso:** Toda la interfaz se adapta cómodamente a terminales móviles desde 320px de ancho con áreas de toque generosas (botones grandes de más de 44px) y alta legibilidad de textos.
*   **Página "Scroll-Snap" Fluida:** Navegación por secciones que ajusta el scroll de manera natural, facilitando la visualización completa de los contenidos clave rápido y sin desbordes.

---

## 🧠 Características y Estructura Modular

El proyecto se despliega de manera limpia y modular en los siguientes archivos para cumplir los estándares óptimos de rendimiento y mantenimiento:

1.  **`src/App.tsx`:** Orquesta la estructura global de navegación ágil en una sola página, el encabezado minimalista y las tres secciones principales (Héroe, Características y Contacto).
2.  **`src/components/GlowBackground.tsx`:** Canvas decorativo de gradientes cinéticos y polvo cósmico animado de alto rendimiento vía GPU.
3.  **`src/components/InteractiveSimulator.tsx`:** Simulador interactivo ("Simula tu integración") diseñado para que el usuario clique sobre su ERP (Odoo, FacturaScripts, Excel, API a medida) y visualice el flujo técnico exacto en milisegundos:
    *   **Paso 1:** Envío de datos fiscales crudos (JSON/CSV).
    *   **Paso 2:** Firma criptográfica en la pasarela o contenedor "Sidecar VIVE-X".
    *   **Paso 3:** Registro inalterable Verifactu aceptado por la AEAT de Hacienda y respuesta con código QR legal.
4.  **`src/components/ContactQR.tsx`:** Tarjeta de contacto que genera un **código QR vectorial** (usando `react-qr-code`) para abrir un enlace directo a WhatsApp y pre-redactar el mensaje. Ofrece botones directos para llamar, copiar email, visitar la web o explorar el repositorio de GitHub.
5.  **`src/types.ts`:** Contiene los contratos de interfaces TypeScript compartidos.

---

## 🚀 Guía de Desarrollo Local

Para correr este proyecto en tu entorno local de desarrollo o probar cambios rápidos:

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Iniciar Servidor de Desarrollo:**
    ```bash
    npm run dev
    ```
    El servidor se abrirá en `http://localhost:3000` (con Hot-Reloading listo si se corre fuera de los entornos restringidos).

3.  **Compilar para Producción (Build estática):**
    ```bash
    npm run build
    ```
    Esto compilará el código TypeScript y generará los archivos estáticos listos y optimizados en la carpeta `/dist`.

4.  **Linter de TypeScript:**
    ```bash
    npm run lint
    ```

---

## 📦 Despliegue en GitHub Pages (U Hosting Estático)

El proyecto está diseñado para cargarse de forma ultra rápida sin dependencias pesadas ni servidores dinámicos de backend (100% Client-Side SPA con renderizado estático). 

Para desplegarlo en **GitHub Pages** de forma automática:

1. Instala el paquete de despliegue como dependencia de desarrollo:
   ```bash
   npm install -D gh-pages
   ```
2. Añade las siguientes líneas a tu `package.json`:
   ```json
   "homepage": "https://VIVE-X-Sistemas-y-Servicios.github.io/vivex-landing",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Ejecuta el comando de despliegue:
   ```bash
   npm run deploy
   ```

*(Alternativamente, puedes simplemente arrastrar el contenido de tu directorio `/dist` a servicios sin configuración como **Netlify**, **Vercel**, **Cloudflare Pages** o cargarlo directamente en tu servidor Apache/Nginx local de feria).*

---

## ⚖️ Licencia BSL transitoria a MIT

El software de **VIVE-X** se adhiere al principio honesto y transparente de licencias **BSL (Business Source License)**. Cada versión de software publicada es exclusiva temporalmente, pero se convierte automáticamente de forma irrevocable en código 100% libre (**licencia MIT o GPLv3**) a los **2 años**, protegiendo la inversión de cara al cliente y garantizando su supervivencia sin ataduras de permanencia perpetua.
