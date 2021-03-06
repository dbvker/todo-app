import React from 'react';

import '../styles/TodoSidebar.css';

import TodoSideItem from './TodoSideItem';

const TodoList = (props) => {
    const { todoData } = props;
  return (
    <div className='todo-list-container'>
        {todoData.map((item, index) => {
            return (
                <TodoSideItem key={index} index={index} item={item} />
            );
        })}
    </div>
);
};

export default TodoList;
