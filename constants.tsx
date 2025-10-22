
import { Question, Category } from './types';

export const Logo = () => (
    <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <span className="font-bold text-2xl text-neutral">Investal</span>
    </div>
);

export const questions: Question[] = [
  // Ingresos y Cobros
  { id: 'cuentasVencidas', category: Category.Ingresos, text: '¿Tienes cuentas por cobrar vencidas?', type: 'radio', options: ['Sí', 'No'] },
  { id: 'diasCobro', category: Category.Ingresos, text: '¿Cuántos días en promedio tardan en pagarte?', type: 'number' },
  { id: 'clientesConcentrados', category: Category.Ingresos, text: '¿Tienes clientes que concentran más del 30% de tus ingresos?', type: 'radio', options: ['Sí', 'No'] },
  { id: 'cobroDigital', category: Category.Ingresos, text: '¿Usas plataformas de cobro digital?', type: 'radio', options: ['Sí', 'No'] },
  { id: 'comisionesCobro', category: Category.Ingresos, text: '¿Cuánto pagas en comisiones por procesamiento de pagos? (%)', type: 'number' },
  { id: 'penalizaciones', category: Category.Ingresos, text: '¿Tienes penalizaciones por pago tardío activas?', type: 'radio', options: ['Sí', 'No'] },
  { id: 'recordatoriosAutomaticos', category: Category.Ingresos, text: '¿Automatizas tus recordatorios de cobro?', type: 'radio', options: ['Sí', 'No'] },

  // Egresos y Pagos
  { id: 'pagosCalendarizados', category: Category.Egresos, text: '¿Tienes calendarizado tu flujo de pagos?', type: 'radio', options: ['Sí', 'No'] },
  { id: 'pagoAdelantado', category: Category.Egresos, text: '¿Pagas proveedores antes de cobrar a tus clientes?', type: 'radio', options: ['Sí', 'No'] },
  { id: 'comisionesBancarias', category: Category.Egresos, text: '¿Cuánto pagas en comisiones bancarias al mes? (USD)', type: 'number' },
  { id: 'pagosDuplicados', category: Category.Egresos, text: '¿Tienes pagos duplicados o sin contrato vigente?', type: 'radio', options: ['Sí', 'No', 'No estoy seguro'] },
  { id: 'pagoMonedaExtranjera', category: Category.Egresos, text: '¿Pagas en moneda extranjera?', type: 'radio', options: ['Sí', 'No'] },
  { id: 'coberturaCambiaria', category: Category.Egresos, text: '¿Tienes cobertura cambiaria?', type: 'radio', options: ['Sí', 'No'] },
  { id: 'pagosRecurrentesAuto', category: Category.Egresos, text: '¿Automatizas pagos recurrentes?', type: 'radio', options: ['Sí', 'No'] },
  
  // Impuestos y Fiscalidad
  { id: 'estrategiaFiscal', category: Category.Impuestos, text: '¿Tienes una estrategia fiscal activa?', type: 'radio', options: ['Sí', 'No'] },
  { id: 'porcentajeImpuestos', category: Category.Impuestos, text: '¿Qué porcentaje de tus ingresos se va en impuestos?', type: 'number' },
  { id: 'aprovechaDeducciones', category: Category.Impuestos, text: '¿Aprovechas todas las deducciones legales posibles?', type: 'radio', options: ['Sí', 'No', 'No estoy seguro'] },
  { id: 'pagosProvisionalesAlineados', category: Category.Impuestos, text: '¿Pagas provisionales alineados con tu flujo real?', type: 'radio', options: ['Sí', 'No'] },
  
  // Financiamiento
  { id: 'creditosActivos', category: Category.Financiamiento, text: '¿Tienes créditos activos?', type: 'radio', options: ['Sí', 'No'] },
  { id: 'tasaInteresPromedio', category: Category.Financiamiento, text: '¿Cuál es tu tasa promedio de interés anual? (%)', type: 'number' },
  { id: 'simuladoReestructura', category: Category.Financiamiento, text: '¿Has simulado escenarios de pago o reestructura?', type: 'radio', options: ['Sí', 'No'] },
  { id: 'capitalInmovilizado', category: Category.Financiamiento, text: '¿Tienes capital inmovilizado o mal asignado?', type: 'radio', options: ['Sí', 'No', 'No estoy seguro'] },

  // Tecnología y Visualización
  { id: 'herramientasFlujo', category: Category.Tecnologia, text: '¿Qué herramientas usas para visualizar tu flujo? (Ej. Excel, ERP, Software especializado)', type: 'text' },
  { id: 'plataformasIntegradas', category: Category.Tecnologia, text: '¿Tus plataformas financieras están integradas?', type: 'radio', options: ['Sí', 'No', 'Parcialmente'] },
  { id: 'reportesAutomaticos', category: Category.Tecnologia, text: '¿Automatizas reportes financieros?', type: 'radio', options: ['Sí', 'No'] },
  
  // Sensibilidad y Escenarios
  { id: 'simuladoEscenarios', category: Category.Escenarios, text: '¿Has simulado escenarios de crecimiento o contracción?', type: 'radio', options: ['Sí', 'No'] },
  { id: 'sensibilidadIngresos', category: Category.Escenarios, text: '¿Sabes cómo cambia tu flujo si tus ingresos bajan 20%?', type: 'radio', options: ['Sí', 'No'] },

  // Contratos y Legal
  { id: 'contratosImpactoFinanciero', category: Category.Legal, text: '¿Tienes contratos con impacto financiero directo?', type: 'radio', options: ['Sí', 'No'] },
  { id: 'revisionClausulas', category: Category.Legal, text: '¿Revisas cláusulas de pago, penalización o rescisión regularmente?', type: 'radio', options: ['Sí', 'No'] },
];
