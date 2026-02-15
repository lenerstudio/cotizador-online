import React from 'react';
import { QuoteData } from '../../types';
import { CheckCircle } from 'lucide-react';
import TemplatePreview from './TemplatePreview';

interface StepTemplatesProps {
    data: QuoteData;
    updateData: (data: Partial<QuoteData>) => void;
}

const templates = [
    { id: 'modern', name: 'Moderna', color: 'bg-blue-100', borderColor: 'border-blue-500' },
    { id: 'classic', name: 'Clásica', color: 'bg-gray-100', borderColor: 'border-gray-500' },
    { id: 'elegant', name: 'Elegante', color: 'bg-indigo-100', borderColor: 'border-indigo-500' },
    { id: 'bold', name: 'Audaz', color: 'bg-red-100', borderColor: 'border-red-500' },
    { id: 'minimal', name: 'Minimalista', color: 'bg-white', borderColor: 'border-black' },
];

const StepTemplates: React.FC<StepTemplatesProps> = ({ data, updateData }) => {
    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Elige el diseño de tu cotización</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        onClick={() => updateData({ template: template.id })}
                        className={`cursor-pointer group relative rounded-xl border-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${data.template === template.id
                            ? `border-blue-500 shadow-blue-100 ring-2 ring-blue-200`
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        {/* Radio Button Indicator */}
                        <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${data.template === template.id
                            ? 'bg-blue-500 border-blue-500'
                            : 'bg-white border-gray-300 group-hover:border-gray-400'
                            }`}>
                            {data.template === template.id && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                        </div>

                        {/* Preview Area (Realistic Thumbnail) */}
                        <div className="h-48 bg-gray-100 rounded-t-lg mx-1 mt-1 relative overflow-hidden ring-1 ring-gray-200">
                            <TemplatePreview template={template.id} />

                            {/* Overlay to prevent interaction and add subtle gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                        </div>

                        {/* Card Body */}
                        <div className="p-4 bg-white rounded-b-xl">
                            <h3 className={`font-bold text-lg ${data.template === template.id ? 'text-blue-600' : 'text-gray-700'}`}>
                                {template.name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                Diseño profesional y limpio
                            </p>
                        </div>

                        {/* Selected overlay (subtle) */}
                        {data.template === template.id && (
                            <div className="absolute inset-0 border-2 border-blue-500 rounded-xl pointer-events-none">
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-sm">
                                    SELECCIONADO
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-8 flex items-start">
                <CheckCircle className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
                <div>
                    <h4 className="font-bold text-blue-800 text-sm">Previsualización inmediata</h4>
                    <p className="text-blue-600 text-sm mt-1">
                        El diseño seleccionado se aplicará automáticamente al documento final en el siguiente paso.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StepTemplates;
