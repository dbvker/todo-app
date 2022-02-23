import React from 'react';

import './TodoList.css';

import TodoListItem from './todoListItem/TodoListItem';

const TodoList = (props) => {
    const { todoData } = props;
  return (
    <div className='todo-list-container'>
        {todoData.map((item, index) => {
            return (
                <TodoListItem key={index} index={index} item={item} />
            );
        })}
    </div>
);
};

export default TodoList;
