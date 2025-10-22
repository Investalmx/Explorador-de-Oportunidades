
import React, { useState, useMemo, useCallback } from 'react';
import { Page, Answers, Opportunity, Category } from './types';
import { Logo } from './constants';
import ExplorerPage from './components/ExplorerPage';
import ResultsPage from './components/ResultsPage';
import SimulatorPage from './components/SimulatorPage';
import NoNominativoPage from './components/NoNominativoPage';
import { generateActionPlan } from './services/geminiService';

const HomePage: React.FC<{ onStart: () => void; onNoNominativo: () => void }> = ({ onStart, onNoNominativo }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-4">
        <div className="max-w-4xl">
            <div className="inline-block mb-8">
                <Logo />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-neutral tracking-tight mb-6">
                Descubre el <span className="text-primary">Potencial Oculto</span> en tus Finanzas
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
                Nuestra plataforma te ayuda a explorar tus flujos, identificar oportunidades y simular el impacto de tus decisiones para un crecimiento acelerado.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                <button onClick={onStart} className="px-10 py-5 bg-primary text-white font-bold rounded-full text-xl hover:bg-blue-800 transition transform hover:scale-105 shadow-lg">
                    Comenzar Diagnóstico Gratuito
                </button>
                <button onClick={onNoNominativo} className="px-10 py-5 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full text-xl hover:from-green-600 hover:to-teal-600 transition transform hover:scale-105 shadow-lg">
                    Ver Servicio No Nominativo
                </button>
            </div>
            <div className="mb-16 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-2xl p-6 shadow-xl">
                <p className="text-2xl font-bold text-gray-900 mb-2">
                    ¡Ahorra hasta 80% en ISR! 💰
                </p>
                <p className="text-gray-700">
                    Descubre cómo nuestro servicio No Nominativo puede transformar tu carga fiscal
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg text-neutral mb-2">1. Explora</h3>
                    <p className="text-gray-500">Responde preguntas clave sobre tu operación.</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg text-neutral mb-2">2. Descubre</h3>
                    <p className="text-gray-500">Recibe un análisis de oportunidades a tu medida.</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg text-neutral mb-2">3. Simula</h3>
                    <p className="text-gray-500">Visualiza el impacto de los cambios en tiempo real.</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg text-neutral mb-2">4. Decide</h3>
                    <p className="text-gray-500">Toma acciones informadas con un plan claro.</p>
                </div>
            </div>
        </div>
    </div>
);

const PrioritizerPage: React.FC<{ opportunities: Opportunity[]; onNavigate: (page: Page) => void; }> = ({ opportunities, onNavigate }) => {
    const [filter, setFilter] = useState<'impact' | 'urgency' | 'ease' | 'all'>('all');
    const [plan, setPlan] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const filteredOpportunities = useMemo(() => {
        if (filter === 'all') return opportunities;
        return [...opportunities].sort((a, b) => {
            const order = { 'Alto': 3, 'Alta': 3, 'Fácil': 3, 'Medio': 2, 'Media': 2, 'Moderado': 2, 'Bajo': 1, 'Baja': 1, 'Difícil': 1 };
            if (filter === 'impact') return order[b.impact] - order[a.impact];
            if (filter === 'urgency') return order[b.urgency] - order[a.urgency];
            if (filter === 'ease') return order[b.ease] - order[a.ease];
            return 0;
        });
    }, [filter, opportunities]);

    const handleGeneratePlan = async () => {
        setIsLoading(true);
        setPlan(null);
        const actionPlan = await generateActionPlan(filteredOpportunities);
        setPlan(actionPlan);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-base-200 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-neutral mb-4">Priorizador de Oportunidades</h1>
                <p className="text-lg text-gray-600 mb-8">Filtra y ordena las oportunidades para enfocarte en lo más importante.</p>

                <div className="flex flex-wrap gap-4 mb-8">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full font-semibold ${filter === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}>Todas</button>
                    <button onClick={() => setFilter('impact')} className={`px-4 py-2 rounded-full font-semibold ${filter === 'impact' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}>Por Impacto</button>
                    <button onClick={() => setFilter('urgency')} className={`px-4 py-2 rounded-full font-semibold ${filter === 'urgency' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}>Por Urgencia</button>
                    <button onClick={() => setFilter('ease')} className={`px-4 py-2 rounded-full font-semibold ${filter === 'ease' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}>Por Facilidad</button>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <ul className="divide-y divide-gray-200">
                        {filteredOpportunities.map(op => (
                            <li key={op.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-neutral">{op.title}</h3>
                                    <p className="text-gray-600">{op.recommendation}</p>
                                </div>
                                <div className="flex gap-2 mt-2 md:mt-0">
                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-800">{op.impact}</span>
                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-800">{op.urgency}</span>
                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-800">{op.ease}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-12 text-center">
                    <button onClick={handleGeneratePlan} disabled={isLoading} className="px-8 py-4 bg-secondary text-white font-bold rounded-lg text-lg hover:bg-green-600 transition disabled:bg-gray-400">
                        {isLoading ? 'Generando Plan...' : 'Ver Plan de Acción Sugerido (IA)'}
                    </button>
                </div>
                
                {plan && (
                    <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl">
                        <h2 className="text-2xl font-bold text-neutral mb-4">Plan de Acción Sugerido</h2>
                        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">{plan}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-8">
            <div className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-2xl">
                <h1 className="text-4xl font-bold text-secondary mb-4">¡Gracias!</h1>
                <p className="text-xl text-gray-700">Hemos recibido tu solicitud. Un miembro de nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para agendar tu diagnóstico personalizado.</p>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-8 flex items-center justify-center">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
                <h1 className="text-4xl font-extrabold text-neutral mb-4">Revisión Personalizada</h1>
                <p className="text-lg text-gray-600 mb-8">Agenda una sesión con nuestros expertos para un análisis profundo de tu flujo financiero y una estrategia a la medida de tu negocio.</p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                        <input type="text" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
                    </div>
                     <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">Empresa</label>
                        <input type="text" id="company" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
                    </div>
                    <div>
                        <label htmlFor="documents" className="block text-sm font-medium text-gray-700">Adjuntar documentos (opcional)</label>
                        <input type="file" id="documents" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                        <p className="text-xs text-gray-500 mt-1">Excel, estados financieros, contratos, etc.</p>
                    </div>
                    <button type="submit" className="w-full py-3 px-4 bg-secondary text-white font-bold rounded-lg text-lg hover:bg-green-600 transition">
                        Quiero que Investal revise mi flujo
                    </button>
                </form>
            </div>
            <div className="hidden md:block bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/800/1200?grayscale&blur=2')"}}></div>
        </div>
    </div>
  );
};


const generateOpportunities = (answers: Answers): Opportunity[] => {
  const opportunities: Opportunity[] = [];
  if (answers.cuentasVencidas === 'Sí') opportunities.push({ id: 'op1', category: Category.Ingresos, title: 'Cuentas por Cobrar Vencidas', description: 'Tienes facturas que tus clientes no han pagado a tiempo.', recommendation: 'Implementar un sistema de recordatorios automáticos y políticas de cobro más estrictas.', impact: 'Alto', urgency: 'Alta', ease: 'Moderado', tag: 'Ahorro inmediato' });
  if (Number(answers.diasCobro) > 45) opportunities.push({ id: 'op2', category: Category.Ingresos, title: 'Ciclo de Cobro Extendido', description: `Tu ciclo de cobro de ${answers.diasCobro} días podría estar afectando tu liquidez.`, recommendation: 'Ofrecer descuentos por pronto pago y renegociar plazos con clientes clave.', impact: 'Alto', urgency: 'Media', ease: 'Moderado', tag: 'Capitalización estratégica' });
  if (answers.recordatoriosAutomaticos === 'No') opportunities.push({ id: 'op3', category: Category.Ingresos, title: 'Falta de Automatización en Cobros', description: 'La gestión manual de recordatorios de cobro consume tiempo y es propensa a errores.', recommendation: 'Utilizar software de contabilidad con funciones de recordatorio automático para mejorar la eficiencia y reducir el tiempo de cobro.', impact: 'Medio', urgency: 'Media', ease: 'Fácil', tag: 'Eficiencia' });
  if (answers.pagoAdelantado === 'Sí') opportunities.push({ id: 'op4', category: Category.Egresos, title: 'Pago a Proveedores Acelerado', description: 'Pagar a proveedores antes de cobrar a clientes puede generar un déficit de caja.', recommendation: 'Sincronizar los plazos de pago a proveedores con los plazos de cobro de clientes.', impact: 'Alto', urgency: 'Alta', ease: 'Moderado', tag: 'Capitalización estratégica' });
  if (Number(answers.comisionesBancarias) > 100) opportunities.push({ id: 'op5', category: Category.Egresos, title: 'Altas Comisiones Bancarias', description: `Pagas más de ${answers.comisionesBancarias} USD en comisiones al mes.`, recommendation: 'Negociar con tu banco o explorar otras opciones bancarias con mejores condiciones.', impact: 'Medio', urgency: 'Media', ease: 'Fácil', tag: 'Ahorro inmediato' });
  if (answers.estrategiaFiscal === 'No') opportunities.push({ id: 'op6', category: Category.Impuestos, title: 'Sin Estrategia Fiscal Proactiva', description: 'La falta de una estrategia fiscal puede resultar en un pago de impuestos mayor al necesario.', recommendation: 'Consultar con un asesor fiscal para desarrollar una estrategia que optimice tu carga tributaria aprovechando deducciones y beneficios.', impact: 'Alto', urgency: 'Alta', ease: 'Moderado', tag: 'Riesgo operativo' });
  if (Number(answers.tasaInteresPromedio) > 12) opportunities.push({ id: 'op7', category: Category.Financiamiento, title: 'Tasas de Interés Elevadas', description: `Tu tasa de interés promedio de ${answers.tasaInteresPromedio}% podría ser optimizable.`, recommendation: 'Explorar opciones de refinanciamiento o consolidación de deuda para obtener mejores tasas.', impact: 'Alto', urgency: 'Media', ease: 'Difícil', tag: 'Ahorro inmediato' });
  if (answers.capitalInmovilizado === 'Sí') opportunities.push({ id: 'op8', category: Category.Financiamiento, title: 'Capital Inmovilizado', description: 'Tener capital mal asignado o inmovilizado frena el potencial de crecimiento.', recommendation: 'Realizar un análisis de la estructura de capital para identificar y reasignar fondos a áreas de mayor rendimiento o necesidad estratégica.', impact: 'Alto', urgency: 'Media', ease: 'Difícil', tag: 'Capitalización estratégica' });
  if (answers.plataformasIntegradas !== 'Sí') opportunities.push({ id: 'op9', category: Category.Tecnologia, title: 'Falta de Integración Tecnológica', description: 'Sistemas financieros no integrados generan ineficiencias y dificultan la toma de decisiones.', recommendation: 'Invertir en un ERP o middleware que conecte tus plataformas clave (bancos, facturación, contabilidad) para tener una visión unificada.', impact: 'Medio', urgency: 'Media', ease: 'Difícil', tag: 'Eficiencia' });
  return opportunities;
};

function App() {
  const [page, setPage] = useState<Page>(Page.Home);
  const [answers, setAnswers] = useState<Answers>({});

  const opportunities = useMemo(() => generateOpportunities(answers), [answers]);

  const handleExplorerComplete = (data: Answers) => {
    setAnswers(data);
    setPage(Page.Results);
  };
  
  const handleNavigate = useCallback((newPage: 'simulator' | 'prioritizer' | 'contact' | 'nonominativo') => {
    if (newPage === 'simulator') setPage(Page.Simulator);
    else if (newPage === 'prioritizer') setPage(Page.Prioritizer);
    else if (newPage === 'contact') setPage(Page.Contact);
    else if (newPage === 'nonominativo') setPage(Page.NoNominativo);
  }, []);

  const renderPage = () => {
    switch (page) {
      case Page.Home:
        return <HomePage onStart={() => setPage(Page.Explorer)} onNoNominativo={() => setPage(Page.NoNominativo)} />;
      case Page.Explorer:
        return <ExplorerPage onComplete={handleExplorerComplete} />;
      case Page.Results:
        return <ResultsPage answers={answers} onNavigate={handleNavigate} />;
      case Page.Simulator:
        return <SimulatorPage answers={answers} onNavigate={handleNavigate} />;
      case Page.Prioritizer:
        return <PrioritizerPage opportunities={opportunities} onNavigate={setPage} />;
      case Page.Contact:
        return <ContactPage />;
      case Page.NoNominativo:
        return <NoNominativoPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onStart={() => setPage(Page.Explorer)} onNoNominativo={() => setPage(Page.NoNominativo)} />;
    }
  };

  return (
    <>
       {page !== Page.Home && (
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button onClick={() => setPage(Page.Home)}><Logo /></button>
              <div className="flex items-center space-x-4">
                <button onClick={() => setPage(Page.Explorer)} className={`font-semibold ${page === Page.Explorer ? 'text-primary' : 'text-gray-500 hover:text-primary'}`}>Diagnóstico</button>
                <button onClick={() => setPage(Page.Results)} disabled={!Object.keys(answers).length} className={`font-semibold ${page === Page.Results ? 'text-primary' : 'text-gray-500 hover:text-primary'} disabled:text-gray-300 disabled:cursor-not-allowed`}>Resultados</button>
                <button onClick={() => setPage(Page.Simulator)} disabled={!Object.keys(answers).length} className={`font-semibold ${page === Page.Simulator ? 'text-primary' : 'text-gray-500 hover:text-primary'} disabled:text-gray-300 disabled:cursor-not-allowed`}>Simulador</button>
                <button onClick={() => setPage(Page.NoNominativo)} className={`font-semibold ${page === Page.NoNominativo ? 'text-primary' : 'text-gray-500 hover:text-primary'}`}>No Nominativo</button>
                <button onClick={() => setPage(Page.Contact)} className="px-4 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-green-600 transition">Contactar</button>
              </div>
            </div>
          </nav>
        </header>
       )}
      <main>
        {renderPage()}
      </main>
    </>
  );
}

export default App;
