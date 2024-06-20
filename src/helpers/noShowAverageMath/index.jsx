const cardContentNoShowAverage = {
    title: "Média de No-Shows",
    data: [100, 105, 98, 123, 123],
};

// Check if data has at least 5 elements
if (cardContentNoShowAverage.data.length >= 5) {
    // Get the last 5 elements
    const lastFive = cardContentNoShowAverage.data.slice(-5);

    // Calculate the mean
    const mean = Math.round(lastFive.reduce((a, b) => a + b, 0) / lastFive.length);

    // Assign the mean to the info property
    cardContentNoShowAverage.info = `${mean}`;
} else {
    cardContentNoShowAverage.info = "Sem Dados o Suficiente";
}

// Check the last two elements of the data array
if (cardContentNoShowAverage.data[cardContentNoShowAverage.data.length - 1] < cardContentNoShowAverage.data[cardContentNoShowAverage.data.length - 2]) {
    cardContentNoShowAverage.status = "down";
} else {
    cardContentNoShowAverage.status = "up";
}

export default cardContentNoShowAverage;