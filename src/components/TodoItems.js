import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import '../styles/TodoItems.css';


const TodoItems = (props) => {
    const { item, theme, selectedTasks, selected } = props;
    const [listInfo, setListInfo] = useState();
    

    useEffect(() => {
        const userID = localStorage.getItem('id');
        axios
            .get(`http://localhost:9000/todo/${userID}`)
            .then((res) => {
                setListInfo(res.data[selected]);
                console.log('list Info', listInfo)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [selectedTasks]);

    return (
        <div className='todo-items-wrapper'>
            <div className='todo-items-container'>
                <div className={theme ? 'todo-header bg-dark' : 'todo-header bg-light'}>
                    <div className='todo-header-title'>{}</div>
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
                    {selectedTasks.map((task, index) => {
                        return (
                            !task.completed && (
                                <div key={index} className='todo-task-item'>
                                    <div>{task.task_title}</div>
                                    {task.priority === 0 && null}
                                    {task.priority === 1 && <span>I</span>}
                                    {task.priority === 2 && <span>II</span>}
                                    {task.priority === 3 && <span>III</span>}
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
