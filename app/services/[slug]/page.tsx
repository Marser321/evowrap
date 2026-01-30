import React from 'react';
import { notFound } from 'next/navigation';
import { getServices } from '@/lib/services-data';
import ServiceDetailClient from '@/components/services/ServiceDetailClient';

interface ServiceDetailPageProps {
    params: {
        slug: string;
    };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
    const { slug } = await params;
    const services = await getServices();
    const service = services[slug];

    if (!service) {
        return notFound();
    }

    return <ServiceDetailClient service={service} />;
}
