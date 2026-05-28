import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cloud, Server, Key, Boxes, Check, HelpCircle, ArrowRight, ShieldCheck, Download, Code } from 'lucide-react';

interface BusinessModelProps {
  isDarkMode: boolean;
}

export default function BusinessModel({ isDarkMode }: BusinessModelProps) {
  const [activeTier, setActiveTier] = useState<string>('all');

  const plans = [
    {
      id: 'saas',
      title: 'SaaS (Nube Centralizada)',
      badge: 'Más inmediato',
      price: 'Suscripción Cloud',
      subPrice: 'Soporte y envío plug-and-play',
      icon: Cloud,
      color: 'from-[#06b6d4] to-[#3b82f6]', // Cyan to Blue
      infra: 'Servidores Seguros Cloud de VIVE-X',
      cert: 'Certificado de Sello de Empresa de VIVE-X (Tercero de Confianza ante la AEAT)',
      responsibility: '100% gestionado y mantenido por VIVE-X',
      bullets: [
        'Planes escalables según volumen de facturas',
        'Asistencia por email y soporte técnico',
        'Copias de seguridad automáticas y cifrado AES-256',
        'Firma con sello de empresa delegado por defecto',
        'Sin necesidad de contratar certificado digital propio'
      ]
    },
    {
      id: 'mantenimiento',
      title: 'Mantenimiento Gestionado',
      badge: 'Equilibrado',
      price: 'Mantenimiento Pro',
      subPrice: 'SLA de soporte y actualizaciones',
      icon: Server,
      color: 'from-[#6366f1] to-[#8b5cf6]', // Indigo to Violet
      infra: 'Servidores locales, Nube privada o VPS del Cliente',
      cert: 'Certificado Digital propio del Cliente',
      responsibility: 'Administración y actualizaciones tutorizadas por VIVE-X (SLA)',
      bullets: [
        'Despliegue guiado inicial en tu infraestructura',
        'Garantía de actualización jurídica ante Hacienda en <48h',
        'Monitorización remota del estado del contenedor',
        'Contrato SLA de tiempo de respuesta prioritario',
        'Copias y contingencias autogestionadas asistidas'
      ]
    },
    {
      id: 'bsl',
      title: 'Licencia BSL Self-Hosted',
      badge: 'Autonomía Total',
      price: 'Soporte BSL',
      subPrice: 'Suscripción anual por entorno',
      icon: Key,
      color: 'from-[#3b82f6] to-[#6366f1]', // Blue to Indigo
      infra: 'Infraestructura 100% administrada por el cliente',
      cert: 'Certificado propio de la empresa',
      responsibility: 'Operación técnica y copias por el equipo IT del cliente',
      bullets: [
        'Uso del código fuente bajo licencia comercial bsl',
        'Acceso completo a ramas y parches estables',
        'Auditabilidad completa para oficiales de seguridad',
        'Actualización manual asistida por documentación técnica',
        'Soporte técnico premium opcional disponible'
      ]
    },
    {
      id: 'oem',
      title: 'OEM / Marca Blanca',
      badge: 'Para Integradores ERP',
      price: 'Alianza OEM',
      subPrice: 'Canon fijo de integración ilimitada',
      icon: Boxes,
      color: 'from-[#10b981] to-[#059669]', // Emerald
      infra: 'Empotrado directamente en el instalador del ERP',
      cert: 'Certificado configurable (del usuario o integrador)',
      responsibility: 'Soporte de segundo nivel de programador a programador (Dev-to-Dev)',
      bullets: [
        'Canon de copia ilimitada (sin límite de clientes finales)',
        'Marca blanca: oculta el branding en las llamadas internas',
        'Canal Slack prioritario para desarrolladores core',
        'Documentación técnica para empaquetado custom (Docker/NPM)',
        'Estrategia perfecta para software de gestión existente'
      ]
    }
  ];

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 py-8 md:py-16 transition-all duration-300 relative`} id="business-model-section">
      
      {/* Intro Headings */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold border ${
          isDarkMode 
            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
            : 'bg-cyan-50 text-cyan-800 border-cyan-200'
        }`}>
          <Code className="w-3.5 h-3.5" />
          FILOSOFÍA OPEN-SOURCE Y MODELO DE SOSTENIBILIDAD
        </div>
        
        <h2 className={`text-2xl sm:text-4xl font-extrabold font-display tracking-tight leading-tight ${
          isDarkMode ? 'text-white' : 'text-slate-950'
        }`}>
          Tu software, tu control. Nosotros certificamos.
        </h2>
        
        <p className={`text-sm sm:text-base leading-relaxed font-light ${
          isDarkMode ? 'text-slate-400' : 'text-slate-650'
        }`}>
          El core de VIVE-X se creará como software libre. Cualquiera podrá descargarlo y ejecutarlo localmente gratis. 
          Nuestra propuesta comercial se basa en la **certificación oficial de firmas**, el **mantenimiento regulatorio constante** y la **operación en la nube**.
        </p>
      </div>

      {/* Philosophy Callout Banner */}
      <div className={`mb-12 p-6 rounded-2xl border flex flex-col md:flex-row gap-6 items-center justify-between transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-cyan-950/20 via-[#0a0a0a]/80 to-blue-950/10 border-white/10' 
          : 'bg-gradient-to-r from-cyan-50/70 via-white to-blue-50/50 border-slate-200 shadow-sm'
      }`}>
        <div className="space-y-2 text-left max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${isDarkMode ? 'text-emerald-400' : 'text-emerald-800'}`}>
              Garantía de Ley por diseño
            </span>
          </div>
          <h4 className={`text-lg font-bold font-display ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            ¿Por qué pagar si puedo compilarlo yo mismo?
          </h4>
          <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Hacienda exige que los sistemas que firman documentos certifiquen la inalterabilidad y realicen encadenamiento criptográfico estricto. Al contratar nuestros servicios, te desligas de la responsabilidad legal de auditoría: 
            <strong> VIVE-X aporta su sello oficial de tercero de confianza</strong> para firmar y validar todo el proceso ante la AEAT en tiempo real.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <a
            href="#contact-section"
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all outline-none ${
              isDarkMode 
                ? 'bg-white text-black hover:bg-slate-100' 
                : 'bg-slate-950 text-white hover:bg-slate-800'
            }`}
          >
            <span>Preguntar sobre Licencias</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Navigation Filter in UI to see categories */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {[
          { id: 'all', label: 'Ver todo' },
          { id: 'saas', label: 'Pequeño Comercio / Autónomos' },
          { id: 'mantenimiento', label: 'PYMEs' },
          { id: 'bsl', label: 'Grandes Empresas (IT)' },
          { id: 'oem', label: 'Integradores ERP' }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveTier(btn.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all duration-300 ${
              activeTier === btn.id
                ? (isDarkMode 
                  ? 'bg-cyan-500/15 border border-cyan-500 text-cyan-300' 
                  : 'bg-cyan-50 border border-cyan-500 text-cyan-950 font-bold')
                : (isDarkMode 
                  ? 'bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10' 
                  : 'bg-slate-100 border border-slate-200 text-slate-650 hover:text-slate-900 hover:bg-slate-200')
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {plans
          .filter((p) => activeTier === 'all' || p.id === activeTier)
          .map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.id}
                className={`flex flex-col justify-between border rounded-3xl p-6 transition-all duration-300 relative overflow-hidden group ${
                  isDarkMode 
                    ? 'bg-[#050505]/60 hover:bg-white/[0.03] border-white/10 hover:border-white/20 shadow-2xl' 
                    : 'bg-white hover:bg-slate-50/50 border-slate-200 hover:border-slate-350 shadow-md shadow-slate-100/50'
                }`}
              >
                {/* Background Gradient Hover Spot */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full filter blur-[40px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-300 bg-gradient-to-br ${plan.color}`} />
                
                {/* Header tier card */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] uppercase font-mono tracking-wider font-bold px-2 py-0.5 rounded ${
                      isDarkMode 
                        ? 'bg-white/5 border border-white/10 text-slate-300' 
                        : 'bg-slate-100 border border-slate-200 text-slate-650'
                    }`}>
                      {plan.badge}
                    </span>
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${plan.color} text-black shrink-0 shadow-lg`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-lg font-bold font-display ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {plan.title}
                    </h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className={`text-2xl font-extrabold font-display ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                        {plan.price}
                      </span>
                    </div>
                    <span className={`text-[10.5px] font-mono block ${isDarkMode ? 'text-slate-500' : 'text-slate-450'}`}>
                      {plan.subPrice}
                    </span>
                  </div>

                  <div className={`h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />

                  {/* Architecture comparison items */}
                  <div className="space-y-2.5 text-left text-xs leading-tight">
                    <div>
                      <span className={`text-[10px] uppercase tracking-wider font-semibold block ${isDarkMode ? 'text-slate-500' : 'text-slate-450'}`}>
                        Ubicación del Código:
                      </span>
                      <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {plan.infra}
                      </span>
                    </div>
                    <div>
                      <span className={`text-[10px] uppercase tracking-wider font-semibold block ${isDarkMode ? 'text-slate-500' : 'text-slate-450'}`}>
                        Custodia del Certificado:
                      </span>
                      <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-705'}`}>
                        {plan.cert}
                      </span>
                    </div>
                    <div>
                      <span className={`text-[10px] uppercase tracking-wider font-semibold block ${isDarkMode ? 'text-slate-500' : 'text-slate-450'}`}>
                        Responsabilidad técnica:
                      </span>
                      <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-705'}`}>
                        {plan.responsibility}
                      </span>
                    </div>
                  </div>

                  <div className={`h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />

                  {/* Feature bullets check */}
                  <ul className="space-y-1.5 pt-1">
                    {plan.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px] leading-tight text-left">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className={isDarkMode ? 'text-slate-300' : 'text-slate-650'}>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-2">
                  <a
                    href="#contact-section"
                    className={`w-full py-2 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-1 transition-all outline-none cursor-pointer ${
                      isDarkMode 
                        ? 'bg-white/[0.03] border-white/10 hover:border-white/20 text-slate-200 hover:text-white hover:bg-white/[0.08]' 
                        : 'bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-800 hover:text-neutral-950 hover:bg-slate-100'
                    }`}
                  >
                    <span>Solicitar Demo</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
      </div>

      {/* Comparative Matrix table bottom */}
      <div className={`mt-12 rounded-3xl border overflow-hidden transition-all duration-300 ${
        isDarkMode 
          ? 'bg-[#050505]/40 border-white/10' 
          : 'bg-white border-slate-200/80 shadow-md shadow-slate-100/30'
      }`}>
        <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-slate-200 bg-slate-50/50'}`}>
          <h4 className={`text-base font-bold font-display ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Matriz de Custodia de Datos y Responsabilidades
          </h4>
          <p className={`text-[11px] font-mono mt-0.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-450'}`}>
            Visión rápida comparativa de las tres modalidades principales (SaaS vs Autogestionado)
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-white/5 bg-[#030303]/30' : 'border-slate-150 bg-slate-100/30'}`}>
                <th className={`p-4 font-bold border-r ${isDarkMode ? 'border-white/5 text-slate-300' : 'border-slate-150 text-slate-850'}`}>Servicio / Característica</th>
                <th className={`p-4 font-bold border-r ${isDarkMode ? 'border-white/5 text-slate-300' : 'border-slate-150 text-slate-850'}`}>SaaS (Pata 1)</th>
                <th className={`p-4 font-bold border-r ${isDarkMode ? 'border-white/5 text-slate-300' : 'border-slate-150 text-slate-850'}`}>Mantenimiento Pro (Pata 2)</th>
                <th className={`p-4 font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-850'}`}>Licencia BSL (Pata 3)</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-slate-150'}`}>
              <tr>
                <td className={`p-4 font-semibold border-r ${isDarkMode ? 'border-white/5 text-white' : 'border-slate-150 text-slate-900'}`}>Ubicación del Código</td>
                <td className={`p-4 border-r ${isDarkMode ? 'border-white/5 text-slate-300' : 'border-slate-150 text-slate-600'}`}>Nube centralizada del Proveedor</td>
                <td className={`p-4 border-r ${isDarkMode ? 'border-white/5 text-slate-300' : 'border-slate-150 text-slate-600'}`}>Servidores del Cliente (Docker)</td>
                <td className={`p-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Infraestructura del Cliente</td>
              </tr>
              <tr>
                <td className={`p-4 font-semibold border-r ${isDarkMode ? 'border-white/5 text-white' : 'border-slate-150 text-slate-900'}`}>Sello / Certificado digital</td>
                <td className={`p-4 border-r ${isDarkMode ? 'border-white/5 text-slate-300' : 'border-slate-150 text-slate-600'}`}>VIVE-X (Tercero de Confianza)</td>
                <td className={`p-4 border-r ${isDarkMode ? 'border-white/5 text-slate-300' : 'border-slate-150 text-slate-600'}`}>Cliente (Gestionado o Propio)</td>
                <td className={`p-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Cliente (Autogestionado)</td>
              </tr>
              <tr>
                <td className={`p-4 font-semibold border-r ${isDarkMode ? 'border-white/5 text-white' : 'border-slate-150 text-slate-900'}`}>Mantenimiento de Servidores</td>
                <td className={`p-4 border-r ${isDarkMode ? 'border-white/5 text-slate-300' : 'border-slate-150 text-slate-600'}`}>A cargo del proveedor</td>
                <td className={`p-4 border-r ${isDarkMode ? 'border-white/5 text-slate-300' : 'border-slate-150 text-slate-600'}`}>Proveedor (Monitorización remota)</td>
                <td className={`p-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Cliente (Autónomo)</td>
              </tr>
              <tr>
                <td className={`p-4 font-semibold border-r ${isDarkMode ? 'border-white/5 text-white' : 'border-slate-150 text-slate-900'}`}>Garantías de SLA</td>
                <td className={`p-4 border-r ${isDarkMode ? 'border-white/5 text-slate-300' : 'border-slate-150 text-slate-600'}`}>SLA de Servicio Nube básico</td>
                <td className={`p-4 border-r ${isDarkMode ? 'border-white/5 text-emerald-400' : 'border-slate-150 text-emerald-700 font-medium'}`}>SLA Avanzado regulatorio &lt; 48h</td>
                <td className={`p-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Soporte Comercial ausente</td>
              </tr>
              <tr>
                <td className={`p-4 font-semibold border-r ${isDarkMode ? 'border-white/5 text-white' : 'border-slate-150 text-slate-900'}`}>Modelo Económico</td>
                <td className={`p-4 border-r ${isDarkMode ? 'border-white/5 text-slate-300' : 'border-slate-150 text-slate-600'}`}>Suscripción mensual por volumen de facturas</td>
                <td className={`p-4 border-r ${isDarkMode ? 'border-white/5 text-slate-300' : 'border-slate-150 text-slate-600'}`}>Suscripción de soporte mensual fija</td>
                <td className={`p-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Canon anual de soporte y producción</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
