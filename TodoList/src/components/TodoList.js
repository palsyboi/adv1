import React, { useState } from 'react';
import { useTodoContext } from './TodoContext'; 
import { Tab } from '@headlessui/react'; 

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const TodoList = () => {
  const {
    categories,
    addTask,
    deleteTask,
    completeTask,
    editTask
  } = useTodoContext();

  const [newTaskInput, setNewTaskInput] = useState('');
  const [selectedTab, setSelectedTab] = useState('Todo List');
  const [inputFocused, setInputFocused] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [completedItemToDelete, setCompletedItemToDelete] = useState(null);

  const handleAddButtonClick = () => {
    const newTask = {
      id: Date.now(),
      title: newTaskInput,
      completed: false
    };
    addTask(newTaskInput); 
    setNewTaskInput('');
  };

  const handleDeleteButtonClick = postId => {
    deleteTask(postId); 
  };

  const handleCompleteButtonClick = postId => {
    completeTask(postId); 
  };

  const handleEditButtonClick = (postId, currentTitle) => {
    setEditingTaskId(postId);
    setEditedTaskTitle(currentTitle);
    setEditModalVisible(true);
  };

  const handleEditModalSave = () => {
    editTask(editingTaskId, editedTaskTitle); 
    setEditModalVisible(false);
    setEditingTaskId(null);
    setEditedTaskTitle('');
  };

  return ( 
    <div className="flex items-center justify-center h-screen" style={{ backgroundImage: 'url(/bg.jpg)', backgroundSize: 'cover' }}>
      <div className="w-full max-w-lg px-4 py-16 sm:px-0">
        <Tab.Group onChange={(index) => setSelectedTab(index === 0 ? 'Todo List' : 'Completed')}>
          <Tab.List className="flex space-x-4 rounded-xl bg-blue-900/20 p-2 w-full">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-3 text-lg font-semibold leading-6',
                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected ?
                    'bg-white text-blue-700 shadow' :
                    'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-4">
            {Object.entries(categories).map(([tabName, posts], idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl bg-white p-4',
                )}
              >
                {tabName === 'Todo List' && (
                  <div className="mb-4 flex items-center space-x-2 text-gray">
                    <input
                      type="text"
                      value={newTaskInput}
                      onChange={(e) => setNewTaskInput(e.target.value)}
                      placeholder="Enter your Task"
                      className="rounded-md p-2 border border-black flex-grow text-sm"
                      style={{ backgroundColor: '#EEF5FF', color: 'black' }}
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                    />
                    <button
                      className={classNames(
                        'rounded-lg py-2 text-sm font-semibold leading-5',
                        'w-24 bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400',
                        'hover:bg-blue-600 transform-gpu transition-transform hover:scale-110'
                      )}
                      onClick={handleAddButtonClick}
                    >
                      Add
                    </button>
                  </div>
                )}
                {tabName === 'Completed' && posts.length === 0 ? (
                  <p className="text-gray-700">There's no task completed yet.</p>
                ) : (
                  <ul className="overflow-y-auto max-h-96">
                    {posts.map((post) => (
                      <li
                        key={post.id}
                        className={classNames(
                          'relative rounded-md p-4 hover:bg-gray-300',
                          'flex items-center justify-between',
                          'cursor-pointer transition-all duration-300',
                          {
                            'font-semibold': inputFocused && tabName === 'Todo List',
                            'font-normal': !inputFocused || tabName !== 'Todo List',
                          }
                        )}
                        style={{ marginBottom: tabName === 'Todo List' ? '1rem' : '0' }}
                      >
                        <h3 className={`text-lg leading-6 ${post.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {post.title}
                        </h3>
                        {tabName === 'Todo List' && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditButtonClick(post.id, post.title)}
                              className={classNames(
                                'rounded-md px-2 py-1 ml-3 text-sm bg-yellow-500 text-white focus:outline-none',
                                'hover:bg-yellow-600',
                                'transform-gpu transition-transform hover:scale-110'
                              )}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteButtonClick(post.id)}
                              className={classNames(
                                'rounded-md px-2 py-1 text-sm bg-red-500 text-white focus:outline-none',
                                'hover:bg-red-600',
                                'transform-gpu transition-transform hover:scale-110'
                              )}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5 .058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5 .058l.345-9Z" clipRule="evenodd" />
                              </svg>
                            </button>
                            {!post.completed && ( 
                              <button
                                onClick={() => handleCompleteButtonClick(post.id)}
                                className={classNames(
                                  'rounded-md px-2 py-1 text-sm bg-green-500 text-white focus:outline-none',
                                  'hover:bg-green-600',
                                  'transform-gpu transition-transform hover:scale-110'
                                )}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                </svg>
                              </button>
                            )}
                          </div>
                        )}
                        {tabName === 'Completed' && post.completed && ( 
                          <div>
                            <p
                              className="text-sm text-gray-500"
                            >
                              Completed on: {post.completionDate}
                            </p>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
        {editModalVisible && ( 
          <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center ">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75"></div>
            <div className="bg-white p-10 rounded-lg z-20">
              <h2 className="text-xl font-semibold mb-4"> {completedItemToDelete ?
                'Delete completed task?' :
                'Edit your task:'}
              </h2>
              {!completedItemToDelete && ( 
                <input
                  type="text"
                  value={editedTaskTitle}
                  onChange={(e) => setEditedTaskTitle(e.target.value)}
                  className="rounded-md p-2 w-80 border border-black flex-grow text-sm"
                  style={{ backgroundColor: '#EEF5FF', color: 'black' }}
                />
              )}
              <div className="flex items-center justify-end mt-4">
                <button
                  onClick={handleEditModalSave}
                  className="rounded-lg py-2 px-4 text-sm font-semibold leading-5 bg-blue-500 text-white focus:outline-none hover:bg-blue-600 transform-gpu transition-transform hover:scale-110"
                >
                  {completedItemToDelete ? 'Yes' : 'Save'}
                </button>
                <button
                  onClick={() => setEditModalVisible(false)}
                  className="ml-2 rounded-lg py-2 px-4 text-sm font-semibold leading-5 bg-red-500 text-white focus:outline-none hover:bg-red-600 transform-gpu transition-transform hover:scale-110"
                >
                  {completedItemToDelete ? 'Cancel' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
