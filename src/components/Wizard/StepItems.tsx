import React from 'react';
import { Trash2, PlusCircle, AlertCircle } from 'lucide-react';
import { QuoteData, QuoteItem, ValidationErrors } from '../../types';

interface StepItemsProps {
    data: QuoteData;
    updateData: (updates: Partial<QuoteData>) => void;
    errors: ValidationErrors;
}

const StepItems: React.FC<StepItemsProps> = ({ data, updateData, errors }) => {
    const updateItem = (id: number, field: keyof QuoteItem, value: number | string) => {
        const newItems = data.items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        updateData({ items: newItems });
    };

    const addItem = () => {
        updateData({
            items: [
                ...data.items,
                { id: Date.now(), name: '', quantity: 1, price: 0, discount: 0 }
            ]
        });
    };

    const removeItem = (id: number) => {
        if (window.confirm('¿Estás seguro de querer eliminar este ítem?')) {
            updateData({
                items: data.items.filter(item => item.id !== id)
            });
        }
    };

    const subtotal = data.items.reduce((acc, item) => {
        const itemTotal = (item.quantity * item.price) * (1 - item.discount / 100);
        return acc + itemTotal;
    }, 0);

    const taxAmount = subtotal * (data.taxRate / 100);
    const total = subtotal + taxAmount;

    const isAddDisabled = data.items.length > 0 && data.items[data.items.length - 1].name.trim() === '';

    return (
        <div className="animate-fadeIn">
            {errors['items'] && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                    <AlertCircle size={20} className="mr-2" />
                    {errors['items']}
                </div>
            )}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div className="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
                    <h3 className="font-bold text-gray-700">Productos y Servicios</h3>
                    <button
                        onClick={addItem}
                        disabled={isAddDisabled}
                        className={`py-2 px-4 rounded-lg flex items-center font-bold text-sm transition-colors shadow-sm ${isAddDisabled
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                        title={isAddDisabled ? "Completa la descripción del ítem actual antes de añadir otro" : "Añadir nuevo ítem"}
                    >
                        <PlusCircle size={16} className="mr-2" />
                        Añadir Ítem
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 w-5/12">Descripción</th>
                                <th className="px-6 py-3 w-2/12 text-center">Cantidad</th>
                                <th className="px-6 py-3 w-2/12 text-center">Precio Unit.</th>
                                <th className="px-6 py-3 w-1/12 text-center">Desc %</th>
                                <th className="px-6 py-3 w-2/12 text-right">Total</th>
                                <th className="px-6 py-3 w-16"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-gray-400 italic">
                                        No hay ítems añadidos. Haz clic en "Añadir Ítem" para comenzar.
                                    </td>
                                </tr>
                            )}
                            {data.items.map((item) => (
                                <tr key={item.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <input
                                            placeholder="Nombre del producto o servicio"
                                            className={`w-full p-2 border rounded focus:border-blue-500 outline-none ${errors[`items.${item.id}.name`] ? 'border-red-300 bg-red-50' : 'border-blue-100'}`}
                                            value={item.name}
                                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                        />
                                        {errors[`items.${item.id}.name`] && <p className="text-red-500 text-xs mt-1">{errors[`items.${item.id}.name`]}</p>}
                                    </td>
                                    <td className="px-2 py-3">
                                        <input
                                            type="number"
                                            min="1"
                                            className={`w-full p-2 border rounded text-center focus:border-blue-500 outline-none ${errors[`items.${item.id}.quantity`] ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                            value={item.quantity}
                                            onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                                        />
                                        {errors[`items.${item.id}.quantity`] && <p className="text-red-500 text-xs mt-1">{errors[`items.${item.id}.quantity`]}</p>}
                                    </td>
                                    <td className="px-2 py-3">
                                        <div className="relative">
                                            <span className="absolute left-2 top-2 text-gray-400 text-xs">$</span>
                                            <input
                                                type="number"
                                                min="0"
                                                className={`w-full p-2 pl-5 border rounded text-right focus:border-blue-500 outline-none ${errors[`items.${item.id}.price`] ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                                value={item.price}
                                                onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                                            />
                                            {errors[`items.${item.id}.price`] && <p className="text-red-500 text-xs mt-1 absolute right-0 -bottom-4">{errors[`items.${item.id}.price`]}</p>}
                                        </div>
                                    </td>
                                    <td className="px-2 py-3">
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            className="w-full p-2 border border-gray-200 rounded text-center focus:border-blue-500 outline-none"
                                            value={item.discount}
                                            onChange={(e) => updateItem(item.id, 'discount', parseFloat(e.target.value) || 0)}
                                        />
                                    </td>
                                    <td className="px-6 py-3 text-right font-medium text-gray-700">
                                        {((item.quantity * item.price) * (1 - item.discount / 100)).toFixed(2)}
                                    </td>
                                    <td className="px-2 py-3 text-center">
                                        <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 p-2 rounded hover:bg-red-50 transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Totals Section */}
            <div className="flex justify-end">
                <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
                    <div className="flex justify-between items-center text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium">{subtotal.toFixed(2)} {data.info.currency}</span>
                    </div>

                    <div className="flex justify-between items-center text-gray-600">
                        <div className="flex items-center">
                            <span className="mr-2">Impuesto / IVA</span>
                            <select
                                className="border border-gray-200 rounded px-2 py-1 text-sm focus:border-blue-500 outline-none cursor-pointer"
                                value={data.taxRate}
                                onChange={(e) => updateData({ taxRate: parseFloat(e.target.value) })}
                            >
                                <option value="0">0%</option>
                                <option value="10">10%</option>
                                <option value="16">16%</option>
                                <option value="19">19%</option>
                                <option value="21">21%</option>
                            </select>
                        </div>
                        <span className="font-medium">{taxAmount.toFixed(2)} {data.info.currency}</span>
                    </div>

                    <div className="h-px bg-gray-100 my-2"></div>

                    <div className="flex justify-between items-center text-xl font-bold text-gray-800">
                        <span>Total</span>
                        <span>{total.toFixed(2)} {data.info.currency}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepItems;
