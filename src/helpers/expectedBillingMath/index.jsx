import React from "react";

const cardContent = {
    title: "Faturamento Esperado Hoje",
    data: [1000, 1050, 9800, 12300, 12300],
};

// Check if data has at least 5 elements
if (cardContent.data.length >= 5) {
    // Get the last 5 elements
    const lastFive = cardContent.data.slice(-5);

    // Calculate the mean
    const mean = Math.round(lastFive.reduce((a, b) => a + b, 0) / lastFive.length);

    // Assign the mean to the info property
    cardContent.info = `${mean}`;
} else {
    cardContent.info = "Sem Dados o Suficiente";
}

// Check the last two elements of the data array
if (cardContent.data[cardContent.data.length - 1] < cardContent.data[cardContent.data.length - 2]) {
    cardContent.status = "down";
} else {
    cardContent.status = "up";
}


export default cardContent;