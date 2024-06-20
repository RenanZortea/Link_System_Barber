import React from "react";

const cardContentCustomersExpected = {
    title: "Clientes Esperados",
    data: [1000, 1050, 9800, 12300, 12300],
};

// Check if data has at least 5 elements
if (cardContentCustomersExpected.data.length >= 5) {
    // Get the last 5 elements
    const lastFive = cardContentCustomersExpected.data.slice(-5);

    // Calculate the mean
    const mean = Math.round(lastFive.reduce((a, b) => a + b, 0) / lastFive.length);

    // Assign the mean to the info property
    cardContentCustomersExpected.info = `${mean}`;
} else {
    cardContentCustomersExpected.info = "Sem Dados o Suficiente";
}

// Check the last two elements of the data array
if (cardContentCustomersExpected.data[cardContentCustomersExpected.data.length - 1] < cardContentCustomersExpected.data[cardContentCustomersExpected.data.length - 2]) {
    cardContentCustomersExpected.status = "down";
} else {
    cardContentCustomersExpected.status = "up";
}

export default cardContentCustomersExpected;