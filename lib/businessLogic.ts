
// Business Logic for Evo Wrap
// Rules defined by Maldonado/Punta del Este context

interface LocationContext {
    city: string; // e.g., 'Punta del Este', 'Montevideo', 'Interior'
    isCoastal: boolean;
}

interface MaintenanceSchedule {
    frequencyMonths: number;
    reason: string;
    suggestedProducts: string[];
}

export function calculateMaintenance(serviceType: string, location: LocationContext): MaintenanceSchedule {
    // Default Non-Coastal Rule
    let frequency = 12; // Once a year
    let reason = "Mantenimiento estándar.";
    const products = ["Lavado Neutro"];

    // Rule 1: Salinity Logic (Maldonado/Punta del Este)
    if (location.isCoastal || location.city.includes('Punta del Este') || location.city.includes('Maldonado')) {
        frequency = frequency / 2; // Twice as frequent
        reason = "Alta exposición a salinidad y humedad marina (Corrosión acelerada).";
        products.push("Eliminador de Sal", "Booster Cerámico");
    }

    // Rule 2: Service specific logic
    if (serviceType.includes('Cerámico') || serviceType.includes('Ceramic')) {
        // Ceramic needs 'Top Coat' recharge
        products.push("Recarga de Top Coat");
    } else if (serviceType.includes('PPF')) {
        // PPF is more resistant but needs cleaning
        frequency = Math.max(frequency, 6); // At least every 6 months even in coast
    }

    return {
        frequencyMonths: frequency,
        reason,
        suggestedProducts: products
    };
}

export async function detectLocation(): Promise<LocationContext> {
    return new Promise((resolve) => {
        if (typeof navigator === 'undefined' || !navigator.geolocation) {
            console.warn("Geolocation is not supported or not available.");
            // Default fallback
            resolve({ city: 'Montevideo', isCoastal: true });
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                // Using OpenStreetMap Nominatim API for reverse geocoding
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, {
                    headers: {
                        'User-Agent': 'EvoWrapApp/1.0' // Required by Nominatim
                    }
                });

                if (!response.ok) {
                    throw new Error('Geocoding failed');
                }

                const data = await response.json();

                // Extract city/town/village
                const city = data.address.city || data.address.town || data.address.village || data.address.county || 'Unknown';
                const state = data.address.state || '';

                // Determine coastal status based on Uruguayan departments
                // Coastal departments: Maldonado, Rocha, Canelones, Montevideo, San José, Colonia
                const coastalStates = ['Maldonado', 'Rocha', 'Canelones', 'Montevideo', 'San José', 'Colonia'];
                const isCoastal = coastalStates.some(s => state.includes(s)) || coastalStates.some(s => city.includes(s));

                resolve({ city, isCoastal });
            } catch (error) {
                console.error("Error fetching location details:", error);
                // Fallback on error
                resolve({ city: 'Montevideo', isCoastal: true });
            }
        }, (error) => {
            console.warn("Geolocation permission denied or failed:", error);
            resolve({ city: 'Montevideo', isCoastal: true });
        });
    });
}
