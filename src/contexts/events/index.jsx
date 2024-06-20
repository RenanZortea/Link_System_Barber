// Data for the events context
import { useEffect } from 'react';
import { db } from '../../../firebaseConfig/firebaseConfig';
import { collection, getDocs, Timestamp, addDoc, deleteDoc, doc} from 'firebase/firestore';
import { readUser } from '../../store/readUser';

let collectionRef;

async function setCollectionRef() {
  const user = await readUser();
  collectionRef = collection(db, `events_${user.uid}`);
}

setCollectionRef();

let collectionRef_resources;

async function setCollectionRef_resources() {
  const user = await readUser();
  collectionRef_resources = collection(db, `resources_${user.uid}`);
}

setCollectionRef_resources();



export const readAgenda = async () => {
  try {
    const data = await getDocs(collectionRef);
    const filteredData = [];
    data.docs.forEach((doc) => {
      const event_id = doc.id; // Get the document ID
      const admin_id = doc.data().calendar_id;
      const title = doc.data().title;
      const start = doc.data().start.toDate(); // Convert Firestore timestamp to JavaScript Date
      const end = doc.data().end.toDate(); // Convert Firestore timestamp to JavaScript Date
      const preco = doc.data().preco; // Get the preco field

      filteredData.push({
        event_id, // Include the document ID
        admin_id,
        title,
        start,
        end,
        preco // Include the preco field
      });
    });
    console.log('filteredData: ', filteredData);
    return filteredData;
  } catch (error) {
    throw new Error("Error getting documents: " + error);
  }
};



export const readResources = async () => {
  try{
    const data = await getDocs(collectionRef_resources);
    const filteredData = [];
    data.docs.forEach((doc) => {
      const admin_id = doc.data().admin_id;;
      const title = doc.data().title;
      const mobile = doc.data().mobile;
      const avatar = doc.data().avatar;
      const color = doc.data().color;

      filteredData.push({
        admin_id,
        title,
        mobile,
        avatar,
        color
      });
    });
    console.log('filteredData: ', filteredData);
    return filteredData;
  } catch (error) {
    throw new Error("Error getting documents: " + error);
  }
};


// Function to create an event
export const createEvent = async (event) => {
  const calendar_id = event.admin_id;
  const title = event.title;
  const start = Timestamp.fromDate(new Date(event.start)); // Convert JavaScript Date to Firestore timestamp
  const end = Timestamp.fromDate(new Date(event.end)); // Convert JavaScript Date to Firestore timestamp
  const preco = event.preco; // Convert the preco string to a number

  // Assuming you have a Firestore collection named 'events'
  try {
    const docRef = await addDoc(collectionRef, {
      calendar_id,
      title,
      start,
      end,
      preco
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Function to delete an event
export const deleteEvent = async (id) => {
  try {
    // Assuming you have a Firestore collection named 'events'
    await deleteDoc(doc(collectionRef, id));

    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error removing document: ", error);
  }
}