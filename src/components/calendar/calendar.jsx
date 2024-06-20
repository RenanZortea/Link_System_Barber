// @aldabil/react-scheduler
// https://github.com/aldabil21/react-scheduler.git

//React imports
import { Fragment, useRef, useState, useEffect } from "react";

//Main imports for the scheduler
import { Typography } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import './calendar.css';
import { styled } from '@mui/system';

//Data imports
import { readResources } from "../../contexts/events";
import { readAgenda } from "../../contexts/events";
import { createEvent } from "../../contexts/events";
import { deleteEvent } from "../../contexts/events";
import { getCustomers } from "../../contexts/customerData";



function calendarScheduler() {
  const [mode, setMode] = useState("tabs"); //initialize on tabs mode
  const [events, setEvents] = useState([]); //initialize with empty events
  const calendarRef = useRef(null); //reference to the calendar component
  const [RESOURCES, setResources] = useState([]); //initialize with empty resources
  const [resourcesLoaded, setResourcesLoaded] = useState(false); //initialize with false
  const [CUSTOMERS, setCustomers] = useState([]); //initialize with empty customers


  //This useEffect is used to fetch the events from the database
   useEffect(() => {
    const fetchEvents = async () => {
      const data = await readAgenda();
      setEvents(data);
    };
    fetchEvents();
    console.log('readAgenda() called');
  }, []);

// This useEffect is used to fetch the resources from the database
  useEffect(() => {
    const fetchResources = async () => {
      const data = await readResources();
      setResources(data);
      setResourcesLoaded(true);
    };
    fetchResources();
    console.log('RESOURCES() called');
  }, []);



  async function fetchAndMapCustomers() {
    const customers = await getCustomers();
    console.log('Fetched customers:', customers);
    const data = customers.map(customer => ({ customer: `${customer.name}` }));
    console.log('Mapped customers:', data);
    return data;
  }
  
  useEffect(() => {
    async function getAndSetCustomers() {
      const customers = await fetchAndMapCustomers();
      console.log('Set CUSTOMERS:', customers);
      setCustomers(customers);
      setResourcesLoaded(true);
    }
    getAndSetCustomers();
  }, []); 


return (
  <Fragment>
    {resourcesLoaded && (
      <Scheduler
        view="day"
        ref={calendarRef}
        resourceViewMode={mode}
        events={events}
        resources={RESOURCES}
        resourceFields={{
          idField: "admin_id",
          textField: "title",
          subTextField: "mobile",
          avatarField: "title",
          colorField: "color"
        }}
      fields={[
        {
          name: "admin_id",
          type: "select",
          default: RESOURCES[0].admin_id,
          options: RESOURCES.map((res) => {
            return {
              id: res.admin_id,
              text: `${res.title} (${res.mobile})`,
              value: res.admin_id //Should match "name" property
            };
          }),
          config: { label: "Assignee", required: true }
        },
        {
          name: "title",
          type: "select",
          config: { label: "Cliente", required: false, variant: "outlined" },
          default: CUSTOMERS[0].customer,
          options: CUSTOMERS.map((res) => {
            return {
              id: res.customer,
              text: `${res.customer}`,
              value: res.customer //Should match "name" property
            };
          }),
        },
          {
            name: "preco",
            type: "select",
            config: { label: "Preço", required: false },
            options: [
              { id: "Cabelo", text: "Cabelo: R$ 70,00", value: 70 },
              { id: "Barba", text: "Barba: R$30,00", value: 30 },
            ],
          }
      ]}
        month={{
          weekDays: [0, 1, 2, 3, 4, 5],
          weekStartOn: 6,
          startHour: 7,
          endHour: 20,
          navigation: true,
          disableGoToDay: false
        }}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5],
          weekStartOn: 6,
          startHour: 7,
          endHour: 20,
          step: 60,
          navigation: true,
          disableGoToDay: false
        }}
        day={{
          startHour: 7,
          endHour: 20,
          step: 60,
          navigation: true
        }}
        eventRenderer={({ event, ...props }) => {
  return (
    <div
      className="flex flex-col h-full bg-gray-500 dark:bg-slate-600 dark:borde-slate-800 place-content-center p-3 rounded-sm"
      {...props}
    >
      <div className="text-slate-100 font-bold subpixel-antialiased font-sans">{event.title}</div>
      <div className="text-slate-200 text-xs font-bold font-sans antialiased">R$ {event.preco}</div>
      </div>
    
  );
}}
        viewerExtraComponent={(fields, event) => { 
          return (
            <div>
              {fields.map((field) => {
                if (field.name === "admin_id") {
                  const admin = field.options.find(
                    (fe) => fe.id === event.admin_id
                  );
                  return (
                    <Typography
                      key={admin.id} // Use the admin's id as the key
                      style={{ display: "flex", alignItems: "center" }}
                      color="textSecondary"
                      variant="caption"
                      noWrap
                    >
                      <PersonRoundedIcon /> {admin.text}
                    </Typography>
                  );
                } else if (field.name === "customer") {
                  // Handle the "customer" field here
                  // For example, you might return a Typography component with the customer's name
                  return (
                    <Typography
                      key={event.customer} // Use the customer's id as the key
                      style={{ display: "flex", alignItems: "center" }}
                      color="textSecondary"
                      variant="caption"
                      noWrap
                    >
                      <PersonRoundedIcon /> {event.customer}
                    </Typography>
                  );
                } else {
                  return "";
                }
              })}
            </div>
          );
        }}
        onConfirm={(event, action) => {
          console.log('Event:', event);
          console.log('onConfirm function called with event:', event, 'and action:', action);
          if (action === 'create') {
            createEvent(event);
          }
        }}
        onDelete={(id) => {
          deleteEvent(id);
        }}
      />
    )}
  </Fragment>
);
}

export default calendarScheduler;