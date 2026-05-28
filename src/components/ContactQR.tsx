import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Globe, Github, MessageSquare, Check, Send, CheckCircle2, ShieldCheck, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

interface ContactQRProps {
  isDarkMode: boolean;
}

export default function ContactQR({ isDarkMode }: ContactQRProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string; message: string } | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isSimulatedResponse, setIsSimulatedResponse] = useState<boolean>(false);

  const contactData = {
    phone: '+34 628 59 12 64',
    phoneRaw: '+34628591264',
    email: 'info@vive-x.net',
    github: 'github.com/VIVE-X-Sistemas-y-Servicios',
    githubFull: 'https://github.com/VIVE-X-Sistemas-y-Servicios',
    web: 'vive-x.net',
    webFull: 'https://vive-x.net',
    whatsappMessage: 'Hola, me interesa conocer más sobre el prototipo de VIVE-X y la futura integración con sistemas de facturación.'
  };

  // Pre-built WhatsApp click link
  const whatsappUrl = `https://wa.me/${contactData.phoneRaw.replace(/\s+/g, '')}?text=${encodeURIComponent(contactData.whatsappMessage)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError('Por favor, rellena todos los campos.');
      return;
    }
    setFormError(null);
    setIsSubmitting(true);
    setResponseMessage(null);
    setIsSimulatedResponse(false);

    const info = { name, email, message };
    setSubmittedData(info);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setResponseMessage(data.message || 'El mensaje se ha procesado correctamente en el servidor.');
        setIsSimulatedResponse(!!data.simulated);

        // Reset inputs
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const errorMsg = data.details 
          ? `${data.error}. ${data.details}` 
          : (data.error || 'Ocurrió un error al despachar tu consulta de contacto. Inténtalo de nuevo.');
        setFormError(errorMsg);
      }
    } catch (err: any) {
      console.error('Error submitting contact form:', err);
      setFormError('No se pudo conectar con el servidor backend. Inténtalo de nuevo en unos momentos o usa las alternativas directas.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 md:py-8" id="contact-section">
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-3xl p-6 md:p-8 backdrop-blur-md transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#050505]/40 border border-white/10 text-white' 
          : 'bg-white/80 border border-slate-200/80 text-slate-900 shadow-xl shadow-slate-100/50'
      }`}>
        
        {/* Left Column: Interactive Contact / Request Form */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest ${
                isDarkMode ? 'bg-cyan-550/10 text-cyan-400 border border-cyan-500/20' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
              }`}>
                Contacto Oficial
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className={`text-[10px] font-mono tracking-wider ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Soporte 24/7 activo</span>
            </div>
            
            <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display mt-2 uppercase italic">
              Solicitar información <span className="text-cyan-400">/</span> Demo
            </h4>
            <p className={`text-xs md:text-sm mt-1.5 font-light leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Escríbenos para recibir asistencia personalizada o resolver dudas específicas sobre la Ley Crea y Crece y el Reglamento Verifactu.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Form fields */}
                <div className="space-y-1">
                  <label htmlFor="form-name" className={`block text-[11px] font-mono uppercase tracking-wider font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                    Nombre Completo
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); if (formError) setFormError(null); }}
                    placeholder="Ej. María Sánchez"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-sans focus:outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-white/5 border border-white/10 text-white focus:border-cyan-500/50 focus:bg-white/10' 
                        : 'bg-slate-50 border border-slate-200 text-slate-900 focus:border-cyan-500/50 focus:bg-white'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="form-email" className={`block text-[11px] font-mono uppercase tracking-wider font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                    Correo Electrónico
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (formError) setFormError(null); }}
                    placeholder="maria@empresa.com"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-sans focus:outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-white/5 border border-white/10 text-white focus:border-cyan-500/50 focus:bg-white/10' 
                        : 'bg-slate-50 border border-slate-200 text-slate-900 focus:border-cyan-500/50 focus:bg-white'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="form-message" className={`block text-[11px] font-mono uppercase tracking-wider font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                    Mensaje o Consulta
                  </label>
                  <textarea
                    id="form-message"
                    rows={3}
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); if (formError) setFormError(null); }}
                    placeholder="Cuéntanos qué ERP utilizas o tus necesidades técnicas..."
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-sans resize-none focus:outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-white/5 border border-white/10 text-white focus:border-cyan-500/50 focus:bg-white/10' 
                        : 'bg-slate-50 border border-slate-200 text-slate-900 focus:border-cyan-500/50 focus:bg-white'
                    }`}
                  />
                </div>

                {formError && (
                  <p className="text-red-400 text-xs font-mono">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all focus:outline-none ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black shadow-lg shadow-cyan-500/10 active:scale-98' 
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg active:scale-98'
                  } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje Directo'}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`p-6 rounded-2xl text-center flex flex-col items-center justify-center space-y-6 border ${
                  isDarkMode ? 'bg-cyan-950/15 border-cyan-800/40 shadow-2xl shadow-cyan-950/25' : 'bg-cyan-50/50 border-cyan-200 shadow-xl'
                }`}
              >
                <div className={`p-3 rounded-full ${
                  isDarkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  <CheckCircle2 className="w-8 h-8 animate-pulse" />
                </div>
                
                <div className="space-y-3">
                  <h5 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                    ¡Mensaje enviado con éxito!
                  </h5>
                  
                  {/* Server feedback */}
                  <div className={`text-xs p-3.5 rounded-xl border text-left leading-relaxed ${
                    isDarkMode ? 'bg-[#003311]/15 border-emerald-500/20 text-emerald-300' : 'bg-emerald-50 border-emerald-250 text-emerald-950'
                  }`}>
                    {responseMessage || 'Tu consulta ha sido enviada de forma directa y segura a info@vive-x.net.'}
                  </div>

                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-650'}`}>
                    Formulario procesado correctamente por el servidor. Nos pondremos en contacto contigo por correo en menos de 2 horas.
                  </p>
                </div>

                <div className="pt-2 w-full border-t border-slate-200/20">
                  <button
                    onClick={() => setIsSuccess(false)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                      isDarkMode 
                        ? 'bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white' 
                        : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm'
                    }`}
                  >
                    Enviar otro formulario
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Touch links & Channels */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-xl font-bold font-display uppercase italic">Canales de Atención</h4>
              <p className={`text-xs mt-1 font-light ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Puedes contactarnos directamente para conocer más detalles sobre el desarrollo y la futura compatibilidad de este prototipo:
              </p>
            </div>

            {/* Grid of contact links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* WhatsApp */}
              <a
                id="cta-whatsapp-direct"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-4 py-3.5 border rounded-xl transition-all group shrink-0 ${
                  isDarkMode 
                    ? 'bg-[#25D366]/5 hover:bg-[#25D366]/10 border-[#25D366]/20 hover:border-[#25D366]/40' 
                    : 'bg-[#25D366]/5 hover:bg-[#25D366]/10 border-[#25D366]/20'
                }`}
              >
                <div className="p-2 bg-[#25D366]/20 text-[#25D366] rounded-lg shrink-0">
                  <MessageSquare className="w-4 h-4 fill-current" />
                </div>
                <div className="text-left min-w-0">
                  <p className={`text-[9px] uppercase tracking-wider font-mono font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>WhatsApp</p>
                  <p className={`text-xs font-semibold truncate group-hover:text-[#25D366] transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{contactData.phone}</p>
                </div>
              </a>

              {/* Email */}
              <a
                id="cta-email-direct"
                href={`mailto:${contactData.email}?subject=${encodeURIComponent('Interés en VIVE-X - Facturación Electrónica')}`}
                className={`flex items-center gap-3 px-4 py-3.5 border rounded-xl transition-all group shrink-0 ${
                  isDarkMode 
                    ? 'bg-cyan-500/5 hover:bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/40' 
                    : 'bg-cyan-50/50 hover:bg-cyan-100/50 border-slate-200 hover:border-cyan-300'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${isDarkMode ? 'bg-cyan-500/15 text-cyan-300' : 'bg-cyan-100 text-cyan-600'}`}>
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className={`text-[9px] uppercase tracking-wider font-mono font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Email</p>
                  <p className={`text-xs font-semibold truncate transition-colors ${
                    isDarkMode ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-cyan-600'
                  }`}>{contactData.email}</p>
                </div>
              </a>

              {/* Web */}
              <a
                id="cta-web-link"
                href={contactData.webFull}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-4 py-3.5 border rounded-xl transition-all group shrink-0 ${
                  isDarkMode 
                    ? 'bg-[#050505]/40 hover:bg-[#050505]/80 border-white/10 hover:border-white/30' 
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-350 shadow-sm'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${isDarkMode ? 'bg-slate-800 text-slate-350' : 'bg-slate-100 text-slate-500'}`}>
                  <Globe className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className={`text-[9px] uppercase tracking-wider font-mono font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Web</p>
                  <p className={`text-xs font-semibold truncate transition-colors ${
                    isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-cyan-600'
                  }`}>{contactData.web}</p>
                </div>
              </a>

              {/* GitHub */}
              <a
                id="cta-github-link"
                href={contactData.githubFull}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-4 py-3.5 border rounded-xl transition-all group shrink-0 ${
                  isDarkMode 
                    ? 'bg-[#050505]/40 hover:bg-[#050505]/80 border-white/10 hover:border-white/30' 
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-350 shadow-sm'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${isDarkMode ? 'bg-slate-800 text-slate-350' : 'bg-slate-100 text-slate-500'}`}>
                  <Github className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className={`text-[9px] uppercase tracking-wider font-mono font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Código Abierto</p>
                  <p className={`text-xs font-semibold truncate transition-colors ${
                    isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-cyan-600'
                  }`}>Sistemas y Servicios</p>
                </div>
              </a>
            </div>
          </div>

          {/* Business Core Trust points with subtle badges */}
          <div className={`pt-3 border-t grid grid-cols-2 gap-x-4 gap-y-2.5 ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
            <div className={`flex items-center gap-2 text-xs font-light ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              <Check className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Sin lock-in de datos</span>
            </div>
            <div className={`flex items-center gap-2 text-xs font-light ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Garantía Verifactu por diseño</span>
            </div>
            <div className={`flex items-center gap-2 text-xs font-light ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              <Check className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Licencia duradera BSL</span>
            </div>
            <div className={`flex items-center gap-2 text-xs font-light ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              <Check className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Despliegue local o VPS</span>
            </div>
          </div>
          
          {/* Honest Note */}
          <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
            isDarkMode ? 'bg-slate-950/60 border-slate-900' : 'bg-slate-50 border-slate-200'
          }`}>
            <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <div className={`text-[11px] leading-relaxed text-left font-light ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Nuestra promesa sincera:</span> Nuestro código se publica con licencia BSL. Esto significa que cada versión se convierte automáticamente en <strong>código 100% libre (MIT/GPL) a los 2 años</strong> de su publicación. Tu software tributario seguirá funcionando para siempre.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
