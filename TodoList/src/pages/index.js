import React from 'react';
import { TodoProvider } from '../components/TodoContext';
import TodoList from '../components/TodoList'; 
import Completed from '../components/Completed';
import { Tab } from '@headlessui/react'; 

const App = () => {
  return (
    <TodoProvider>
      <Tab.Group>
        <TodoList />
        <Completed />
      </Tab.Group>
    </TodoProvider>
  );
};

export default App;
