
import React, { useState } from 'react';
import { questions } from '../constants';
import { Category, Answers } from '../types';

interface ExplorerPageProps {
  onComplete: (answers: Answers) => void;
}

const categories = Object.values(Category);

const ExplorerPage: React.FC<ExplorerPageProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const currentCategory = categories[step];
  const categoryQuestions = questions.filter(q => q.category === currentCategory);

  const handleInputChange = (id: string, value: string | number) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const nextStep = () => {
    if (step < categories.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(answers);
  };
  
  const progress = ((step + 1) / categories.length) * 100;

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-neutral mb-2">Diagnóstico Financiero</h2>
          <p className="text-gray-500 mb-6">Paso {step + 1} de {categories.length}: {currentCategory}</p>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
            <div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {categoryQuestions.map(q => (
              <div key={q.id} className="animate-fade-in">
                <label className="block text-lg font-semibold text-gray-700 mb-3">{q.text}</label>
                {q.type === 'radio' && q.options && (
                  <div className="flex flex-wrap gap-4">
                    {q.options.map(option => (
                      <label key={option} className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg transition-all duration-200 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                        <input
                          type="radio"
                          name={q.id}
                          value={option}
                          checked={answers[q.id] === option}
                          onChange={(e) => handleInputChange(q.id, e.target.value)}
                          className="radio radio-primary"
                        />
                        <span className="text-gray-800">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
                {(q.type === 'number' || q.type === 'text') && (
                  <input
                    type={q.type}
                    value={answers[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    placeholder={q.type === 'number' ? '0' : 'Escribe tu respuesta...'}
                    className="w-full max-w-md mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                  />
                )}
              </div>
            ))}
            
            <div className="flex justify-between items-center pt-6 border-t mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 0}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Anterior
              </button>
              {step < categories.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-800 transition"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-green-600 transition"
                >
                  Ver mis resultados
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExplorerPage;
