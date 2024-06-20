import React, { useState, useEffect, useContext, useCallback} from 'react';
import { getCustomers, registerCustomer } from '../../contexts/customerData';
import { readAgenda } from '../../contexts/events';
import { addEventsToCustomers, deleteUser } from '../../contexts/customerData';
import { CgTrash } from "react-icons/cg";
import { TfiAgenda } from "react-icons/tfi";





/* const people = [
{
    name: 'Gabriel Ferreira',
    phone_number: '556285552072',
    average_spent: 'R$ 1200',
    imageUrl: 'https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?bg=FFFFFF&q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lastSeenDateTime: new Date('2024-02-20T10:30Z'),
    events: [
        {
            title: 'Event 1',
            start: new Date('2024-03-01T10:00Z'),
            end: new Date('2024-03-01T12:00Z')
        },
        {
            title: 'Event 2',
            start: new Date('2024-03-02T10:00Z'),
            end: new Date('2024-03-02T12:00Z')
        },
        {
            title: 'Event 3',
            start: new Date('2024-03-03T10:00Z'),
            end: new Date('2024-03-03T12:00Z')
        },
        {
            title: 'Event 4',
            start: new Date('2024-03-04T10:00Z'),
            end: new Date('2024-03-04T12:00Z')
        },
        {
            title: 'Future Event 1',
            start: new Date('2025-03-01T10:00Z'),
            end: new Date('2025-03-01T12:00Z')
        },
        {
            title: 'Future Event 2',
            start: new Date('2025-03-02T10:00Z'),
            end: new Date('2025-03-02T12:00Z')
        },
        {
            title: 'Future Event 3',
            start: new Date('2025-03-03T10:00Z'),
            end: new Date('2025-03-03T12:00Z')
        },
        {
            title: 'Future Event 4',
            start: new Date('2025-03-04T10:00Z'),
            end: new Date('2025-03-04T12:00Z')
        }
    ]
},
  {
    name: 'Samuel Charles',
    phone_number: '5519982061527',
    average_spent: 'R$ 800',
    imageUrl: 'https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?bg=FFFFFF&q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lastSeenDateTime: new Date('2024-03-15T08:45Z'),
  },
  {
    name: 'Ana Costa',
    phone_number: '16983456789',
    average_spent: 'R$ 1500',
    imageUrl: 'https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?bg=FFFFFF&q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lastSeenDateTime: new Date('2024-04-10T12:00Z'),
  },
  {
    name: 'Luiz Pereira',
    phone_number: '16984567890',
    average_spent: 'R$ 700',
    imageUrl: 'https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?bg=FFFFFF&q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lastSeenDateTime: new Date('2024-05-05T14:15Z'),
  },
  {
    name: 'João Silva',
    phone_number: '16985678901',
    average_spent: 'R$ 900',
    imageUrl: 'https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?bg=FFFFFF&q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lastSeenDateTime: new Date('2024-06-01T16:30Z'),
  },
  {
    name: 'Carla Mendes',
    phone_number: '16986789012',
    average_spent: 'R$ 1100',
    imageUrl: 'https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?bg=FFFFFF&q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lastSeenDateTime: new Date('2024-07-02T18:45Z'),
  },
  {
    name: 'Roberto Alves',
    phone_number: '16987890123',
    average_spent: 'R$ 1300',
    imageUrl: 'https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?bg=FFFFFF&q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lastSeenDateTime: new Date('2024-08-03T20:00Z'),
  },
  {
    name: 'Ana Costa',
    phone_number: '16983456789',
    average_spent: 'R$ 1500',
    imageUrl: 'https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?bg=FFFFFF&q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lastSeenDateTime: new Date('2024-04-10T12:00Z'),
  },
  {
    name: 'Luiz Pereira',
    phone_number: '16984567890',
    average_spent: 'R$ 700',
    imageUrl: 'https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?bg=FFFFFF&q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lastSeenDateTime: new Date('2024-05-05T14:15Z'),
  },
  {
    name: 'João Silva',
    phone_number: '16985678901',
    average_spent: 'R$ 900',
    imageUrl: 'https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?bg=FFFFFF&q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lastSeenDateTime: new Date('2024-06-01T16:30Z'),
  },
  {
    name: 'Carla Mendes',
    phone_number: '16986789012',
    average_spent: 'R$ 1100',
    imageUrl: 'https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?bg=FFFFFF&q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lastSeenDateTime: new Date('2024-07-02T18:45Z'),
  },
  {
    name: 'Roberto Alves',
    phone_number: '16987890123',
    average_spent: 'R$ 1300',
    imageUrl: 'https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?bg=FFFFFF&q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lastSeenDateTime: new Date('2024-08-03T20:00Z'),
  },
]

people.forEach(person => {
  const date = person.lastSeenDateTime;
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`; // getMonth() is zero-based
  person.lastSeenDateTime = formattedDate;
}); */

function Tooltip({ children, text }) {
  return (
    <div className="relative group">
      <div className="cursor-pointer group-hover:block absolute text-xs bg-gray-400 text-white p-1 rounded z-10 invisible group-hover:visible" style={{ bottom: '100%', whiteSpace: 'nowrap' }}>
        {text}
      </div>
      {children}
    </div>
  );
}



export default function TopCustomers() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isHovering, setIsHovering] = useState(null);
  const [showText, setShowText] = useState(false);
  const [clicked, setClicked] = useState({});
  const [people, setPeople] = useState([]);

  const fetchPeople = useCallback(async () => {
    await addEventsToCustomers();
    const people = await getCustomers();
  
    people.forEach(person => {
      const date = person.lastSeenDateTime.toDate(); // Convert Firestore timestamp to JavaScript Date
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`; // getMonth() is zero-based
      person.lastSeenDateTime = formattedDate;
    });
  
    setPeople(people);
  }, []); // Add dependencies here if any
  
  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);
  

  const handleClick = (text, key) => {
    setClicked(prevState => ({ ...prevState, [key]: true }));
    navigator.clipboard.writeText(text);
    setTimeout(() => setClicked(prevState => ({ ...prevState, [key]: false })), 1000); // Remove the class after 1 second
  };

  useEffect(() => {
    let timer;
    if (isHovering) {
      timer = setTimeout(() => {
        setShowText(true);
      }, 2000);
    } else {
      clearTimeout(timer);
      setShowText(false);
    }
    return () => clearTimeout(timer);
  }, [isHovering]);
  



  return (
    <div className='relative overflow-x-auto grid grid-cols-2 rounded-xl h-4/5'>
      <ul role="list" className="divide-y divide-gray-100 p-5 overflow-x-auto">
        {people.map((person, index) => (
          <li 
            key={`${person.phone_number}-${index}`} 
            className="flex justify-between gap-x-6 p-5 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg hover:translate-y-2 transition ease-in-out cursor-pointer" 
            onClick={() => setSelectedPerson(person)}
            onMouseEnter={() => setIsHovering(person.phone_number)}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div className="flex min-w-0 gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-200">{person.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-bold hover:text-green-600 hover:text-bold">{person.phone_number}</p>
                {showText && isHovering === person.phone_number && 
                    <a href={`https://wa.me/${person.phone_number}`} target="_blank" rel="noopener noreferrer">
                        <span className='text-slate-400 text-2x1 font-bold animate-pulse'>Ir para Whatsapp</span>
                    </a>
                }
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900 dark:text-slate-100 dark:text-bold">{person.average_spent}</p>
              {person.lastSeenDateTime && (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Última vez <time dateTime={person.lastSeenDateTime}>{person.lastSeenDateTime}</time>
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
      

{selectedPerson && (
  <div className="overflow-hidden text-black dark:text-slate-200 items-center border rounded-xl">
        <button 
          className="absolute top-0 right-0 m-2 bg-red-700 dark:bg-transparent dark:hover:bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded z-99" 
          onClick={() => deleteUser(selectedPerson.name).then(() => fetchPeople())}
        >
          <CgTrash />
        </button>
    <div className='grid grid-cols-3'>
      <div className='col-span-1 flex justify-center items-center'>
        <img className='h-20 w-20 rounded-full bg-gray-50' src={selectedPerson.imageUrl} alt='' />
      </div>
      <div className='col-span-2 mt-4 w-1/2'>
        <Tooltip text="Copiar nome">
          <p className={`text-black dark:text-slate-200 font-bold text-2xl ml-5 hover:-translate-y-1 transition ease-in-out cursor-pointer hover:text-accent-slate-400 ${clicked.name ? 'animate-bounce' : ''}`} onClick={() => handleClick(selectedPerson.name, 'name')}>{selectedPerson.name}</p>
        </Tooltip>
        <Tooltip text="Whastapp">
          <a href={`https://wa.me/${selectedPerson.phone_number}`} target="_blank" rel="noopener noreferrer">
            <p className='text-slate-400  font-bold text-lg ml-5 cursor-pointer hover:text-accent-slate-400'>{selectedPerson.phone_number}</p>
          </a>
        </Tooltip>
        <Tooltip text="Copiar ticket médio">
          <p className={`text-black dark:text-slate-200 font-semibold text-lg ml-5 hover:-translate-y-1 transition ease-in-out cursor-pointer hover:text-accent-slate-400 ${clicked.average_spent ? 'animate-bounce' : ''}`} onClick={() => handleClick(selectedPerson.average_spent.toString(), 'average_spent')}>{selectedPerson.average_spent}</p>
        </Tooltip>
        <Tooltip text="Copiar ultima visita">
          <p className={`text-black dark:text-slate-200 font-semibold text-lg ml-5 hover:-translate-y-1 transition ease-in-out cursor-pointer hover:text-accent-slate-400 ${clicked.lastSeenDateTime ? 'animate-bounce' : ''}`} onClick={() => handleClick(selectedPerson.lastSeenDateTime, 'lastSeenDateTime')}>Última visita: {selectedPerson.lastSeenDateTime}</p>
        </Tooltip>
      </div>
{selectedPerson && selectedPerson.events && Array.isArray(selectedPerson.events) && selectedPerson.events.length > 0 && (
  <div>
    <ul role="list" className="divide-y divide-gray-100 p-5 overflow-auto">
      {selectedPerson.events.map((event, index) => {
        const eventStartDate = new Date(event.start);
        const today = new Date();
        return (
          <li 
            key={`${event.title}-${index}`} 
            className="flex justify-between gap-x-6 p-5 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg hover:translate-y-2 transition ease-in-out cursor-pointer" 
            onMouseEnter={() => setIsHovering(event.title)}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-200">{event.title}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-slate-300 hover:text-green-600 hover:text-bold">Start: {eventStartDate.toLocaleString()}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-slate-300 hover:text-green-600 hover:text-bold">End: {new Date(event.end).toLocaleString()}</p>
                {eventStartDate > today && <p className="mt-1 truncate text-xs leading-5 text-green-500 hover:text-green-600 hover:text-bold">Próximo</p>}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
)}
    </div>
  </div>
)}
</div>
)}