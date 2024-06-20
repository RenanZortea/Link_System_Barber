import React from 'react';
import { useAuth } from '../../contexts/auth/index';

const Greeting = () => {
  const { currentUser } = useAuth(); // Extract currentUser from useAuth

  const getGreetingMessage = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return 'Bom dia';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  };

  const greetingMessage = getGreetingMessage(); // Call the getGreetingMessage function

  return (
    <div className="greeting text-black dark:text-white">
      {`${greetingMessage}, ${currentUser ? (currentUser.displayName ? currentUser.displayName : currentUser.email) : 'Guest'}`}
    </div>
  );
};

export default Greeting;