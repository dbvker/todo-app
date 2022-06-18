import { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { addTitle } from './reducers/newList/newListActions';

// Styles
import './styles/App.css';

// Assets
import PlusDark from './assets/plus(dark).png';
import PlusLight from './assets/plus(light).png';
import WelcomeImage from './assets/welcomeImage.png';

// Components
import TodoSidebar from './components/TodoSidebar';
import TodoItems from './components/TodoItems';
import Header from './components/Header';

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
    const items = todoData.map((item) => item.list_id);

    const [selectedTasks, setSelectedTasks] = useState([]);
    const [newListOpen, setNewListOpen] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);
    const [error, setError] = useState('');
    const [color, setColor] = useState(orange);

    const userID = localStorage.getItem('id');

    useEffect(() => {
        axios
            .get(`http://localhost:9000/todo/${userID}`)
            .then((res) => {
                setTodoData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userID]);

    useEffect(() => {
        axios
            .get(`http://localhost:9000/todo/list/${items[selected]}`)
            .then((res) => {
                setSelectedTasks(res.data);
                console.log(selectedTasks)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [selected]);

    useEffect(() => setColor(formValues.color), [formValues]);

    const handleNewListClick = () => setNewListOpen(!newListOpen) && setError('');

    const handleChanges = (e) => {
        e.preventDefault();
        setError('');
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
        <div className={theme ? 'app dark-primary' : 'app light-primary'}>
            <Header handleNewListClick={handleNewListClick} />

            {userID ? (
                <div className='site-wrapper'>
                    <TodoSidebar todoData={todoData} theme={theme} setSelectedTasks={setSelectedTasks} />
                    <div className='todo-items-container'>
                        {selectedTasks.map((item, index) => {
                            return <TodoItems key={index} index={index} item={item} selectedTasks={selectedTasks} setTodoData={setSelectedTasks} theme={theme} />
                        })}
                    </div>
                </div>
            ) : (
                <div className='site-wrapper welcome-container'>
                    <div className='welcome-left'>
                        <h1>Better manage your todos.</h1>
                        <Link to='/signin'><button>Sign In</button></Link>
                        <Link to='/register'><button>Create an Account</button></Link>
                    </div>
                    <div className='welcome-right'>
                        <img src={WelcomeImage} alt='Todoly home screen' />
                    </div>
                </div>
            )}

            {newListOpen && (
                <div className='modal-container'>
                    <div className={theme ? 'modal dark-primary' : 'modal white-secondary'}>
                        <div className='modal-top'>
                            <div className='modal-title'>New List</div>
                            <div className='modal-close-btn' onClick={handleNewListClick}>
                                <img src={theme ? PlusLight : PlusDark} alt='plus icon' />
                            </div>
                        </div>
                        {error && <p className='error-message'>{error}</p>}
                        <form>
                            <p>Title:</p>
                            <input className='auth-input' type='text' placeholder='Title' name='title' value={formValues.title} onChange={handleChanges} />
                            <p>Color:</p>
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
                            <button onClick={handleCreateList} style={{width: '100%'}}>
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
