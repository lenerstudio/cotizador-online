import React from 'react';
import QuoteDocument from '../QuoteDocument';
import { QuoteData } from '../../types';

interface TemplatePreviewProps {
    template: string;
}

const mockData: QuoteData = {
    company: {
        name: 'Tu Empresa',
        email: 'contacto@empresa.com',
        phone: '+1 234 567 890',
        website: 'www.empresa.com',
        address: 'Calle Principal 123',
        executive: 'Juan Pérez',
        taxId: '123456789'
    },
    client: {
        name: 'Cliente Ejemplo',
        email: 'cliente@email.com',
        phone: '+1 987 654 321',
        address: 'Av. Cliente 456',
        contactPerson: 'María García',
        taxId: 'ABC-123456',
        website: 'www.cliente.com'
    },
    info: {
        number: '001',
        date: '25/10/2023',
        validity: '25/11/2023',
        currency: 'USD',
        paymentMethod: 'Transferencia'
    },
    items: [
        { id: 1, name: 'Servicio Profesional', quantity: 1, price: 1000, discount: 0 },
        { id: 2, name: 'Producto Premium', quantity: 2, price: 500, discount: 10 }
    ],
    notes: 'Nota: Esta es una vista previa.',
    conditions: 'Términos estándar.',
    taxRate: 18,
    color: '#3b82f6', // Default blue
    logo: null,
    template: 'modern'
};

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template }) => {
    // Override template and color based on template type for better preview if needed
    const previewData = { ...mockData, template };

    // Adjust colors for specific templates if needed to match the selection card style
    if (template === 'bold') previewData.color = '#ef4444'; // Red for bold
    if (template === 'elegant') previewData.color = '#6366f1'; // Indigo for elegant
    if (template === 'classic') previewData.color = '#6b7280'; // Gray for classic
    if (template === 'minimal') previewData.color = '#000000'; // Black for minimal

    return (
        <div className="w-full h-full overflow-hidden bg-gray-50 relative select-none pointer-events-none rounded-t-lg">
            {/* Scale container to fit the QuoteDocument (which is max-w-4xl ~ 896px) into a small card (approx 200px width) */}
            {/* 200 / 900 = ~0.22 */}
            <div className="transform scale-[0.22] origin-top-left w-[450%] h-[450%] bg-white">
                <QuoteDocument data={previewData} />
            </div>
        </div>
    );
};

export default TemplatePreview;
