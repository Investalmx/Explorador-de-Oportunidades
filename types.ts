
export enum Page {
  Home = 'home',
  Explorer = 'explorer',
  Results = 'results',
  Simulator = 'simulator',
  Prioritizer = 'prioritizer',
  Contact = 'contact',
}

export enum Category {
  Ingresos = 'Ingresos y Cobros',
  Egresos = 'Egresos y Pagos',
  Impuestos = 'Impuestos y Fiscalidad',
  Financiamiento = 'Financiamiento',
  Tecnologia = 'Tecnología y Visualización',
  Escenarios = 'Sensibilidad y Escenarios',
  Legal = 'Contratos y Legal',
}

export type Answers = {
  [key: string]: string | number;
};

export type Question = {
  id: string;
  category: Category;
  text: string;
  type: 'radio' | 'number' | 'text';
  options?: string[];
};

export type Opportunity = {
  id: string;
  category: Category;
  title: string;
  description: string;
  recommendation: string;
  impact: 'Alto' | 'Medio' | 'Bajo';
  urgency: 'Alta' | 'Media' | 'Baja';
  ease: 'Fácil' | 'Moderado' | 'Difícil';
  tag: 'Ahorro inmediato' | 'Capitalización estratégica' | 'Riesgo operativo' | 'Eficiencia';
};
