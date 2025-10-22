
import React, { useMemo } from 'react';
import { Answers, Opportunity, Category } from '../types';

interface ResultsPageProps {
  answers: Answers;
  onNavigate: (page: 'simulator' | 'prioritizer' | 'contact') => void;
}

const generateOpportunities = (answers: Answers): Opportunity[] => {
  const opportunities: Opportunity[] = [];

  // Ingresos
  if (answers.cuentasVencidas === 'Sí') {
    opportunities.push({ id: 'op1', category: Category.Ingresos, title: 'Cuentas por Cobrar Vencidas', description: 'Tienes facturas que tus clientes no han pagado a tiempo.', recommendation: 'Implementar un sistema de recordatorios automáticos y políticas de cobro más estrictas.', impact: 'Alto', urgency: 'Alta', ease: 'Moderado', tag: 'Ahorro inmediato' });
  }
  if (Number(answers.diasCobro) > 45) {
    opportunities.push({ id: 'op2', category: Category.Ingresos, title: 'Ciclo de Cobro Extendido', description: `Tu ciclo de cobro de ${answers.diasCobro} días podría estar afectando tu liquidez.`, recommendation: 'Ofrecer descuentos por pronto pago y renegociar plazos con clientes clave.', impact: 'Alto', urgency: 'Media', ease: 'Moderado', tag: 'Capitalización estratégica' });
  }
   if (answers.recordatoriosAutomaticos === 'No') {
    opportunities.push({ id: 'op3', category: Category.Ingresos, title: 'Falta de Automatización en Cobros', description: 'La gestión manual de recordatorios de cobro consume tiempo y es propensa a errores.', recommendation: 'Utilizar software de contabilidad con funciones de recordatorio automático para mejorar la eficiencia y reducir el tiempo de cobro.', impact: 'Medio', urgency: 'Media', ease: 'Fácil', tag: 'Eficiencia' });
  }

  // Egresos
  if (answers.pagoAdelantado === 'Sí') {
    opportunities.push({ id: 'op4', category: Category.Egresos, title: 'Pago a Proveedores Acelerado', description: 'Pagar a proveedores antes de cobrar a clientes puede generar un déficit de caja.', recommendation: 'Sincronizar los plazos de pago a proveedores con los plazos de cobro de clientes.', impact: 'Alto', urgency: 'Alta', ease: 'Moderado', tag: 'Capitalización estratégica' });
  }
  if (Number(answers.comisionesBancarias) > 100) {
    opportunities.push({ id: 'op5', category: Category.Egresos, title: 'Altas Comisiones Bancarias', description: `Pagas más de ${answers.comisionesBancarias} USD en comisiones al mes.`, recommendation: 'Negociar con tu banco o explorar otras opciones bancarias con mejores condiciones.', impact: 'Medio', urgency: 'Media', ease: 'Fácil', tag: 'Ahorro inmediato' });
  }
  
  // Impuestos
  if (answers.estrategiaFiscal === 'No') {
    opportunities.push({ id: 'op6', category: Category.Impuestos, title: 'Sin Estrategia Fiscal Proactiva', description: 'La falta de una estrategia fiscal puede resultar en un pago de impuestos mayor al necesario.', recommendation: 'Consultar con un asesor fiscal para desarrollar una estrategia que optimice tu carga tributaria aprovechando deducciones y beneficios.', impact: 'Alto', urgency: 'Alta', ease: 'Moderado', tag: 'Riesgo operativo' });
  }

  // Financiamiento
  if (Number(answers.tasaInteresPromedio) > 12) {
    opportunities.push({ id: 'op7', category: Category.Financiamiento, title: 'Tasas de Interés Elevadas', description: `Tu tasa de interés promedio de ${answers.tasaInteresPromedio}% podría ser optimizable.`, recommendation: 'Explorar opciones de refinanciamiento o consolidación de deuda para obtener mejores tasas.', impact: 'Alto', urgency: 'Media', ease: 'Difícil', tag: 'Ahorro inmediato' });
  }
   if (answers.capitalInmovilizado === 'Sí') {
    opportunities.push({ id: 'op8', category: Category.Financiamiento, title: 'Capital Inmovilizado', description: 'Tener capital mal asignado o inmovilizado frena el potencial de crecimiento.', recommendation: 'Realizar un análisis de la estructura de capital para identificar y reasignar fondos a áreas de mayor rendimiento o necesidad estratégica.', impact: 'Alto', urgency: 'Media', ease: 'Difícil', tag: 'Capitalización estratégica' });
  }
  
  // Tecnologia
  if (answers.plataformasIntegradas !== 'Sí') {
    opportunities.push({ id: 'op9', category: Category.Tecnologia, title: 'Falta de Integración Tecnológica', description: 'Sistemas financieros no integrados generan ineficiencias y dificultan la toma de decisiones.', recommendation: 'Invertir en un ERP o middleware que conecte tus plataformas clave (bancos, facturación, contabilidad) para tener una visión unificada.', impact: 'Medio', urgency: 'Media', ease: 'Difícil', tag: 'Eficiencia' });
  }

  return opportunities;
};

const OpportunityCard: React.FC<{ op: Opportunity }> = ({ op }) => {
  const impactColor = { 'Alto': 'bg-red-100 text-red-800', 'Medio': 'bg-yellow-100 text-yellow-800', 'Bajo': 'bg-green-100 text-green-800'}[op.impact];
  const tagColor = 'bg-blue-100 text-blue-800';
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg hover:border-primary transition-all duration-300">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-neutral">{op.title}</h3>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${impactColor}`}>{op.impact}</span>
      </div>
      <p className="text-gray-500 text-sm mb-4">{op.category}</p>
      <p className="text-gray-700 mb-4">{op.description}</p>
      <p className="text-primary font-semibold mb-4">{op.recommendation}</p>
      <span className={`text-xs font-medium px-2 py-1 rounded-md ${tagColor}`}>{op.tag}</span>
    </div>
  );
};


const ResultsPage: React.FC<ResultsPageProps> = ({ answers, onNavigate }) => {
  const opportunities = useMemo(() => generateOpportunities(answers), [answers]);

  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral">Tus Oportunidades Financieras</h1>
          <p className="mt-4 text-lg text-gray-600">Basado en tus respuestas, hemos identificado las siguientes áreas de mejora.</p>
        </div>

        {opportunities.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {opportunities.map(op => <OpportunityCard key={op.id} op={op} />)}
            </div>
             <div className="mt-16 text-center bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-neutral mb-4">¿Listo para el siguiente paso?</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Visualiza cómo estas oportunidades pueden transformar tu flujo de caja o solicita una revisión detallada con nuestros expertos.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button onClick={() => onNavigate('simulator')} className="px-8 py-4 bg-primary text-white font-bold rounded-lg text-lg hover:bg-blue-800 transition transform hover:scale-105">
                    Simular Impacto
                  </button>
                   <button onClick={() => onNavigate('prioritizer')} className="px-8 py-4 bg-accent text-white font-bold rounded-lg text-lg hover:bg-amber-600 transition transform hover:scale-105">
                    Priorizar Oportunidades
                  </button>
                  <button onClick={() => onNavigate('contact')} className="px-8 py-4 bg-secondary text-white font-bold rounded-lg text-lg hover:bg-green-600 transition transform hover:scale-105">
                    Solicitar Revisión Personalizada
                  </button>
                </div>
            </div>
          </>
        ) : (
          <div className="text-center bg-white p-12 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-neutral mb-4">¡Excelente gestión financiera!</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">No hemos detectado oportunidades críticas basadas en tus respuestas. Para un análisis más profundo, no dudes en contactarnos.</p>
            <button onClick={() => onNavigate('contact')} className="px-8 py-4 bg-secondary text-white font-bold rounded-lg text-lg hover:bg-green-600 transition transform hover:scale-105">
              Contactar a un Experto
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
