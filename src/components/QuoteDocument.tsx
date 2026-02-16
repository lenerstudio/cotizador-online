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

    // Template Configurations
    const template = data.template || 'modern';


    // Simplified styling to ensure html2canvas compatibility
    const getStyles = () => {
        switch (template) {
            case 'classic':
                return {
                    container: "font-serif text-gray-800",
                    headerInner: "border-b-2 border-gray-800 pb-6 mb-8 flex justify-between items-end",
                    title: "text-4xl font-bold uppercase tracking-widest text-gray-900",
                    sectionTitle: "border-b border-gray-400 font-bold text-gray-900 uppercase text-sm mb-3 pb-1",
                    tableHeader: "bg-gray-100 text-gray-900 font-bold border-y-2 border-gray-800 uppercase text-xs",
                    tableRow: "border-b border-gray-300",
                    card: "border border-gray-300 p-6 bg-white",
                    totalLabel: "font-bold text-gray-800",
                    totalValue: "font-bold text-xl text-gray-900 border-t-2 border-gray-800 pt-1"
                };
            case 'elegant':
                return {
                    container: "font-sans text-gray-600",
                    headerInner: "text-center mb-12 border-b border-gray-200 pb-8",
                    title: "text-5xl font-light text-gray-800 tracking-tight",
                    sectionTitle: "text-center font-medium text-gray-500 uppercase tracking-[0.2em] text-xs mb-6",
                    tableHeader: "text-gray-500 font-medium tracking-wider text-xs border-b border-gray-100",
                    tableRow: "border-b border-gray-50 hover:bg-gray-50 transition-colors", // Removed /50
                    card: "bg-gray-50 p-8 rounded-2xl", // Removed /50
                    totalLabel: "text-gray-500 font-light",
                    totalValue: "font-light text-3xl text-gray-800"
                };
            case 'bold':
                // Removed negative margins and complex transforms
                return {
                    container: "font-sans text-gray-900",
                    headerInner: "text-white p-12 mb-12 flex justify-between items-center", // Background color appled inline
                    title: "text-5xl font-black italic tracking-tighter text-white",
                    sectionTitle: "bg-black text-white px-3 py-1 font-black uppercase text-sm mb-4 inline-block",
                    tableHeader: "bg-black text-white font-black uppercase text-sm",
                    tableRow: "border-b-2 border-gray-100 font-medium",
                    card: "bg-gray-100 p-6 border-l-8 border-black",
                    totalLabel: "font-black uppercase text-gray-900",
                    totalValue: "font-black text-3xl text-black"
                };
            case 'minimal':
                return {
                    container: "font-mono text-black",
                    headerInner: "mb-16 grid grid-cols-2 gap-8 border-b-4 border-black pb-8",
                    title: "text-3xl font-bold uppercase",
                    sectionTitle: "font-bold underline decoration-2 underline-offset-4 text-black uppercase text-xs mb-4",
                    tableHeader: "border-b-2 border-black text-black font-bold uppercase text-xs",
                    tableRow: "border-b border-dashed border-gray-400",
                    card: "border-2 border-black p-4",
                    totalLabel: "font-bold",
                    totalValue: "font-bold text-xl border-b-4 border-double border-black"
                };
            default: // Modern
                return {
                    container: "font-sans text-gray-700",
                    headerInner: "flex justify-between items-start mb-12",
                    title: "text-4xl font-light text-gray-300",
                    sectionTitle: "text-xs font-bold uppercase tracking-wider text-gray-400 mb-2",
                    tableHeader: "bg-gray-50 text-gray-600 font-bold uppercase text-xs",
                    tableRow: "border-b border-gray-100",
                    card: "bg-gray-50 p-6 rounded-xl",
                    totalLabel: "font-medium text-gray-600",
                    totalValue: "font-bold text-2xl"
                };
        }
    };

    const s = getStyles();

    return (
        <div ref={ref} className={`bg-white pdf-bg-white max-w-4xl mx-auto text-sm print:p-0 print:max-w-none quote-document ${s.container}`}>
            {/* 
                Structure adjusted for Bold template to avoid negative margins.
                For Bold template, we wrap header in a full-width colored div if possible, 
                but since we are inside a padded container, we just apply style to headerInner 
                and maybe adjust padding on the main container.
            */}

            <div className="p-8">
                {/* Header Structure Varies by Template */}
                {template === 'elegant' ? (
                    <div className={s.headerInner}>
                        {data.logo && (
                            <div className="mb-6 flex justify-center">
                                <img src={data.logo} alt="Logo" className="h-24 object-contain" />
                            </div>
                        )}
                        <h1 className={s.title}>COTIZACIÓN</h1>
                        <p className="mt-2 text-lg">#{data.info.number}</p>
                        <div className="mt-4 text-gray-400 text-sm">
                            {data.company.name} | {data.company.website}
                        </div>
                    </div>
                ) : template === 'bold' ? (
                    <div className={`${s.headerInner} -mx-8 -mt-8 shadow-lg`} style={{ backgroundColor: data.color }}>
                        {/* 
                           Note: keeping negative margin JUST for the header to stretch full width, 
                           but ensuring the container handles it. 
                           If this fails, we will remove -mx-8 and just have a contained colored header.
                        */}
                        <div>
                            <h1 className={s.title} style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.2)' }}>COTIZACIÓN</h1>
                            <p className="font-bold text-gray-100 mt-1 uppercase tracking-widest">#{data.info.number}</p> {/* Replaced text-white/80 with text-gray-100 */}
                        </div>
                        {data.logo && (
                            <div className="bg-white p-2 transform rotate-2 shadow-lg">
                                <img src={data.logo} alt="Logo" className="h-16 object-contain" />
                            </div>
                        )}
                    </div>
                ) : (
                    // Standard Header (Modern, Classic, Minimal)
                    <div className={s.headerInner}>
                        <div className="flex items-start">
                            {data.logo && (
                                <div className="mr-6">
                                    <img src={data.logo} alt="Logo" className="h-20 max-w-[200px] object-contain" />
                                </div>
                            )}
                            <div>
                                <h1 className="text-2xl font-bold mb-1" style={{ color: template !== 'minimal' ? data.color : 'black' }}>{data.company.name}</h1>
                                <div className="space-y-1 opacity-80">
                                    {data.company.address && <p>{data.company.address}</p>}
                                    {data.company.website && <p>{data.company.website}</p>}
                                    {data.company.email && <p>{data.company.email}</p>}
                                    {data.company.phone && <p>{data.company.phone}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <h2 className={s.title}>COTIZACIÓN</h2>
                            <p className="text-lg font-bold mt-1">#{data.info.number}</p>
                            <p className="opacity-60 text-xs mt-2">EMITIDA: {data.info.date}</p>
                            {data.info.validity && <p className="opacity-60 text-xs">VÁLIDA: {data.info.validity}</p>}
                        </div>
                    </div>
                )}

                {/* Client Info & Meta Grid */}
                {/* Client Info & Meta Grid */}
                <div className={`grid grid-cols-1 ${template === 'bold' ? 'md:grid-cols-2' : ''} gap-12 mb-12 ${template === 'elegant' ? 'text-center' : ''}`}>
                    <div>
                        <h3 className={s.sectionTitle} style={template === 'bold' ? { backgroundColor: data.color } : {}}>Facturar a</h3>

                        {/* Split Client Data into 2 Columns */}
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${template === 'elegant' ? 'text-left' : ''}`}>
                            {/* Column 1: Name, ID, Address */}
                            <div>
                                <div className="text-lg font-bold mb-1">{data.client.name}</div>
                                <div className="space-y-1 opacity-80">
                                    {data.client.taxId && <p>ID: {data.client.taxId}</p>}
                                    {data.client.address && <p>{data.client.address}</p>}
                                </div>
                            </div>

                            {/* Column 2: Contact, Email, Phone */}
                            <div className="space-y-1 opacity-80">
                                {data.client.contactPerson && <p><span className="font-semibold">Atn:</span> {data.client.contactPerson}</p>}
                                {data.client.email && <p>{data.client.email}</p>}
                                {data.client.phone && <p>{data.client.phone}</p>}
                            </div>
                        </div>
                    </div>

                    <div className={`${template === 'elegant' ? 'flex flex-col items-center' : 'text-right'}`}>
                        {/* For Elegant, we might want to show company info here if it was simpler in header */}
                        {template === 'bold' && (
                            <div className="text-right">
                                <h3 className={s.sectionTitle} style={{ backgroundColor: 'black' }}>Emisor</h3>
                                <p className="font-bold">{data.company.name}</p>
                                <p>{data.company.executive}</p>
                            </div>
                        )}
                        {(template !== 'bold' && template !== 'elegant') && (
                            /* Empty constraint for standard layouts to balance grid if needed, or specific meta */
                            <div className="hidden md:block"></div>
                        )}
                    </div>
                </div>

                {/* Items Table */}
                <div className="mb-8">
                    <table className="w-full">
                        <thead className={s.tableHeader} style={template === 'bold' ? { backgroundColor: 'black' } : {}}>
                            <tr>
                                <th className="py-3 px-4 text-left">Descripción</th>
                                <th className="py-3 px-4 text-center">Cant.</th>
                                <th className="py-3 px-4 text-right">Precio</th>
                                <th className="py-3 px-4 text-center">Desc.</th>
                                <th className="py-3 px-4 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map((item) => (
                                <tr key={item.id} className={s.tableRow}>
                                    <td className="py-4 px-4 font-medium">{item.name}</td>
                                    <td className="py-4 px-4 text-center">{item.quantity}</td>
                                    <td className="py-4 px-4 text-right">{item.price.toFixed(2)}</td>
                                    <td className="py-4 px-4 text-center opacity-60">{item.discount > 0 ? `${item.discount}%` : '-'}</td>
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
                    <div className="col-span-7 space-y-8">
                        {data.notes && (
                            <div>
                                <h4 className={s.sectionTitle} style={template === 'bold' ? { backgroundColor: data.color } : {}}>Notas</h4>
                                <p className="opacity-80 text-sm whitespace-pre-wrap">{data.notes}</p>
                            </div>
                        )}
                        {data.conditions && (
                            <div>
                                <h4 className={s.sectionTitle} style={template === 'bold' ? { backgroundColor: data.color } : {}}>Términos</h4>
                                <p className="opacity-60 text-xs whitespace-pre-wrap">{data.conditions}</p>
                            </div>
                        )}
                        {data.info.paymentMethod && (
                            <div>
                                <h4 className={s.sectionTitle} style={template === 'bold' ? { backgroundColor: data.color } : {}}>Pago</h4>
                                <p className="opacity-80 text-sm">{data.info.paymentMethod}</p>
                            </div>
                        )}
                    </div>

                    <div className="col-span-5">
                        <div className={s.card} style={template === 'bold' ? { borderColor: 'black' } : {}}>
                            <div className="flex justify-between mb-2 opacity-80">
                                <span>Subtotal</span>
                                <span className="font-medium">{subtotal.toFixed(2)} {data.info.currency}</span>
                            </div>
                            <div className="flex justify-between mb-4 opacity-80">
                                <span>Impuesto ({data.taxRate}%)</span>
                                <span className="font-medium">{taxAmount.toFixed(2)} {data.info.currency}</span>
                            </div>
                            <div className={`flex justify-between items-center ${template !== 'classic' ? 'border-t border-gray-200 mt-4 pt-4' : ''}`}>
                                <span className={s.totalLabel}>TOTAL</span>
                                <span className={s.totalValue} style={{ color: (template !== 'minimal' && template !== 'bold') ? data.color : 'inherit' }}>
                                    {total.toFixed(2)} {data.info.currency}
                                </span>
                            </div>
                        </div>

                        {/* Signature */}
                        <div className="mt-16 text-center">
                            <div className="border-t border-current w-2/3 mx-auto pt-2 opacity-40"></div>
                            <p className="font-bold mt-1">{data.company.executive}</p>
                            <p className="text-xs opacity-50">{data.company.email}</p>
                        </div>
                    </div>
                </div>

                {/* Template specific footer branding */}
                {template === 'modern' && (
                    <div className="mt-12 pt-6 border-t border-gray-100 text-center text-gray-400 text-xs">
                        Generado con Cotizador Online
                    </div>
                )}
                {template === 'bold' && (
                    <div className="mt-12 h-4 w-full" style={{ backgroundColor: data.color }}></div>
                )}
            </div>
        </div>
    );
});

export default QuoteDocument;
