import React, { useState } from 'react';
import { connect } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import './TodoItems.css';

// import data from '../../data';

const initialInputValue = {
    itemID: Date.now(),
    title: '',
    completed: false,
};

const TodoItems = (props) => {
    const { index, item, todoData, theme } = props;
    const { selected } = props
    const [inputValue, setInputValue] = useState(initialInputValue);

    const handleChanges = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddItem = (e) => {
        if (e.key === 'Enter') {
            if (inputValue.title.length === 0) {
                return null;
            } else {
                console.log('pressed enter key');
                setInputValue(initialInputValue);
                const data = todoData.find(list => list.listID === selected);
                console.log('data bruh',  data);
            }
        }
    };


    return (
        <div className={selected === index ? 'todo-items-wrapper' : 'hidden'}>
            <div className='todo-items-container'>
                <div className={theme ? 'todo-header bg-dark' : 'todo-header bg-light'}>
                    <div className='todo-header-title'>{item.title}</div>
                    <div className='todo-header-info'>
                        <p>Join List</p>
                        <button>
                            <Icon className={theme ? 'bg-dark' : 'bg-light'}>account_circle</Icon>
                        </button>
                        <button>
                            <Icon className={theme ? 'bg-dark' : 'bg-light'}>more_vert</Icon>
                        </button>
                    </div>
                </div>

                <div className='todo-tasks '>
                    <div className='todo-tasks-title'>To Do:</div>
                    {item.tasks.map((task, index) => {
                        return (
                            !task.completed && (
                                <div key={index} className='todo-task-item'>
                                    <div>{task.title}</div>
                                    {task.priority === 0 && null}
                                    {task.priority === 1 && <span>I</span>}
                                    {task.priority === 2 && <span>II</span>}
                                    {task.priority === 3 && <span>III</span>}
                                </div>
                            )
                        );
                    })}
                    <input
                        className={theme ? 'todo-task-input input-dark' : 'todo-task-input input-light'}
                        type='text'
                        placeholder='Add new item'
                        name='title'
                        value={inputValue.title}
                        onChange={handleChanges}
                        onKeyDown={handleAddItem}
                    />
                </div>

                <div className='todo-tasks '>
                    <div className='todo-tasks-title'>Completed:</div>
                    {item.tasks.map((task, index) => {
                        return (
                            task.completed && (
                                <div key={index} className='todo-task-item'>
                                    <div>{task.title}</div>
                                    <div>
                                        {task.priority === 0 && null}
                                        {task.priority === 1 && <span>I</span>}
                                        {task.priority === 2 && <span>II</span>}
                                        {task.priority === 3 && <span>III</span>}
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        selected: state.todoList.selected,
        theme: state.header.theme
    };
};

export default connect(mapStateToProps)(TodoItems);
