import React, { useRef, useState } from 'react';
import { Download, Printer, CheckCircle, Mail } from 'lucide-react';
import { QuoteData } from '../../types';
import QuoteDocument from '../QuoteDocument';
// @ts-ignore
import html2pdf from 'html2pdf.js';

interface StepReviewProps {
    data: QuoteData;
    onReset: () => void;
}

const StepReview: React.FC<StepReviewProps> = ({ data, onReset }) => {
    const documentRef = useRef<HTMLDivElement>(null);
    /* Ref specifically for PDF generation, separate from preview */
    const pdfContainerRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handlePrint = () => {
        window.print();
    };

    const handleReset = () => {
        if (window.confirm("¿Estás seguro de que deseas iniciar una nueva cotización? Se perderán todos los datos actuales.")) {
            onReset();
        }
    };

    const handleDownloadPDF = async () => {
        if (isGenerating) return;
        setIsGenerating(true);

        /* Use the dedicated container for PDF generation */
        const element = pdfContainerRef.current;

        if (!element) {
            console.error("PDF container not found");
            setIsGenerating(false);
            return;
        }

        /* Wait a moment to ensure images in the hidden container are rendered */
        await new Promise(resolve => setTimeout(resolve, 500));

        const opt = {
            margin: [0, 0] as [number, number], // Reset margin as we handle it in CSS or let it be 0
            filename: `Cotizacion-${data.info.number || '001'}.pdf`,
            image: { type: 'jpeg' as 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2, // Retain high quality
                useCORS: true,
                logging: false,
                scrollY: 0,
            },
            jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
        };

        try {
            await html2pdf().from(element).set(opt).save();
        } catch (error) {
            console.error("PDF generation failed:", error);
            // Detailed error for better feedback
            alert(`Hubo un error al generar el PDF: ${error instanceof Error ? error.message : 'Error desconocido'}. Intenta usar el botón Imprimir -> Guardar como PDF.`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleEmail = () => {
        const subject = `Cotización #${data.info.number} - ${data.company.name}`;
        const body = `Hola ${data.client.contactPerson || 'Cliente'},\n\nAdjunto encontrarás la cotización #${data.info.number} solicitada.\n\nSaludos,\n${data.company.executive}\n${data.company.name}`;
        window.location.href = `mailto:${data.client.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-8 no-print">
                <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">¡Todo Listo!</h2>
                <p className="text-gray-600">Revisa la información antes de generar el documento final.</p>
            </div>

            {/* Document Preview Area - User sees this */}
            <div className="bg-gray-100 p-4 rounded-lg overflow-auto border border-gray-200 shadow-inner max-h-[600px] no-print-scroll">
                <div className="transform scale-90 origin-top shadow-2xl mx-auto bg-white">
                    <QuoteDocument data={data} ref={documentRef} />
                </div>
            </div>

            {/* Hidden Container for PDF Generation - Library uses this */}
            {/* Using fixed positioning off-screen to ensure it's rendered by the browser but not visible */}
            <div style={{
                position: 'fixed',
                left: '-1000vw',
                top: 0,
                width: '210mm', // A4 Standard Width
                minHeight: '297mm', // A4 Standard Height
                backgroundColor: 'white',
                zIndex: -50
            }}>
                <QuoteDocument data={data} ref={pdfContainerRef} />
            </div>

            <div className="flex justify-center space-x-4 pt-4 no-print flex-wrap gap-y-4">
                <button
                    onClick={handleReset}
                    className="bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 py-3 px-6 rounded-lg font-bold flex items-center transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1"
                >
                    <CheckCircle size={20} className="mr-2" /> {/* Reusing CheckCircle or maybe a RefreshCcw/Trash icon would be better if imported */}
                    Nueva Cotización
                </button>
                <button
                    onClick={handlePrint}
                    className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-bold flex items-center transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1"
                >
                    <Printer size={20} className="mr-2 text-gray-500" />
                    Imprimir
                </button>
                <button
                    onClick={handleDownloadPDF}
                    disabled={isGenerating}
                    className={`bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-bold flex items-center transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${isGenerating ? 'opacity-70 cursor-wait' : 'hover:from-blue-700 hover:to-indigo-700'}`}
                >
                    <Download size={20} className="mr-2" />
                    {isGenerating ? 'Generando...' : 'Descargar PDF'}
                </button>
                <button
                    onClick={handleEmail}
                    className="bg-white border border-blue-200 hover:bg-blue-50 text-blue-700 py-3 px-6 rounded-lg font-bold flex items-center transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1"
                >
                    <Mail size={20} className="mr-2" />
                    Enviar por Correo
                </button>
            </div>
        </div>
    );
};

export default StepReview;
