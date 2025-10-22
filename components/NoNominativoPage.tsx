import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface NoNominativoPageProps {
  onNavigate: (page: 'contact') => void;
}

const NoNominativoPage: React.FC<NoNominativoPageProps> = ({ onNavigate }) => {
  const [monthlyFlow, setMonthlyFlow] = useState(100000);
  const [entityType, setEntityType] = useState<'moral' | 'fisica'>('moral');
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Cálculos de ahorro
  const calculations = useMemo(() => {
    const annualFlow = monthlyFlow * 12;
    const currentISR = entityType === 'moral' ? 0.30 : 0.35;
    const ourFee = 0.065;

    const currentTaxes = annualFlow * currentISR;
    const ourCost = annualFlow * ourFee;
    const savings = currentTaxes - ourCost;
    const savingsPercent = ((savings / currentTaxes) * 100);

    return {
      annualFlow,
      currentTaxes,
      ourCost,
      savings,
      savingsPercent,
      currentISR: currentISR * 100
    };
  }, [monthlyFlow, entityType]);

  // Datos para gráfico comparativo
  const comparisonData = [
    {
      name: 'Sistema Tradicional',
      amount: calculations.currentTaxes,
      fill: '#EF4444'
    },
    {
      name: 'No Nominativo',
      amount: calculations.ourCost,
      fill: '#10B981'
    }
  ];

  // Datos para gráfico de dona
  const pieData = [
    { name: 'Ahorras', value: calculations.savings, color: '#10B981' },
    { name: 'Inviertes', value: calculations.ourCost, color: '#3B82F6' }
  ];

  const features = [
    {
      icon: '💳',
      title: 'Terminal Punto de Venta',
      description: 'Procesa pagos de forma segura y eficiente',
      details: [
        'Acepta todas las tarjetas',
        'Tecnología contactless',
        'Integración instantánea',
        'Reportes en tiempo real'
      ],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📱',
      title: 'Wallet Digital',
      description: 'Gestiona tu dinero desde cualquier lugar',
      details: [
        'App móvil intuitiva',
        'Transferencias instantáneas',
        'Historial completo',
        'Notificaciones en tiempo real'
      ],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '💎',
      title: 'Monedero Mastercard',
      description: 'Tu dinero disponible donde lo necesites',
      details: [
        'Válida nacional e internacional',
        'Compras en línea seguras',
        'Retiros en cajeros ATM',
        'Sin comisiones ocultas'
      ],
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)'
        }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-6 animate-fade-in">
              Servicio <span className="text-yellow-300">No Nominativo</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-blue-100 max-w-4xl mx-auto">
              Reduce tu carga fiscal hasta un <span className="font-bold text-yellow-300">80%</span> mientras optimizas tu flujo de efectivo
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">✓</span> 100% Legal
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">✓</span> Implementación Inmediata
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">✓</span> Sin Complicaciones
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Calcula Tu Ahorro
          </h2>
          <p className="text-xl text-gray-600">
            Descubre cuánto podrías ahorrar con nuestro servicio
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Interactive Calculator */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Configura tu Escenario</h3>

            {/* Entity Type Selector */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-700 mb-4">Tipo de Entidad</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setEntityType('moral')}
                  className={`p-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    entityType === 'moral'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Persona Moral
                  <div className="text-sm mt-1 opacity-90">ISR: 30%</div>
                </button>
                <button
                  onClick={() => setEntityType('fisica')}
                  className={`p-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    entityType === 'fisica'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Persona Física
                  <div className="text-sm mt-1 opacity-90">ISR: 35%</div>
                </button>
              </div>
            </div>

            {/* Flow Input */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Flujo Mensual (MXN)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-gray-500">$</span>
                <input
                  type="number"
                  value={monthlyFlow}
                  onChange={(e) => setMonthlyFlow(Number(e.target.value))}
                  className="w-full pl-12 pr-4 py-4 text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all"
                  min="0"
                  step="10000"
                />
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={monthlyFlow}
                onChange={(e) => setMonthlyFlow(Number(e.target.value))}
                className="w-full mt-4 range range-primary"
              />
            </div>

            {/* Results Display */}
            <div className="space-y-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Flujo Anual:</span>
                <span className="text-xl font-bold text-gray-900">
                  ${calculations.annualFlow.toLocaleString('es-MX')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">ISR Actual ({calculations.currentISR}%):</span>
                <span className="text-xl font-bold text-red-600">
                  -${calculations.currentTaxes.toLocaleString('es-MX')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Costo No Nominativo (6.5%):</span>
                <span className="text-xl font-bold text-blue-600">
                  -${calculations.ourCost.toLocaleString('es-MX')}
                </span>
              </div>
              <div className="border-t-2 border-gray-300 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Tu Ahorro Total:</span>
                  <span className="text-3xl font-extrabold text-green-600 animate-pulse">
                    ${calculations.savings.toLocaleString('es-MX')}
                  </span>
                </div>
                <div className="text-center mt-2">
                  <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold">
                    ¡Ahorras {calculations.savingsPercent.toFixed(1)}%!
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Charts */}
          <div className="space-y-8">
            {/* Bar Chart */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Comparativa Anual</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000)}k`} />
                  <Tooltip formatter={(value) => `$${Number(value).toLocaleString('es-MX')}`} />
                  <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Distribución de Recursos</h3>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString('es-MX')}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mastercard Demo Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Tu Dinero, Siempre Disponible
            </h2>
            <p className="text-xl text-gray-300">
              Monedero Mastercard con acceso global
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* 3D Card */}
            <div className="lg:w-1/2 flex justify-center">
              <div
                className="relative cursor-pointer"
                style={{ perspective: '1000px' }}
                onMouseEnter={() => setIsCardFlipped(true)}
                onMouseLeave={() => setIsCardFlipped(false)}
              >
                <div
                  className="relative w-96 h-60 transition-transform duration-700"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0)'
                  }}
                >
                  {/* Front of card */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl shadow-2xl p-8 flex flex-col justify-between"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="text-2xl font-bold">INVESTAL</div>
                      <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <div className="w-12 h-12 bg-white/50 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm opacity-80 mb-2">Número de Tarjeta</div>
                      <div className="text-2xl font-mono tracking-wider mb-4">
                        •••• •••• •••• 4589
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-xs opacity-80">Titular</div>
                          <div className="font-semibold">TU NOMBRE</div>
                        </div>
                        <div className="text-4xl font-bold">Mastercard</div>
                      </div>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="w-full h-16 bg-black mt-8"></div>
                    <div className="p-8">
                      <div className="bg-white h-12 flex items-center justify-end px-4 text-black font-mono">
                        CVV: 123
                      </div>
                      <div className="mt-6 text-xs text-gray-400 leading-relaxed">
                        Esta tarjeta es propiedad de Investal. Úsala responsablemente.
                        Para asistencia llama al 800-INVESTAL.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="text-4xl mb-3">🌍</div>
                <h3 className="font-bold text-xl mb-2">Global</h3>
                <p className="text-gray-300">Válida en millones de establecimientos en todo el mundo</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="text-4xl mb-3">🛒</div>
                <h3 className="font-bold text-xl mb-2">Compras Online</h3>
                <p className="text-gray-300">Compra seguro en cualquier tienda en línea</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-bold text-xl mb-2">Retiros ATM</h3>
                <p className="text-gray-300">Retira efectivo en cualquier cajero automático</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="font-bold text-xl mb-2">Seguro</h3>
                <p className="text-gray-300">Protección contra fraudes y transacciones no autorizadas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Included */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Todo lo que Necesitas, en un Solo Paquete
          </h2>
          <p className="text-xl text-gray-600">
            Servicio completo para la gestión óptima de tu flujo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onMouseEnter={() => setSelectedFeature(index)}
              onMouseLeave={() => setSelectedFeature(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-all duration-500`}></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-8 h-full transform group-hover:scale-105 transition-all duration-300">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>

                {/* Feature details - shows on hover */}
                <div className={`space-y-3 transition-all duration-300 ${
                  selectedFeature === index ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
                }`}>
                  {feature.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`}></div>
                      <span className="text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              ¿Por Qué Elegir No Nominativo?
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <th className="py-6 px-6 text-left text-xl font-bold">Concepto</th>
                  <th className="py-6 px-6 text-center text-xl font-bold">Sistema Tradicional</th>
                  <th className="py-6 px-6 text-center text-xl font-bold bg-green-500">No Nominativo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-6 px-6 font-semibold text-gray-900">ISR Persona Moral</td>
                  <td className="py-6 px-6 text-center text-red-600 font-bold text-xl">30%</td>
                  <td className="py-6 px-6 text-center text-green-600 font-bold text-xl bg-green-50">6.5%</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-6 px-6 font-semibold text-gray-900">ISR Persona Física</td>
                  <td className="py-6 px-6 text-center text-red-600 font-bold text-xl">35%</td>
                  <td className="py-6 px-6 text-center text-green-600 font-bold text-xl bg-green-50">6.5%</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-6 px-6 font-semibold text-gray-900">Terminal POS</td>
                  <td className="py-6 px-6 text-center text-gray-500">Costo adicional</td>
                  <td className="py-6 px-6 text-center text-green-600 font-bold bg-green-50">✓ Incluido</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-6 px-6 font-semibold text-gray-900">Wallet Digital</td>
                  <td className="py-6 px-6 text-center text-gray-500">No disponible</td>
                  <td className="py-6 px-6 text-center text-green-600 font-bold bg-green-50">✓ Incluido</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-6 px-6 font-semibold text-gray-900">Tarjeta Mastercard</td>
                  <td className="py-6 px-6 text-center text-gray-500">Costo adicional</td>
                  <td className="py-6 px-6 text-center text-green-600 font-bold bg-green-50">✓ Incluido</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-6 px-6 font-semibold text-gray-900">Disponibilidad Global</td>
                  <td className="py-6 px-6 text-center text-gray-500">Limitada</td>
                  <td className="py-6 px-6 text-center text-green-600 font-bold bg-green-50">✓ Total</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 30% 50%, white 0%, transparent 50%), radial-gradient(circle at 70% 50%, white 0%, transparent 50%)'
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Comienza a Ahorrar Hoy
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Únete a cientos de empresas que ya están optimizando su carga fiscal de manera legal y eficiente
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-12 py-6 bg-white text-green-600 font-bold rounded-full text-xl hover:bg-gray-100 transition transform hover:scale-110 shadow-2xl"
          >
            Quiero una Demo Personalizada
          </button>
          <p className="mt-6 text-green-100">
            Sin compromiso • Asesoría gratuita • Implementación en 24 horas
          </p>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Legal</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-purple-600 mb-2">24h</div>
              <div className="text-gray-600 font-medium">Implementación</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-green-600 mb-2">80%</div>
              <div className="text-gray-600 font-medium">Ahorro Promedio</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Clientes Satisfechos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoNominativoPage;
