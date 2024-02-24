import React from 'react';
import { Tab } from '@headlessui/react'; 

const Completed = ({ categories }) => {
  return (
    <Tab.Panel>
      {categories && categories['Completed'] && categories['Completed'].length > 0 ? (
        <ul className="overflow-y-auto max-h-96">
          {categories['Completed'].map((post) => (
            <li
              key={post.id}
              className={classNames(
                'relative rounded-md p-4 hover:bg-gray-300',
                'flex items-center justify-between',
                'cursor-pointer transition-all duration-300'
              )}
                 >
              <h3 className={`text-lg leading-6 ${post.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {post.title}
              </h3>
              <div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">There are no completed tasks yet.</p>
      )}
    </Tab.Panel>
  );
};

export default Completed;
