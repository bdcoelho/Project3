import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../../utils/UserContext";
import TodoContext from "../../utils/TodoContext";
import Draggable from 'react-draggable';
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import "./style.css"

// Todo: 
// • Drag still isn't quite right, it I have added a handle on drag to mitigate issue of pageX being mouse based
// • Could use the edit mode, so that when click, the top of bar turns blue with a green move box on the left and a red delete box on the right
// • When the widget is deleted you have to refresh the page to get it to remove.  

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

export default function Todolist() {

    const classes = useStyles();
    const [pending, setPending] = useState("");
    const [retrievedNotes, setRetrievedNotes] = useState({});
    const [reloadData, setReloadData] = useState(false);
    const { id } = useContext(UserContext);
    const [noteLoc, setNoteLoc] = useContext(TodoContext);

    useEffect(() => {
        setReloadData(false);
        axios.get("/api/notes/" + id)
        .then(result => {
            setRetrievedNotes(result.data)
        })
    }, [reloadData, id, noteLoc]);

    const handleChange = event => {
        setPending(event.target.value);
    };

    const handleNoteDelete = event => {
        const noteId = event.currentTarget.parentNode.id;
        axios.delete("/api/notes/" + noteId)
        .then(setReloadData(true));
    }

    const handleWidgetDelete = event => {
        axios.delete("/api/todolist/" + id)
        .then(axios.delete("/api/allNotes/" + id))
        .then(setReloadData(true))
    }

    const handleDraggingStop = (e) => {
        setNoteLoc({
            xCoord: e.pageX,
            yCoord: e.pageY
        })
    
        axios.put("/api/todolist/" + id, noteLoc)
    };

    const submitTodo = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            
            const data = {
                userId: id,
                note: pending,
                notePriority: 3,
                completed: false,
            }

            axios
            .post('/api/notes', data)
            .then(setPending(""))
            .then(setReloadData(true))
            .catch(err => {
                console.error(err);
            });
        }
    }

    return (
        <Draggable
            handle=".noteH1"
            grid={[100, 100]}
            onDrag={handleDraggingStop}
            defaultPosition={{x: noteLoc.xCoord, y: noteLoc.yCoord}}
        >
            <div 
                className="todo-list"
            >
                <button 
                    className="noteButton"
                    onClick={handleWidgetDelete}
                >
                    x
                </button>
                <h1 className="noteH1">TODO</h1>
                <div className="listContainer">
                    <ul>
                        { retrievedNotes.length ? retrievedNotes.map(list => (
                            <li 
                                className="listItems"
                                key={list._id}
                                id={list._id}
                            >
                                {list.note}
                                <button onClick={handleNoteDelete} className="listDeleteButton">
                                    x
                                </button>
                            </li>
                        )) : null }
                    </ul>
                </div>

                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField
                            id="standard-basic"
                            label="Add Note"
                            rowsMax={4}
                            value={pending}
                            onChange={handleChange}
                            onKeyDown={submitTodo}
                        />
                    </div>
                </form>
            </div>
        </Draggable>
    );
}
