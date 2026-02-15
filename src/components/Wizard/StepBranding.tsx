import React from 'react';
import { Upload } from 'lucide-react';
import { QuoteData, ValidationErrors } from '../../types';

interface StepBrandingProps {
    data: QuoteData;
    updateData: (updates: Partial<QuoteData>) => void;
    errors: ValidationErrors;
}

const StepBranding: React.FC<StepBrandingProps> = ({ data, updateData, errors }) => {
    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                updateData({ logo: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const updateCompany = (field: keyof typeof data.company, value: string) => {
        updateData({
            company: {
                ...data.company,
                [field]: value
            }
        });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Logo Section */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Logo de la Empresa</label>
                    <div className="flex border border-gray-300 rounded-lg overflow-hidden transition-all hover:border-blue-400">
                        <label className="cursor-pointer bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 px-4 border-r border-gray-300 flex items-center transition-colors">
                            <Upload size={18} className="mr-2 text-blue-600" />
                            <span className="font-medium">Subir imagen</span>
                            <input type="file" className="hidden" onChange={handleLogoChange} accept="image/*" />
                        </label>
                        <span className="py-3 px-4 text-gray-500 truncate flex-1 flex items-center bg-white">
                            {data.logo ? 'Logo cargado' : 'Ningún archivo seleccionado'}
                        </span>
                    </div>
                    {data.logo && (
                        <div className="mt-4 p-2 border border-gray-100 rounded-lg inline-block bg-white shadow-sm">
                            <img src={data.logo} alt="Logo Preview" className="h-20 object-contain" />
                        </div>
                    )}
                </div>

                {/* Color Section */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Color Corporativo</label>
                    <div className="flex items-center space-x-4">
                        <div className="relative overflow-hidden w-16 h-16 rounded-full shadow-md border-2 border-white ring-2 ring-gray-200">
                            <input
                                type="color"
                                value={data.color}
                                onChange={(e) => updateData({ color: e.target.value })}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 border-0 cursor-pointer"
                            />
                        </div>
                        <span className="text-gray-600 font-mono text-sm uppercase bg-gray-100 px-3 py-1 rounded">
                            {data.color}
                        </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Este color se usará para destacar elementos en el PDF.</p>
                </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <span className="bg-blue-100 text-blue-600 p-1 rounded mr-2 text-sm">🏢</span>
                    Información de tu Empresa
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group">
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide group-focus-within:text-blue-600 transition-colors">Nombre Empresa *</label>
                        <input
                            required
                            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors['company.name'] ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                            value={data.company.name}
                            onChange={(e) => updateCompany('name', e.target.value)}
                            placeholder="Ej. Mi Empresa S.A."
                        />
                        {errors['company.name'] && <p className="text-red-500 text-xs mt-1">{errors['company.name']}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">ID Fiscal / RUC / NIT</label>
                        <input
                            className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            value={data.company.taxId}
                            onChange={(e) => updateCompany('taxId', e.target.value)}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Dirección</label>
                        <input
                            className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            value={data.company.address}
                            onChange={(e) => updateCompany('address', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Sitio Web</label>
                        <input
                            className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            value={data.company.website}
                            onChange={(e) => updateCompany('website', e.target.value)}
                            placeholder="www.ejemplo.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Nombre del Ejecutivo</label>
                        <input
                            className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            value={data.company.executive}
                            onChange={(e) => updateCompany('executive', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Email Ejecutivo *</label>
                        <input
                            required
                            type="email"
                            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors['company.email'] ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                            value={data.company.email}
                            onChange={(e) => updateCompany('email', e.target.value)}
                        />
                        {errors['company.email'] && <p className="text-red-500 text-xs mt-1">{errors['company.email']}</p>}

                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Teléfono *</label>
                        <input
                            required
                            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors['company.phone'] ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                            value={data.company.phone}
                            onChange={(e) => updateCompany('phone', e.target.value)}
                        />
                        {errors['company.phone'] && <p className="text-red-500 text-xs mt-1">{errors['company.phone']}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepBranding;
