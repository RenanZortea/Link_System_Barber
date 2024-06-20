import React, { useEffect, useState } from 'react';
import { fetchScheduledCustomersCount } from '../../contexts/customerData';
import Card from './index';
import ExpectedCustomers from './cards/expectedCustomers';
import ExpectedBilling from './cards/expectedBilling';
import ScheduledCustomers from './cards/scheduledCustomers';
import NoShowAverage from './cards/noShowAverage';
import ExpectedBillingDataContext from '../../contexts/expectedBilling';
import cardContent from '../../helpers/expectedBillingMath';
import ExpectedCustomersContext from '../../contexts/expectedCustomers';
import cardContentCustomersExpected from '../../helpers/expectedCustomersMath';
import NoShowAverageContext from '../../contexts/noShowAverage';
import cardContentNoShowAverage from '../../helpers/noShowAverageMath';
import ScheduledCustomersContext from '../../contexts/scheduledCustomers';
import cardContentScheduledCustomers from '../../helpers/scheduledCustomersMath';


export default function AiCards() {

/*   const cards = [
    { title: 'Clientes Esperados', info: '120', status: 'up' },
    { title: 'Faturamento Esperado Hoje', info: 'R$500,00', status: 'down' },
    { title: 'Média de Cancelamentos', info: '2', status: 'down' },
    { title: 'Clientes Atendidos', info: '100', status: 'up' },
    { title: 'Faturamento Realizado Ontem', info: 'R$', status: 'up' },
    { title: 'Cancelamentos Ontem', info: '3', status: 'up' },
    { title: 'Clientes Agendados', info: "", status: 'down' },
    { title: 'Faturamento Esperado Amanhã', info: 'R$550,00', status: 'up' },
    { title: 'Média de No-shows', info: '1', status: 'down' },
  ]; */

  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-4 p-4">
        <ExpectedBillingDataContext.Provider value={cardContent}>
        <ExpectedBilling />
        </ExpectedBillingDataContext.Provider>
        <ExpectedCustomersContext.Provider value={cardContentCustomersExpected}>
        <ExpectedCustomers />
        </ExpectedCustomersContext.Provider>
        <ScheduledCustomersContext.Provider value={cardContentScheduledCustomers}>
        <ScheduledCustomers />
        </ScheduledCustomersContext.Provider>
        <NoShowAverageContext.Provider value={cardContentNoShowAverage}>
        <NoShowAverage />
        </NoShowAverageContext.Provider>
      </div>
    </div>
  );
}
