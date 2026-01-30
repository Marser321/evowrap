import { getServices } from '@/lib/services-data';
import ServicesPageClient from '@/components/services/ServicesPageClient';

export default async function ServicesPage() {
    const servicesData = await getServices();

    return <ServicesPageClient data={servicesData} />;
}
