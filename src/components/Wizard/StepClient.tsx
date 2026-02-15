import React from 'react';
import { QuoteData, ValidationErrors } from '../../types';

interface StepClientProps {
    data: QuoteData;
    updateData: (updates: Partial<QuoteData>) => void;
    errors: ValidationErrors;
}

const StepClient: React.FC<StepClientProps> = ({ data, updateData, errors }) => {
    const updateClient = (field: keyof typeof data.client, value: string) => {
        updateData({
            client: {
                ...data.client,
                [field]: value
            }
        });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start">
                <span className="text-2xl mr-3">🤝</span>
                <div>
                    <h3 className="text-lg font-bold text-blue-800">¿A quién va dirigida esta cotización?</h3>
                    <p className="text-blue-600 text-sm">Completa los datos de tu cliente para personalizar el documento.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Nombre del Cliente / Empresa *</label>
                    <input
                        required
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors['client.name'] ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                        value={data.client.name}
                        onChange={(e) => updateClient('name', e.target.value)}
                        placeholder="Nombre completo o Razón Social"
                    />
                    {errors['client.name'] && <p className="text-red-500 text-xs mt-1">{errors['client.name']}</p>}
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">ID Fiscal / RUC / NIT</label>
                    <input
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        value={data.client.taxId}
                        onChange={(e) => updateClient('taxId', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Persona de Contacto</label>
                    <input
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        value={data.client.contactPerson}
                        onChange={(e) => updateClient('contactPerson', e.target.value)}
                        placeholder="Nombre de quien recibe"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Dirección</label>
                    <input
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        value={data.client.address}
                        onChange={(e) => updateClient('address', e.target.value)}
                        placeholder="Calle, Número, Ciudad, CP"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Email *</label>
                    <input
                        required
                        type="email"
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors['client.email'] ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                        value={data.client.email}
                        onChange={(e) => updateClient('email', e.target.value)}
                        placeholder="correo@cliente.com"
                    />
                    {errors['client.email'] && <p className="text-red-500 text-xs mt-1">{errors['client.email']}</p>}
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Teléfono</label>
                    <input
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        value={data.client.phone}
                        onChange={(e) => updateClient('phone', e.target.value)}
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Sitio Web</label>
                    <input
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        value={data.client.website}
                        onChange={(e) => updateClient('website', e.target.value)}
                        placeholder="https://..."
                    />
                </div>
            </div>
        </div>
    );
};

export default StepClient;
