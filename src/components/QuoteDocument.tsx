import { forwardRef } from 'react';
import { QuoteData } from '../types';

interface QuoteDocumentProps {
    data: QuoteData;
}

const QuoteDocument = forwardRef<HTMLDivElement, QuoteDocumentProps>(({ data }, ref) => {
    const subtotal = data.items.reduce((acc, item) => {
        return acc + (item.quantity * item.price) * (1 - item.discount / 100);
    }, 0);
    const taxAmount = subtotal * (data.taxRate / 100);
    const total = subtotal + taxAmount;

    return (
        <div ref={ref} className="bg-white pdf-bg-white p-8 max-w-4xl mx-auto text-sm print:p-0 print:max-w-none" id="quote-document">
            {/* Header */}
            <div className="flex justify-between items-start mb-12">
                <div className="flex items-start">
                    {data.logo && (
                        <div className="mr-6">
                            <img src={data.logo} alt="Logo" className="h-20 max-w-[200px] object-contain" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 pdf-text-gray-900 mb-1">{data.company.name}</h1>
                        <div className="text-gray-500 pdf-text-gray-500 space-y-1">
                            {data.company.address && <p>{data.company.address}</p>}
                            {data.company.website && <p>{data.company.website}</p>}
                            {data.company.email && <p>{data.company.email}</p>}
                            {data.company.phone && <p>{data.company.phone}</p>}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className="text-4xl font-light text-gray-300 pdf-text-gray-300 mb-2">COTIZACIÓN</h2>
                    <p className="text-lg font-bold text-gray-700 pdf-text-gray-700">#{data.info.number}</p>
                    <p className="text-gray-500 pdf-text-gray-500">Fecha: {data.info.date}</p>
                    {data.info.validity && <p className="text-gray-500 pdf-text-gray-500">Válido hasta: {data.info.validity}</p>}
                </div>
            </div>

            {/* Client Info */}
            <div className="mb-12 border-l-4 pl-6 py-2" style={{ borderColor: data.color }}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 pdf-text-gray-400 mb-2">Facturar a</h3>
                <div className="text-gray-800 pdf-text-gray-800">
                    <p className="font-bold text-lg">{data.client.name}</p>
                    {data.client.taxId && <p>ID Fiscal: {data.client.taxId}</p>}
                    {data.client.address && <p>{data.client.address}</p>}
                    {data.client.contactPerson && <p>Atn: {data.client.contactPerson}</p>}
                    {data.client.email && <p>{data.client.email}</p>}
                    {data.client.phone && <p>{data.client.phone}</p>}
                </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
                <table className="w-full">
                    <thead className="bg-gray-50 pdf-bg-gray-50 text-gray-600 pdf-text-gray-600 font-bold uppercase text-xs">
                        <tr>
                            <th className="py-3 px-4 text-left rounded-l-lg">Descripción</th>
                            <th className="py-3 px-4 text-center">Cant.</th>
                            <th className="py-3 px-4 text-right">Precio</th>
                            <th className="py-3 px-4 text-center">Desc.</th>
                            <th className="py-3 px-4 text-right rounded-r-lg">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 pdf-border-gray-100">
                        {data.items.map((item) => (
                            <tr key={item.id} className="text-gray-700 pdf-text-gray-700">
                                <td className="py-4 px-4 font-medium">{item.name}</td>
                                <td className="py-4 px-4 text-center">{item.quantity}</td>
                                <td className="py-4 px-4 text-right">{item.price.toFixed(2)}</td>
                                <td className="py-4 px-4 text-center text-gray-400 pdf-text-gray-400">{item.discount > 0 ? `${item.discount}%` : '-'}</td>
                                <td className="py-4 px-4 text-right font-bold">
                                    {((item.quantity * item.price) * (1 - item.discount / 100)).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Totals & Notes */}
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-7 space-y-6">
                    {data.notes && (
                        <div>
                            <h4 className="font-bold text-gray-800 pdf-text-gray-800 mb-2 text-xs uppercase">Notas</h4>
                            <p className="text-gray-600 pdf-text-gray-600 bg-gray-50 pdf-bg-gray-50 p-4 rounded-lg text-sm whitespace-pre-wrap">{data.notes}</p>
                        </div>
                    )}
                    {data.conditions && (
                        <div>
                            <h4 className="font-bold text-gray-800 pdf-text-gray-800 mb-2 text-xs uppercase">Términos y Condiciones</h4>
                            <p className="text-gray-500 pdf-text-gray-500 text-xs whitespace-pre-wrap">{data.conditions}</p>
                        </div>
                    )}
                    {data.info.paymentMethod && (
                        <div>
                            <h4 className="font-bold text-gray-800 pdf-text-gray-800 mb-2 text-xs uppercase">Forma de Pago</h4>
                            <p className="text-gray-600 pdf-text-gray-600 text-sm">{data.info.paymentMethod}</p>
                        </div>
                    )}
                </div>

                <div className="col-span-5">
                    <div className="bg-gray-50 pdf-bg-gray-50 p-6 rounded-xl space-y-3">
                        <div className="flex justify-between text-gray-600 pdf-text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-medium">{subtotal.toFixed(2)} {data.info.currency}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 pdf-text-gray-600">
                            <span>Impuesto ({data.taxRate}%)</span>
                            <span className="font-medium">{taxAmount.toFixed(2)} {data.info.currency}</span>
                        </div>
                        <div className="border-t border-gray-200 pdf-border-gray-200 my-2 pt-3 flex justify-between items-center">
                            <span className="font-bold text-gray-800 pdf-text-gray-800 text-lg">Total</span>
                            <span className="font-bold text-2xl" style={{ color: data.color }}>
                                {total.toFixed(2)} {data.info.currency}
                            </span>
                        </div>
                    </div>

                    {/* Executive Info / Signature Area */}
                    <div className="mt-12 text-center">
                        <div className="border-t border-gray-300 pdf-border-gray-300 w-2/3 mx-auto pt-2"></div>
                        <p className="font-bold text-gray-800 pdf-text-gray-800">{data.company.executive}</p>
                        <p className="text-gray-500 pdf-text-gray-500 text-xs">{data.company.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default QuoteDocument;
