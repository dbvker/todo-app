import React from 'react';
import { connect } from 'react-redux';
import { toggleSelected } from '../reducers/todoList/todoListActions';

import Icon from '@material-ui/core/Icon';
import '../styles/TodoSideItem.css';

const TodoListItem = (props) => {
    const { item, index, toggleSelected, selected, } = props;
    const color = item.list_color;

    const backgroundColor = {
        backgroundColor: `rgb(${color})`,
        fontSize: '22px'
    };

    // const incompeletedTasks = item.tasks.filter(task => !task.task_completed).length;
    

    const incompleted = item.length;
    
    const taskString = incompleted === 1 ? "Task" : "Tasks";

    return (
        <div className='todo-list-item' style={backgroundColor} onClick={() => toggleSelected(index)}>
            <div>
                <p>{item.list_title}</p>
                <span>{taskString}</span>
            </div>
            <button>
                <Icon className='icon'>more_horiz</Icon>
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        selected: state.todoList.selected,
    };
};

export default connect(mapStateToProps, { toggleSelected })(TodoListItem);
