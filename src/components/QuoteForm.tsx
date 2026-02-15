import React, { useState, useEffect } from 'react';
import { Trash2, PlusCircle, Upload, Calendar, Download, Printer } from 'lucide-react';

const QuoteForm = () => {
    const [logo, setLogo] = useState(null);
    const [color, setColor] = useState('#000000');

    const [companyInfo, setCompanyInfo] = useState({
        name: '',
        taxId: '',
        address: '',
        website: '',
        executive: '',
        email: '',
        phone: '',
    });

    const [clientInfo, setClientInfo] = useState({
        name: '',
        taxId: '',
        address: '',
        website: '',
        contactPerson: '',
        email: '',
        phone: '',
    });

    const [quoteInfo, setQuoteInfo] = useState({
        number: '',
        currency: 'USD',
        date: new Date().toISOString().split('T')[0],
        validity: '',
        paymentMethod: '',
    });

    const [items, setItems] = useState([
        { id: 1, name: '', quantity: 1, price: 0, discount: 0 },
    ]);

    const [taxRate, setTaxRate] = useState(0);
    const [notes, setNotes] = useState('');
    const [conditions, setConditions] = useState('');

    const handleLogoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setLogo(URL.createObjectURL(e.target.files[0]));
        }
    };

    const updateItem = (id, field, value) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const addItem = () => {
        setItems([...items, { id: Date.now(), name: '', quantity: 1, price: 0, discount: 0 }]);
    };

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const calculateSubtotal = () => {
        return items.reduce((acc, item) => {
            const itemTotal = (item.quantity * item.price) * (1 - item.discount / 100);
            return acc + itemTotal;
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const taxAmount = subtotal * (taxRate / 100);
    const total = subtotal + taxAmount;

    return (
        <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg min-h-screen font-sans text-gray-700">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Crea tu cotización gratis</h1>
                <p className="text-gray-600 mb-2">Ingresa los detalles a cotizar y en segundos tendrás un documento PDF profesional para enviar a tu cliente.</p>
                <a href="#" className="text-teal-600 hover:underline">Aprende a hacer una cotización</a>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                {/* Top Section: Logo & Color */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-black mb-2">Sube tu logo</label>
                        <div className="flex border border-gray-300 rounded overflow-hidden">
                            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 border-r border-gray-300 flex items-center">
                                <Upload size={16} className="mr-2" />
                                Seleccionar archivo
                                <input type="file" className="hidden" onChange={handleLogoChange} accept="image/*" />
                            </label>
                            <span className="py-2 px-4 text-gray-500 truncate flex-1 block">
                                {logo ? 'Logo subido' : 'Ningún archivo seleccionado'}
                            </span>
                        </div>
                        {logo && <img src={logo} alt="Logo" className="mt-2 h-16 object-contain" />}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-black mb-2">Color corporativo</label>
                        <div className="flex items-center">
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="h-10 w-full cursor-pointer border-0 p-0 rounded overflow-hidden"
                            />
                        </div>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Company Info */}
                    <div className="space-y-3">
                        <h3 className="bg-black text-white p-2 font-bold text-sm">Información de tu Empresa</h3>
                        <input placeholder="Nombre empresa *" className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500" value={companyInfo.name} onChange={e => setCompanyInfo({ ...companyInfo, name: e.target.value })} />
                        <input placeholder="ID fiscal" className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500" value={companyInfo.taxId} onChange={e => setCompanyInfo({ ...companyInfo, taxId: e.target.value })} />
                        <input placeholder="Dirección empresa" className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500" value={companyInfo.address} onChange={e => setCompanyInfo({ ...companyInfo, address: e.target.value })} />
                        <input placeholder="Web empresa" className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500" value={companyInfo.website} onChange={e => setCompanyInfo({ ...companyInfo, website: e.target.value })} />
                        <input placeholder="Nombre ejecutivo" className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500" value={companyInfo.executive} onChange={e => setCompanyInfo({ ...companyInfo, executive: e.target.value })} />
                        <input placeholder="Mail ejecutivo *" className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500" value={companyInfo.email} onChange={e => setCompanyInfo({ ...companyInfo, email: e.target.value })} />
                        <input placeholder="Teléfono ejecutivo *" className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500" value={companyInfo.phone} onChange={e => setCompanyInfo({ ...companyInfo, phone: e.target.value })} />
                    </div>

                    {/* Client Info */}
                    <div className="space-y-3">
                        <h3 className="bg-black text-white p-2 font-bold text-sm">Información de tu Cliente</h3>
                        <input placeholder="Nombre cliente *" className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500" value={clientInfo.name} onChange={e => setClientInfo({ ...clientInfo, name: e.target.value })} />
                        <input placeholder="ID fiscal" className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500" value={clientInfo.taxId} onChange={e => setClientInfo({ ...clientInfo, taxId: e.target.value })} />
                        <input placeholder="Dirección cliente" className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500" value={clientInfo.address} onChange={e => setClientInfo({ ...clientInfo, address: e.target.value })} />
                        <input placeholder="Web cliente" className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500" value={clientInfo.website} onChange={e => setClientInfo({ ...clientInfo, website: e.target.value })} />
                        <input placeholder="Persona solicitante" className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500" value={clientInfo.contactPerson} onChange={e => setClientInfo({ ...clientInfo, contactPerson: e.target.value })} />
                        <input placeholder="Mail cliente *" className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500" value={clientInfo.email} onChange={e => setClientInfo({ ...clientInfo, email: e.target.value })} />
                        <input placeholder="Teléfono cliente" className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500" value={clientInfo.phone} onChange={e => setClientInfo({ ...clientInfo, phone: e.target.value })} />
                    </div>

                    {/* Quote Info */}
                    <div className="space-y-3">
                        <h3 className="bg-black text-white p-2 font-bold text-sm">Información de Cotización</h3>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <label className="text-right text-gray-600 text-sm">Número cotización</label>
                            <input placeholder="Número cotización" className="border border-gray-300 rounded px-2 py-1 w-full text-sm" value={quoteInfo.number} onChange={e => setQuoteInfo({ ...quoteInfo, number: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <label className="text-right text-gray-600 text-sm">Tipo de moneda</label>
                            <select className="border border-gray-300 rounded px-2 py-1 w-full text-sm" value={quoteInfo.currency} onChange={e => setQuoteInfo({ ...quoteInfo, currency: e.target.value })}>
                                <option value="USD">-- Selecciona --</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="COP">COP</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <label className="text-right text-gray-600 text-sm">Fecha</label>
                            <div className="relative">
                                <input type="date" className="border border-gray-300 rounded px-2 py-1 w-full text-sm" value={quoteInfo.date} onChange={e => setQuoteInfo({ ...quoteInfo, date: e.target.value })} />
                                {/* <Calendar className="absolute right-2 top-1.5 h-4 w-4 text-gray-400 pointer-events-none" /> */}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <label className="text-right text-gray-600 text-sm">Validez oferta</label>
                            <input placeholder="Ej: 5 días" className="border-b border-gray-300 py-1 w-full focus:outline-none focus:border-blue-500 text-sm" value={quoteInfo.validity} onChange={e => setQuoteInfo({ ...quoteInfo, validity: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <label className="text-right text-gray-600 text-sm">Forma de pago</label>
                            <input placeholder="Ej: Transferencia" className="border-b border-gray-300 py-1 w-full focus:outline-none focus:border-blue-500 text-sm" value={quoteInfo.paymentMethod} onChange={e => setQuoteInfo({ ...quoteInfo, paymentMethod: e.target.value })} />
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <div className="mb-8">
                    <div className="grid grid-cols-12 gap-4 bg-gray-900 text-white p-2 font-bold text-sm mb-2 rounded-t">
                        <div className="col-span-5">Items</div>
                        <div className="col-span-2 text-center">Cantidad</div>
                        <div className="col-span-2 text-center">Precio</div>
                        <div className="col-span-1 text-center">Desc. %</div>
                        <div className="col-span-2 text-right">Total</div>
                    </div>

                    {items.map((item) => (
                        <div key={item.id} className="grid grid-cols-12 gap-4 items-center mb-2 border-b border-gray-100 pb-2 text-sm">
                            <div className="col-span-5">
                                <input
                                    placeholder="Item"
                                    className="w-full p-2 border border-gray-200 rounded"
                                    value={item.name}
                                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                />
                            </div>
                            <div className="col-span-2">
                                <input
                                    type="number"
                                    placeholder="Cant."
                                    className="w-full p-2 border border-gray-200 rounded text-center"
                                    value={item.quantity}
                                    onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <div className="col-span-2">
                                <input
                                    type="number"
                                    placeholder="Precio"
                                    className="w-full p-2 border border-gray-200 rounded text-center"
                                    value={item.price}
                                    onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <div className="col-span-1">
                                <input
                                    type="number"
                                    placeholder="Desc."
                                    className="w-full p-2 border border-gray-200 rounded text-center"
                                    value={item.discount}
                                    onChange={(e) => updateItem(item.id, 'discount', parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <div className="col-span-2 flex items-center justify-end space-x-2">
                                <div className="bg-gray-100 px-3 py-2 rounded w-full text-right font-medium">
                                    {((item.quantity * item.price) * (1 - item.discount / 100)).toFixed(2)}
                                </div>
                                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 bg-transparent p-1">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={addItem}
                        className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center font-bold text-sm transition-colors"
                    >
                        <PlusCircle size={16} className="mr-2" />
                        Añadir artículo
                    </button>
                </div>

                {/* Totals Section */}
                <div className="flex justify-end mb-8">
                    <div className="w-full md:w-1/3 space-y-3">
                        <h3 className="bg-gray-800 text-white p-2 font-bold text-center text-sm rounded-t">Totales</h3>
                        <div className="flex justify-between items-center px-4">
                            <span className="text-gray-600 font-medium">Subtotal</span>
                            <div className="bg-gray-100 py-1 px-3 rounded w-32 text-right">
                                {subtotal.toFixed(2)}
                            </div>
                        </div>
                        <div className="flex justify-between items-center px-4">
                            <span className="text-gray-600 font-medium">Impuesto</span>
                            <div className="flex w-32 space-x-2">
                                <select
                                    className="border border-gray-300 rounded px-1 py-1 w-16 text-sm"
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(parseFloat(e.target.value))}
                                >
                                    <option value="0">0%</option>
                                    <option value="10">10%</option>
                                    <option value="16">16%</option>
                                    <option value="21">21%</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-between items-center px-4 border-t border-gray-100 pt-2">
                            <span className="text-gray-800 font-bold">Total</span>
                            <div className="bg-gray-200 py-1 px-3 rounded w-32 text-right font-bold">
                                {total.toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-2">
                        <h3 className="bg-black text-white p-2 font-bold text-sm">Notas</h3>
                        <textarea
                            className="w-full border border-gray-200 rounded p-3 h-24 focus:outline-none focus:border-blue-500 text-sm"
                            placeholder="Añadir notas aquí..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <h3 className="bg-black text-white p-2 font-bold text-sm">Condiciones</h3>
                        <textarea
                            className="w-full border border-gray-200 rounded p-3 h-24 focus:outline-none focus:border-blue-500 text-sm"
                            placeholder="Añadir condiciones aquí..."
                            value={conditions}
                            onChange={(e) => setConditions(e.target.value)}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 mt-8 pb-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded font-bold flex items-center transition-colors">
                        <Download size={18} className="mr-2" />
                        Descargar
                    </button>
                    <button className="bg-green-700 hover:bg-green-800 text-white py-2 px-6 rounded font-bold flex items-center transition-colors">
                        <Printer size={18} className="mr-2" />
                        Imprimir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuoteForm;
