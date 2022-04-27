import { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

// actions
import { addTitle } from './reducers/newList/newListActions';

import './App.css';

import TodoSidebar from './components/todoSidebar/TodoSidebar';
import TodoItems from './components/todoItems/TodoItems';

const orange = '255,104,31';
const yellow = '250,183,30';
const green = '26,208,134';
const blue = '27,149,224';
const red = '233,36,79';
const pink = '245,142,169';
const purple = '152,50,235';
const grey = '100,100,100';

const initialValues = {
    id: Date.now(),
    title: '',
    color: orange,
    tasks: [],
};

const App = (props) => {
    const { theme, selected } = props; // stateToProps
    // const { addTitle } = props; // actionsToProps

    const [todoData, setTodoData] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([])
    const [newListOpen, setNewListOpen] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);
    const [error, setError] = useState('');
    const [color, setColor] = useState(orange);

    const userID = localStorage.getItem('todo-app-id')
    
    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:9000/todo/1`)
    //         .then(res => {
    //             setSelectedTasks(res.data);
    //             console.log(res.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }, [setTodoData])

    // if (localStorage.getItem('todo-app-token')) {
    //     window.location.reload(true);
    // }

    useEffect(() => {
        axios
            .get(`http://localhost:9000/todo/`)
            .then(res => {
                setTodoData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [setTodoData])

    useEffect(() => {
        setColor(formValues.color);
      }, [formValues]);

    const handleNewListClick = () => {
        setNewListOpen(!newListOpen);
        setError('');
    };

    const handleChanges = (e) => {
        e.preventDefault();
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        }); 
    };

    const handleCreateList = (e) => {
        e.preventDefault();
        const title = formValues.title;
        if (title.length === 0) {
            setError('Please enter a title.');
        } else {
            setNewListOpen(!newListOpen);
            setError('');
            setTodoData([...todoData, formValues]);
            setFormValues(initialValues);
        }
    };

    return (
        <div className={theme ? 'app dark-mode' : 'app light-mode'}>
            
            { todoData.length > 0 ? 
            <div className='site-wrapper'>
                <TodoSidebar todoData={todoData} 
                theme={theme} />
                <div className='todo-items-container'>
                
                    {/* {selectedTasks.tasks.map((item, index) => {
                        return <TodoItems key={index} index={index} item={item} todoData={selectedTasks} setTodoData={setSelectedTasks} theme={theme} />;
                    })} */}
                </div>
            </div> :
            <h1><center>Please create a to do list.</center></h1>

            }


            {newListOpen && (
                <div className='modal-container'>
                    <div className={theme ? 'modal dark-mode' : 'modal light-mode'}>
                        <div className='modal-top'>
                            <h1>Create New List</h1>
                            <button onClick={handleNewListClick}>X</button>
                        </div>
                        {error && <p>{error}</p>}
                        <form>
                            <h3>Title:</h3>
                            <input type='text' placeholder='Title' name='title' value={formValues.title} onChange={handleChanges} />
                            <h3>Color:</h3>
                            <div className='color-wrapper'>
                                <button className={color === orange ? 'color-btn active' : 'color-btn'} style={{ backgroundColor: `rgb(${orange})` }} onClick={handleChanges} name='color' value={orange}></button>
                                <button className={color === yellow ? 'color-btn active' : 'color-btn'} style={{ backgroundColor: `rgb(${yellow})` }} onClick={handleChanges} name='color' value={yellow}></button>
                                <button className={color === green ? 'color-btn active' : 'color-btn'} style={{ backgroundColor: `rgb(${green})` }} onClick={handleChanges} name='color' value={green}></button>
                                <button className={color === blue ? 'color-btn active' : 'color-btn'} style={{ backgroundColor: `rgb(${blue})` }} onClick={handleChanges} name='color' value={blue}></button>
                                <button className={color === red ? 'color-btn active' : 'color-btn'} style={{ backgroundColor: `rgb(${red})` }} onClick={handleChanges} name='color' value={red}></button>
                                <button className={color === pink ? 'color-btn active' : 'color-btn'} style={{ backgroundColor: `rgb(${pink})` }} onClick={handleChanges} name='color' value={pink}></button>
                                <button className={color === purple ? 'color-btn active' : 'color-btn'} style={{ backgroundColor: `rgb(${purple})` }} onClick={handleChanges} name='color' value={purple}></button>
                                <button className={color === grey ? 'color-btn active' : 'color-btn'} style={{ backgroundColor: `rgb(${grey})` }} onClick={handleChanges} name='color' value={grey}></button>
                            </div>
                            <br />
                            <button onClick={handleCreateList} className='submit-btn'>
                                Create List
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        theme: state.header.theme,
        selected: state.todoList.selected,
    };
};

export default connect(mapStateToProps, { addTitle })(App);