import { db } from '../../../firebaseConfig/firebaseConfig';
import { doc, updateDoc,collection, getDocs, addDoc, Timestamp, query, onSnapshot, where, getFirestore, deleteDoc } from '@firebase/firestore';
import { readUser } from '../../store/readUser';



class FirestoreCollections {
    constructor() {
        this.collectionRef = null;
        this.eventsCollectionRef = null;
        this.customersCollectionRef = null;
    }

    async setCollectionRef() {
        const user = await readUser();
        const db = getFirestore();
        this.collectionRef = collection(db, `billing_${user.uid}`);
    }

    getCollectionRef() {
        return this.collectionRef;
    }

    async setEventsCollectionRef() {
        const user = await readUser();
        const db = getFirestore();
        this.eventsCollectionRef = collection(db, `events_${user.uid}`);
    }

    getEventsCollectionRef() {
        return this.eventsCollectionRef;
    }

    async setCustomersCollectionRef() {
        const user = await readUser();
        const db = getFirestore();
        this.customersCollectionRef = collection(db, `customers_${user.uid}`);
    }

    getCustomersCollectionRef() {
        return this.customersCollectionRef;
    }
}

export const getCustomers = async () => {
    const firestoreCollections = new FirestoreCollections();
    await firestoreCollections.setCustomersCollectionRef();
    const customersCollectionRef = firestoreCollections.getCustomersCollectionRef();

    const customers = [];
    const querySnapshot = await getDocs(customersCollectionRef);
    querySnapshot.forEach((doc) => {
        const customerData = doc.data();
        if (customerData.events) {
            customerData.events = customerData.events.map(event => {
                if (event.start) {
                    event.start = event.start.toDate();
                }
                if (event.end) {
                    event.end = event.end.toDate();
                }
                return event;
            });
        }
        customers.push(customerData);
    });
    return customers;
}

export const addEventsToCustomers = async () => {
    const firestoreCollections = new FirestoreCollections();
    await firestoreCollections.setCustomersCollectionRef();
    await firestoreCollections.setEventsCollectionRef();

    const customersCollectionRef = firestoreCollections.getCustomersCollectionRef();
    const eventsCollectionRef = firestoreCollections.getEventsCollectionRef();

    const qCustomers = query(customersCollectionRef);
    const customerSnapshot = await getDocs(qCustomers);

    customerSnapshot.forEach(async (docSnapshot) => {
        const customerData = docSnapshot.data();
        if (customerData.name) {
            const qEvents = query(eventsCollectionRef, where('title', '==', customerData.name));
            const eventSnapshot = await getDocs(qEvents);
            const events = eventSnapshot.docs.map(doc => doc.data());

            if (events.length > 0) {
                const customerDoc = doc(customersCollectionRef, docSnapshot.id);
                await updateDoc(customerDoc, { events: events });
            }
        }
    });
}

export const registerCustomer = async (name, phoneNumber) => {
    const firestoreCollections = new FirestoreCollections();
    await firestoreCollections.setCustomersCollectionRef();
    const customersCollectionRef = firestoreCollections.getCustomersCollectionRef();

    const today = Timestamp.now();
    const customer = { 
        name, 
        phone_number: phoneNumber, 
        lastSeenDateTime: today, 
        average_spent: 'R$ 0,00',
        imageUrl: 'https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?bg=FFFFFF&q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    };
    const docRef = await addDoc(customersCollectionRef, customer);

    return docRef.id;
}


export const fetchScheduledCustomersCount = async () => {
    const firestoreCollections = new FirestoreCollections();
    await firestoreCollections.setEventsCollectionRef();
    const eventsCollectionRef = firestoreCollections.getEventsCollectionRef();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const q = query(eventsCollectionRef, where('date', '>=', today), where('date', '<', tomorrow));
    const querySnapshot = await getDocs(q);

    const customerIds = new Set();
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        customerIds.add(data.customerId);
    });

    return customerIds.size;
}

export const deleteUser = async (name) => {
    const firestoreCollections = new FirestoreCollections();
    await firestoreCollections.setCustomersCollectionRef();
    const customersCollectionRef = firestoreCollections.getCustomersCollectionRef();

    const q = query(customersCollectionRef, where('name', '==', name));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
    });
}


