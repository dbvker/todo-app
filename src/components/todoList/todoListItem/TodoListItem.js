import React from 'react';
import { connect } from 'react-redux';
import { toggleSelected } from '../../../actions/todoListActions';

import Icon from '@material-ui/core/Icon';

import './TodoListItem.css';

const TodoListItem = (props) => {
    const { item, index } = props;
    const color = item.color;

    const backgroundColor = {
        backgroundColor: `rgb(${color})`,
        fontSize: '22px'
    };

    console.log('item props', props.selected, 'item Index:', index)
    return (
        <div className='todo-list-item' style={backgroundColor} onClick={() => console.log(index)}>
            <div>
                <p>{item.title}</p>
                <span>{item.tasks.length} Items</span>
            </div>
            <button>
                <Icon className='icon'>more_horiz</Icon>
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        selected: state.selected,
    };
};

export default connect(mapStateToProps, { toggleSelected })(TodoListItem);
