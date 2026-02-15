import React from 'react';
import { QuoteData, ValidationErrors } from '../../types';

interface StepQuoteDetailsProps {
    data: QuoteData;
    updateData: (updates: Partial<QuoteData>) => void;
    errors: ValidationErrors;
}

const StepQuoteDetails: React.FC<StepQuoteDetailsProps> = ({ data, updateData, errors }) => {
    const updateInfo = (field: keyof typeof data.info, value: string) => {
        updateData({
            info: {
                ...data.info,
                [field]: value
            }
        });
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center border-b pb-2">
                    <span className="bg-purple-100 text-purple-600 p-1 rounded mr-2 text-sm">📄</span>
                    Detalles del Documento
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Número de Cotización</label>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400 font-mono">#</span>
                            <input
                                className={`w-full pl-8 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${errors['info.number'] ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                value={data.info.number}
                                onChange={(e) => updateInfo('number', e.target.value)}
                                placeholder="001"
                            />
                        </div>
                        {errors['info.number'] && <p className="text-red-500 text-xs mt-1">{errors['info.number']}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Fecha de Emisión</label>
                        <input
                            type="date"
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${errors['info.date'] ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                            value={data.info.date}
                            onChange={(e) => updateInfo('date', e.target.value)}
                        />
                        {errors['info.date'] && <p className="text-red-500 text-xs mt-1">{errors['info.date']}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Moneda</label>
                        <select
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
                            value={data.info.currency}
                            onChange={(e) => updateInfo('currency', e.target.value)}
                        >
                            <option value="USD">USD - Dólar Estadounidense</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="COP">COP - Peso Colombiano</option>
                            <option value="MXN">MXN - Peso Mexicano</option>
                            <option value="CLP">CLP - Peso Chileno</option>
                            <option value="PEN">PEN - Sol Peruano</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Validez de la Oferta</label>
                        <input
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${errors['info.validity'] ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                            value={data.info.validity}
                            onChange={(e) => updateInfo('validity', e.target.value)}
                            placeholder="Ej: 15 días, 1 mes"
                        />
                        {errors['info.validity'] && <p className="text-red-500 text-xs mt-1">{errors['info.validity']}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Forma de Pago</label>
                        <input
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                            value={data.info.paymentMethod}
                            onChange={(e) => updateInfo('paymentMethod', e.target.value)}
                            placeholder="Ej: Transferencia bancaria (50% anticipo)"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center border-b pb-2">
                    <span className="bg-yellow-100 text-yellow-600 p-1 rounded mr-2 text-sm">📝</span>
                    Términos y Condiciones
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Notas Adicionales</label>
                        <textarea
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none h-32 resize-none"
                            value={data.notes}
                            onChange={(e) => updateData({ notes: e.target.value })}
                            placeholder="Notas visibles para el cliente..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Condiciones Legales</label>
                        <textarea
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none h-32 resize-none"
                            value={data.conditions}
                            onChange={(e) => updateData({ conditions: e.target.value })}
                            placeholder="Términos legales del servicio..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepQuoteDetails;
