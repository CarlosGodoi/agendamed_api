export const transformDate = (dateStr: string) => {
    try {
        // Verifica se a data está no formato ISO
        if (dateStr.includes('T') || dateStr.includes('Z')) {
            return new Date(dateStr);
        }

        // Parse para o formato brasileiro (DD/MM/YYYY às HH:mm)
        const [datePart, timePart] = dateStr.split(' as ');
        const [day, month, year] = datePart.split('/').map(Number);
        const [hours, minutes] = timePart.split(':').map(Number);

        return new Date(year, month - 1, day, hours, minutes);
    } catch (error) {
        throw new Error('Formato de data inválido. Use DD/MM/YYYY as HH:mm ou formato ISO');
    }
};