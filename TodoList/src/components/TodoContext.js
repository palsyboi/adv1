import React, { createContext, useState, useContext } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [categories, setCategories] = useState({
    'Todo List': [],
    Completed: [],
  });

  const addTask = (newTaskInput) => {
    const newTask = { id: Date.now(), title: newTaskInput, completed: false };

    setCategories((prevCategories) => ({
      ...prevCategories,
      'Todo List': [...prevCategories['Todo List'], newTask],
    }));
  };

  const deleteTask = (postId) => {
    setCategories({
      ...categories,
      'Todo List': categories['Todo List'].filter((post) => post.id !== postId),
    });
  };

  const completeTask = (postId) => {
    const completedTask = categories['Todo List'].find((post) => post.id === postId);

    const completionDate = new Date().toLocaleDateString();

    setCategories((prevCategories) => ({
      'Todo List': prevCategories['Todo List'].filter((post) => post.id !== postId),
      Completed: [...prevCategories.Completed, { ...completedTask, completed: true, completionDate }],
    }));
  };

  const editTask = (editingTaskId, editedTaskTitle) => {
    setCategories({
      ...categories,
      'Todo List': categories['Todo List'].map((post) =>
        post.id === editingTaskId ? { ...post, title: editedTaskTitle } : post
      ),
    });
  };
  return (
    <TodoContext.Provider value={{ categories, addTask, deleteTask, completeTask, editTask }}>
      {children}
    </TodoContext.Provider>
  );
};
export const useTodoContext = () => {
  return useContext(TodoContext);
};
