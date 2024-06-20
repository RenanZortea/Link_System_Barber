import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig/firebaseConfig';
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { readUser } from '../../store/readUser';

let collectionRef;

async function setCollectionRef() {
  const user = await readUser();
  collectionRef = collection(db, `billing_${user.uid}`);
}

setCollectionRef();


export const fetchBillingData = async () => {
    try {
      const q = query(collectionRef, orderBy('date'), limit(20));
      const data = await getDocs(q);
      const billingActualData = [];
      const profitData = [];
      const dateData = []; // Array to store dates
      data.docs.forEach(doc => {
        const documentData = doc.data();
        billingActualData.push(documentData.billing_actual);
        profitData.push(documentData.profit);
        dateData.push(documentData.date); // Pushing date into array
      });
      console.log("Billing Actual Data: ", billingActualData);
      console.log("Profit Data: ", profitData);
      console.log("Date Data: ", dateData); // Logging dates
      return { billingActualData, profitData, dateData }; // Returning dates as well
    } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
    }
  };

  export const fetchYesterdayBillingData = async () => {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0); // set time to 00:00:00.000

      const today = new Date(yesterday);
      today.setDate(today.getDate() + 1);

      const q = query(collectionRef, where('date', '>=', yesterday), where('date', '<', today), orderBy('date'));
      const data = await getDocs(q);
      const billingActualData = [];
      data.docs.forEach(doc => {
        const documentData = doc.data();
        billingActualData.push(documentData.billing_actual);
      });
      console.log("Yesterday's Billing Actual Data: ", billingActualData);
      return billingActualData;
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

