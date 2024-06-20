const cardContentScheduledCustomers = {
    title: "Clientes Agendados",
    data: [100, 105, 98, 123, 123],
};

// Check if data has at least 5 elements
if (cardContentScheduledCustomers.data.length >= 5) {
    // Get the last 5 elements
    const lastFive = cardContentScheduledCustomers.data.slice(-5);

    // Calculate the mean
    const mean = Math.round(lastFive.reduce((a, b) => a + b, 0) / lastFive.length);

    // Assign the mean to the info property
    cardContentScheduledCustomers.info = `${mean}`;
} else {
    cardContentScheduledCustomers.info = "Sem Dados o Suficiente";
}

// Check the last two elements of the data array
if (cardContentScheduledCustomers.data[cardContentScheduledCustomers.data.length - 1] < cardContentScheduledCustomers.data[cardContentScheduledCustomers.data.length - 2]) {
    cardContentScheduledCustomers.status = "down";
} else {
    cardContentScheduledCustomers.status = "up";
}

export default cardContentScheduledCustomers;