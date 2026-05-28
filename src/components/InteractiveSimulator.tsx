import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ArrowRight, CheckCircle2, ShieldCheck, Database, Cpu, HelpCircle, Landmark } from 'lucide-react';
import { MockSystem } from '../types';

const MOCK_SYSTEMS: MockSystem[] = [
  {
    id: 'odoo',
    name: 'Odoo ERP',
    icon: '🔌',
    inputDescription: 'Tu Odoo emitirá una factura o ticket como siempre.',
    inputText: `{
  "numero": "FACT-2026-0089",
  "fecha": "2026-05-28",
  "cliente": "Suministros Industriales S.L.",
  "nif_cliente": "B87654321",
  "base": 1200.00,
  "iva": 252.00,
  "total": 1452.00
}`,
    outputText: `✓ FacturaE XML estructurado automáticamente.
✓ Firma digital criptográfica aplicada con tu clave.
✓ Registro Verifactu encadenado (con hash FACT-2026-0088).
✓ Código QR legal generado para impresión.
✓ Enviado a los servidores de la AEAT (Hacienda) en 120ms.`
  },
  {
    id: 'facturascripts',
    name: 'FacturaScripts',
    icon: '🚀',
    inputDescription: 'Crearás una factura en tu servidor FacturaScripts local.',
    inputText: `{
  "factura_id": 9044,
  "cliente_nif": "A1234567B",
  "nombre_comercial": "Construcciones Gómez",
  "lineas": [
    {"descripcion": "Material de obra", "total": 450.00}
  ],
  "impuestos_incluidos": true
}`,
    outputText: `✓ Capturado por el Sidecar de VIVE-X.
✓ Descompuesto en base imponible e IVA (21%).
✓ Sello digital inalterable de Verifactu insertado.
✓ Alta de registro de facturación fiscalmente blindado.
✓ Sincronizado en tiempo real con Hacienda.`
  },
  {
    id: 'excel',
    name: 'Excel / CSV',
    icon: '📊',
    inputDescription: 'Exportarás una fila de tu hoja de cálculo o subirás un CSV.',
    inputText: `Nombre: Clara Gil García
NIF: 44555666Q
BaseImponible: 180.00
Concepto: Sesión Consultoría Legal Autónoma
IVA_Aplicado: 21%
TotalRecibido: 217.80`,
    outputText: `✓ CSV parseado en formato fiscal estándar.
✓ NIF de clienta validado en bases de Hacienda.
✓ Firma jurídica incrustada por la pasarela.
✓ Resuelto el encadenamiento Verifactu obligatorio.
✓ Ticket de Hacienda emitido y QR devuelto para tu PDF.`
  },
  {
    id: 'custom',
    name: 'API (Tu propio sistema)',
    icon: 'code',
    inputDescription: 'Tu programador llamará a nuestra API ultra simple.',
    inputText: `POST /api/v1/facturas HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "client": "55443322H",
  "amount": 80.00,
  "concept": "Suscripción Premium"
}`,
    outputText: `✓ Cabecera de autenticación validada.
✓ Payload convertido a formato FacturaE legal.
✓ Firma digital con tu certificado de empresa.
✓ Enlace SHA-256 inalterable Verifactu.
✓ Respuesta inmediata en 80ms con tu QR oficial.`
  }
];

interface InteractiveSimulatorProps {
  isDarkMode: boolean;
}

export default function InteractiveSimulator({ isDarkMode }: InteractiveSimulatorProps) {
  const [selectedId, setSelectedId] = useState<string>('odoo');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const activeSystem = MOCK_SYSTEMS.find(s => s.id === selectedId) || MOCK_SYSTEMS[0];

  const handleSimulate = () => {
    setIsSimulating(true);
    setStep(1);
    
    setTimeout(() => {
      setStep(2);
    }, 900);

    setTimeout(() => {
      setStep(3);
      setIsSimulating(false);
    }, 1800);
  };

  return (
    <div className={`w-full max-w-5xl mx-auto px-4 py-4 md:py-8 backdrop-blur-md rounded-2xl border transition-all duration-300 overflow-hidden relative ${
      isDarkMode 
        ? 'bg-[#050505]/40 border-white/10 shadow-2xl text-white' 
        : 'bg-white/80 border-slate-200/80 text-slate-900 shadow-xl shadow-slate-100/50'
    }`} id="interactive-simulator">
      
      {/* Tiny Badge */}
      <div className={`absolute top-3 right-4 flex items-center gap-1.5 px-2 font-mono text-[10px] rounded border ${
        isDarkMode 
          ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
          : 'bg-cyan-50 text-cyan-700 border-cyan-200'
      }`}>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        PROTOTIPO ACTIVO
      </div>

      <div className="text-center mb-6 md:mb-8 mt-2">
        <h3 className={`text-xl md:text-2xl font-semibold font-display tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
          Simulador del Futuro "Sidecar Fiscal"
        </h3>
        <p className={`text-xs md:text-sm mt-1 max-w-2xl mx-auto font-light ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Este es un prototipo interactivo de cómo funcionará el Sidecar Fiscal. Tú seguirás usando tu herramienta habitual sin plugins ni intermediarios; nos colocaremos a su lado para gestionar todo lo legal con Hacienda.
        </p>
      </div>

      {/* Systems selector tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {MOCK_SYSTEMS.map((sys) => (
          <button
            key={sys.id}
            id={`btn-sys-${sys.id}`}
            onClick={() => {
              setSelectedId(sys.id);
              setStep(0);
              setIsSimulating(false);
            }}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-all duration-300 relative overflow-hidden cursor-pointer ${
              selectedId === sys.id
                ? (isDarkMode 
                  ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-lg' 
                  : 'bg-cyan-50 border-cyan-500 text-cyan-900 font-bold')
                : (isDarkMode 
                  ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20' 
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-105')
            }`}
          >
            <span className="text-lg md:text-xl shrink-0">
              {sys.id === 'custom' ? '💻' : sys.icon}
            </span>
            <div className="truncate">
              <p className="font-semibold text-xs md:text-sm truncate">{sys.name}</p>
              <p className={`text-[10px] font-mono truncate ${isDarkMode ? 'text-slate-500' : 'text-slate-440'}`}>
                {sys.id === 'excel' ? 'CSV / Tablas' : sys.id === 'custom' ? 'REST API' : 'Planificado'}
              </p>
            </div>
            {selectedId === sys.id && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400" />
            )}
          </button>
        ))}
      </div>

      {/* Interactive Simulator Flowboard */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6 items-center">
        {/* Step 1: Input Data from ERP */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <div className={`rounded-xl border p-4 flex flex-col h-full min-h-[220px] ${
            isDarkMode ? 'bg-[#050505]/80 border-white/10' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`flex items-center gap-2 mb-2 pb-2 border-b ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
              <Database className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
              <span className={`font-mono text-[10px] uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Tu Software ({activeSystem.name})
              </span>
            </div>
            <p className={`text-xs mb-2 font-medium ${isDarkMode ? 'text-cyan-200' : 'text-cyan-800'}`}>
              {activeSystem.inputDescription}
            </p>
            <div className={`rounded-lg p-2.5 flex-grow font-mono text-[11px] select-all overflow-x-auto whitespace-pre no-scrollbar border ${
              isDarkMode 
                ? 'bg-[#0a0a0a] border-white/5 text-slate-300' 
                : 'bg-white border-slate-200 text-slate-800 shadow-inner'
            }`}>
              {activeSystem.inputText}
            </div>
          </div>
        </div>

        {/* Action Button & Anim Trigger */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center gap-3">
          <button
            id="btn-trigger-simulation"
            onClick={handleSimulate}
            disabled={isSimulating}
            className={`w-full max-w-[200px] flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black font-bold text-xs md:text-sm py-3 px-4 rounded-xl shadow-lg shadow-cyan-500/25 transition-all cursor-pointer ${
              isSimulating ? 'opacity-50 cursor-not-allowed scale-95' : 'hover:scale-[1.03] active:scale-95'
            }`}
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? 'animate-pulse' : ''}`} />
            {isSimulating ? 'Procesando...' : 'Procesar ticket'}
          </button>
          
          <div className="hidden lg:flex flex-col items-center gap-1.5">
            <ArrowRight className={`w-5 h-5 transition-colors ${
              step === 1 ? 'text-cyan-400 animate-pulse' : step === 2 ? 'text-emerald-450 animate-pulse' : (isDarkMode ? 'text-slate-800' : 'text-slate-300')
            }`} />
          </div>
        </div>

        {/* Step 2: VIVE-X Sidecar Proxy & Hacienda Response */}
        <div className="lg:col-span-3 grid grid-cols-1 gap-4">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`rounded-xl border border-dashed p-8 text-center flex flex-col items-center justify-center min-h-[220px] ${
                  isDarkMode ? 'bg-[#050505]/45 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <Cpu className={`w-8 h-8 mb-2 animate-bounce ${isDarkMode ? 'text-cyan-600/40' : 'text-cyan-650/40'}`} />
                <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Haz clic en "Procesar ticket"</p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Simula cómo VIVE-X se comunica al instante con Hacienda</p>
              </motion.div>
            )}

            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-xl border p-4 min-h-[220px] transition-all duration-300 flex flex-col justify-between ${
                  step === 1
                    ? (isDarkMode ? 'bg-cyan-950/20 border-cyan-800 glow-cyan' : 'bg-cyan-50/50 border-cyan-300')
                    : (isDarkMode ? 'bg-emerald-950/10 border-emerald-900/60 glow-emerald' : 'bg-emerald-50/50 border-emerald-300')
                }`}
              >
                <div className={`flex items-center justify-between pb-2 border-b mb-2 ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                  <div className="flex items-center gap-2">
                    {step === 1 ? (
                      <Cpu className="w-4 h-4 text-cyan-400 animate-spin" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    )}
                    <span className={`font-mono text-[10px] uppercase tracking-widest font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      Sidecar Fiscal VIVE-X
                    </span>
                  </div>
                  {step === 1 ? (
                    <span className={`px-1.5 py-0.5 text-[9px] rounded font-mono animate-pulse ${isDarkMode ? 'bg-cyan-500/20 text-cyan-300' : 'bg-cyan-100 text-cyan-700'}`}>
                      Sello criptográfico...
                    </span>
                  ) : (
                    <span className={`px-1.5 py-0.5 text-[9px] rounded font-mono font-bold ${isDarkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
                      ✓ FIRMA CORRECTA
                    </span>
                  )}
                </div>

                <div className="flex-grow flex flex-col justify-center">
                  {step === 1 ? (
                    <div className={`space-y-1.5 text-xs font-mono pl-1 ${isDarkMode ? 'text-cyan-200/90' : 'text-cyan-850'}`}>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        <span>Generando documento FacturaE...</span>
                      </div>
                      <div className={`text-[10px] pl-2.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        SHA-256 Hash Chaining: 7fd498...
                      </div>
                    </div>
                  ) : (
                    <div className={`space-y-2 text-xs font-mono ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
                      {activeSystem.outputText.split('\n').map((line, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{line}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-3 pt-2 border-t flex items-center justify-between ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-emerald-500" />
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Verifactu AEAT
                      </span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-semibold flex items-center gap-1 ${
                      isDarkMode ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-800 bg-emerald-100'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Documento Admitido
                    </span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mini warning badge / simple explanation underneath */}
      <div className={`mt-6 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2 text-slate-500">
          <HelpCircle className={`w-4 h-4 shrink-0 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`} />
          <p className={`text-[11px] text-left leading-relaxed ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
            ¿Cómo lo instalamos? Se despliega como un contenedor <strong>Docker</strong> en el mismo servidor de tu software, o en un mini servidor dedicado. No sale ningún dato fuera de tu control.
          </p>
        </div>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded text-[10px] font-mono border ${
            isDarkMode ? 'bg-[#050505]/60 text-slate-400 border-white/10' : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}>
            Firma Homologada
          </span>
          <span className={`px-2 py-1 rounded text-[10px] font-mono border ${
            isDarkMode ? 'bg-[#050505]/60 text-slate-400 border-white/10' : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}>
            Reglamento Verifactu
          </span>
        </div>
      </div>
    </div>
  );
}
