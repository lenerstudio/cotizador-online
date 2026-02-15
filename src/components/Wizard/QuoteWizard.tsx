import React, { useState } from 'react';
import { QuoteData } from '../../types';
import { useAutosave } from '../../hooks/useAutosave';
import { useQuoteValidation } from '../../hooks/useQuoteValidation';
import StepBranding from './StepBranding';
import StepClient from './StepClient';
import StepQuoteDetails from './StepQuoteDetails';
import StepItems from './StepItems';
import StepReview from './StepReview';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const initialData: QuoteData = {
    logo: null,
    color: '#2563EB', // Default blue
    company: {
        name: '',
        taxId: '',
        address: '',
        website: '',
        executive: '',
        email: '',
        phone: '',
    },
    client: {
        name: '',
        taxId: '',
        address: '',
        website: '',
        contactPerson: '',
        email: '',
        phone: '',
    },
    info: {
        number: '',
        currency: 'USD',
        date: new Date().toISOString().split('T')[0],
        validity: '',
        paymentMethod: '',
    },
    items: [
        { id: 1, name: '', quantity: 1, price: 0, discount: 0 },
    ],
    taxRate: 0,
    notes: '',
    conditions: '',
};

const QuoteWizard: React.FC = () => {
    const [step, setStep] = useState(1);
    const [data, setData] = useAutosave<QuoteData>('quote_wizard_data', initialData);
    const { errors } = useQuoteValidation(data);

    const updateData = (updates: Partial<QuoteData>) => {
        setData(prev => ({ ...prev, ...updates }));
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const renderStep = () => {
        switch (step) {
            case 1: return <StepBranding data={data} updateData={updateData} errors={errors} />;
            case 2: return <StepClient data={data} updateData={updateData} errors={errors} />;
            case 3: return <StepQuoteDetails data={data} updateData={updateData} errors={errors} />;
            case 4: return <StepItems data={data} updateData={updateData} errors={errors} />;
            case 5: return <StepReview data={data} />;
            default: return <StepBranding data={data} updateData={updateData} errors={errors} />;
        }
    };

    const steps = [
        { number: 1, title: 'Empresa' },
        { number: 2, title: 'Cliente' },
        { number: 3, title: 'Detalles' },
        { number: 4, title: 'Ítems' },
        { number: 5, title: 'Revisar' },
    ];

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <div className="text-center mb-10 no-print">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
                    Generador de Cotizaciones
                </h1>
                <p className="text-gray-500 text-lg">Crea documentos profesionales en segundos</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-10 no-print">
                <div className="flex justify-between items-center relative z-10">
                    {steps.map((s) => (
                        <div key={s.number} className="flex flex-col items-center flex-1 cursor-pointer group" onClick={() => setStep(s.number)}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm ${step >= s.number
                                ? 'bg-blue-600 text-white scale-110 shadow-blue-200'
                                : 'bg-white text-gray-400 border border-gray-200 group-hover:border-blue-300'
                                }`}>
                                {s.number}
                            </div>
                            <span className={`mt-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${step >= s.number ? 'text-blue-600' : 'text-gray-400'
                                }`}>
                                {s.title}
                            </span>
                        </div>
                    ))}
                    {/* Background Line */}
                    <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 -z-10 rounded-full">
                        <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-in-out"
                            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden md:min-h-[500px] flex flex-col">
                <div className="p-8 flex-grow">
                    {renderStep()}
                </div>

                {/* Navigation Buttons */}
                <div className="bg-gray-50 border-t border-gray-100 p-6 flex justify-between items-center no-print">
                    <button
                        onClick={prevStep}
                        disabled={step === 1}
                        className={`flex items-center px-6 py-3 rounded-lg font-bold text-sm transition-colors ${step === 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-600 hover:bg-gray-200 bg-white border border-gray-200 shadow-sm'
                            }`}
                    >
                        <ChevronLeft size={16} className="mr-2" />
                        Anterior
                    </button>

                    {step < 5 ? (
                        <button
                            onClick={nextStep}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-sm flex items-center shadow-lg shadow-blue-200 transition-all hover:scale-105"
                        >
                            Siguiente
                            <ChevronRight size={16} className="ml-2" />
                        </button>
                    ) : (
                        <div className="text-gray-500 text-sm font-medium italic">
                            ¡Listo para exportar!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuoteWizard;
