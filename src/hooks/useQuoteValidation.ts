import { useState, useEffect } from 'react';
import { QuoteData, ValidationErrors } from '../types';

export function useQuoteValidation(data: QuoteData) {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        const newErrors: ValidationErrors = {};

        // Company Validations
        if (!data.company.name?.trim()) newErrors['company.name'] = 'Nombre de empresa requerido';
        if (!data.company.email?.trim()) {
            newErrors['company.email'] = 'Email de empresa requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.company.email)) {
            newErrors['company.email'] = 'Formato de email inválido';
        }
        if (!data.company.phone?.trim()) newErrors['company.phone'] = 'Teléfono requerido';

        // Client Validations
        if (!data.client.name?.trim()) newErrors['client.name'] = 'Nombre de cliente requerido';
        if (!data.client.email?.trim()) {
            newErrors['client.email'] = 'Email de cliente requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.client.email)) {
            newErrors['client.email'] = 'Formato de email inválido';
        }

        // Details Validations
        if (!data.info.number?.trim()) newErrors['info.number'] = 'Número de cotización requerido';
        if (!data.info.date) newErrors['info.date'] = 'Fecha requerida';
        if (!data.info.validity?.trim()) newErrors['info.validity'] = 'Validez requerida';

        // Items Validations
        if (data.items.length === 0) {
            newErrors['items'] = 'Debe agregar al menos un ítem';
        }

        data.items.forEach((item) => {
            if (!item.name?.trim()) newErrors[`items.${item.id}.name`] = 'Descripción requerida';
            if (item.quantity <= 0) newErrors[`items.${item.id}.quantity`] = 'Min 1';
            if (item.price < 0) newErrors[`items.${item.id}.price`] = 'No negativo';
        });

        setErrors(newErrors);
        setIsValid(Object.keys(newErrors).length === 0);
    }, [data]);

    return { errors, isValid };
}
