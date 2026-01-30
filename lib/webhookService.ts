'use server';

import { createHmac } from 'crypto';

interface ClientData {
    name: string;
    phone: string;
    service: string;
}

export async function generateSignature(payload: string, secret: string): Promise<string> {
    const hmac = createHmac('sha256', secret);
    hmac.update(payload);
    return hmac.digest('hex');
}

export async function notifyClient(citaId: string, status: string, clientData: ClientData) {
    try {
        const webhookUrl = process.env.WEBHOOK_URL || 'http://localhost:5678/webhook/evo-notify';
        const webhookSecret = process.env.WEBHOOK_SECRET;

        // In a real app, you might validate the secret or use a different method.
        // For local n8n, a simple POST is sufficient.

        const payloadData = {
            cita_id: citaId,
            status: status,
            client_name: clientData.name,
            client_phone: clientData.phone,
            service_name: clientData.service,
            timestamp: new Date().toISOString(),
        };

        const payloadString = JSON.stringify(payloadData);
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (webhookSecret) {
            const signature = await generateSignature(payloadString, webhookSecret);
            headers['X-Evo-Signature'] = signature;
        } else {
            console.warn('WEBHOOK_SECRET not set. Request sent without signature.');
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: headers,
            body: payloadString,
        });

        if (!response.ok) {
            console.error('Webhook failed:', response.statusText);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error triggering webhook:', error);
        return false;
    }
}
