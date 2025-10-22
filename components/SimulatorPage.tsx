
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Answers } from '../types';

interface SimulatorPageProps {
  answers: Answers;
  onNavigate: (page: 'contact') => void;
}

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const calculateCashflow = (
  baseRevenue: number,
  baseExpenses: number,
  diasCobro: number,
  tasaInteres: number,
  cargaFiscal: number
) => {
  const baseDailyRevenue = baseRevenue / 30;
  const initialDiasCobro = 45; // Baseline assumption
  const cashBoost = (initialDiasCobro - diasCobro) * baseDailyRevenue;

  const baseLoan = 200000;
  const initialInterestRate = 0.15; // 15%
  const interestSavings = (baseLoan * initialInterestRate - baseLoan * (tasaInteres / 100)) / 12;

  const basePreTaxProfit = baseRevenue - baseExpenses;
  const initialTaxRate = 0.30; // 30%
  const taxSavings = (basePreTaxProfit * initialTaxRate) - (basePreTaxProfit * (cargaFiscal / 100));

  const monthlyExpenseReduction = interestSavings;
  const monthlyProfitIncrease = taxSavings;

  const originalNetFlow = baseRevenue - baseExpenses - (basePreTaxProfit * initialTaxRate);
  
  return months.map((month, i) => {
    const optimizedExpenses = baseExpenses - monthlyExpenseReduction;
    const optimizedNetFlow = baseRevenue - optimizedExpenses - (basePreTaxProfit * (cargaFiscal / 100));
    const finalOptimizedFlow = i === 0 ? optimizedNetFlow + cashBoost : optimizedNetFlow;

    return {
      month,
      actual: Math.round(originalNetFlow),
      optimizado: Math.round(finalOptimizedFlow),
    };
  });
};

const SimulatorPage: React.FC<SimulatorPageProps> = ({ answers, onNavigate }) => {
  const initialDiasCobro = Number(answers.diasCobro) || 45;
  const initialTasaInteres = Number(answers.tasaInteresPromedio) || 15;
  const initialCargaFiscal = Number(answers.porcentajeImpuestos) || 30;
  
  const [diasCobro, setDiasCobro] = useState(initialDiasCobro);
  const [tasaInteres, setTasaInteres] = useState(initialTasaInteres);
  const [cargaFiscal, setCargaFiscal] = useState(initialCargaFiscal);

  const chartData = useMemo(
    () => calculateCashflow(100000, 70000, diasCobro, tasaInteres, cargaFiscal),
    [diasCobro, tasaInteres, cargaFiscal]
  );
  
  const totalActual = chartData.reduce((acc, item) => acc + item.actual, 0);
  const totalOptimizado = chartData.reduce((acc, item) => acc + item.optimizado, 0);
  const annualImprovement = totalOptimizado - totalActual;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral">Simulador de Impacto</h1>
          <p className="mt-4 text-lg text-gray-600">Ajusta las variables y observa el impacto en tu flujo de caja anual.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-8 rounded-2xl shadow-lg space-y-8">
            <h2 className="text-2xl font-bold text-neutral">Variables de Simulación</h2>
            
            <div>
              <label htmlFor="diasCobro" className="text-lg font-semibold text-gray-700">Días de Cobro</label>
              <div className="flex items-center space-x-4 mt-2">
                <input id="diasCobro" type="range" min="15" max="90" value={diasCobro} onChange={e => setDiasCobro(Number(e.target.value))} className="range range-primary" />
                <span className="font-bold text-primary text-xl w-16 text-center">{diasCobro}</span>
              </div>
            </div>

            <div>
              <label htmlFor="tasaInteres" className="text-lg font-semibold text-gray-700">Tasa de Interés (%)</label>
              <div className="flex items-center space-x-4 mt-2">
                <input id="tasaInteres" type="range" min="3" max="25" step="0.5" value={tasaInteres} onChange={e => setTasaInteres(Number(e.target.value))} className="range range-primary" />
                <span className="font-bold text-primary text-xl w-16 text-center">{tasaInteres}%</span>
              </div>
            </div>

            <div>
              <label htmlFor="cargaFiscal" className="text-lg font-semibold text-gray-700">Carga Fiscal (%)</label>
              <div className="flex items-center space-x-4 mt-2">
                <input id="cargaFiscal" type="range" min="15" max="40" value={cargaFiscal} onChange={e => setCargaFiscal(Number(e.target.value))} className="range range-primary" />
                <span className="font-bold text-primary text-xl w-16 text-center">{cargaFiscal}%</span>
              </div>
            </div>
            
            <div className="pt-6 border-t">
              <h3 className="text-xl font-bold text-neutral">Mejora Anual Estimada:</h3>
              <p className={`text-4xl font-extrabold mt-2 ${annualImprovement >= 0 ? 'text-secondary' : 'text-red-500'}`}>
                ${annualImprovement.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-neutral mb-6">Comparativa de Flujo de Caja Mensual</h2>
            <div className="w-full h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${(Number(value) / 1000)}k`} />
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                    <Legend />
                    <Line type="monotone" dataKey="actual" name="Flujo Actual" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="optimizado" name="Flujo Optimizado" stroke="#10B981" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
            <button onClick={() => onNavigate('contact')} className="px-10 py-5 bg-secondary text-white font-bold rounded-lg text-xl hover:bg-green-600 transition transform hover:scale-105">
                Solicitar Estrategia Personalizada
            </button>
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;
