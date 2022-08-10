import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const TaskForm = ({ open, handleClickOpen, handleClose, components, task }) => {

    const [formComponents, setFormComponents] = useState([]);
    const [claimed, setClaimed] = useState(false);
    const [assignee, setAssignee] = useState(null);

    const [variableValues, setVariableValues] = useState({});

    useEffect(() => {
        let formVariables = {};
        let formComponents = {};

        if (!task) {
            setFormComponents(components);
        } else if (task) {
            fetch('http://localhost:8081/form/' + task.id)
                .then(response => response.json())
                .then(data => {

                    formComponents = data.components;

                    for (var key in data.components) {
                        if (data.components[key].type !== 'text') {
                            formVariables[data.components[key].key] = { value: "" };
                        }
                    }


                    return fetch('http://localhost:8081/variable/' + task.processInstanceId);
                })
                .then(response => response.json())
                .then(data => {
                    console.log(formVariables);
                    console.log(data);

                    for (var key in data) {
                        if (key in formVariables) {
                            formVariables[key] = { value: data[key].value };
                        }
                    }

                    setFormComponents(formComponents);
                    setClaimed(task.assignee !== null);
                    setAssignee(task.assignee);
                    setVariableValues(formVariables);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }, [open, task, components]);

    const handleClaim = function () {
        fetch(
            'http://localhost:8081/task/' + task.id + '/claim/demo',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                setClaimed(true);
                setAssignee('demo');
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const handleUnclaim = function () {
        fetch(
            'http://localhost:8081/task/' + task.id + '/unclaim',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                setClaimed(false);
                setAssignee(null);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const handleComplete = function () {
        fetch(
            'http://localhost:8081/task/' + task.id + '/complete',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    variables: variableValues
                })
            }
        )
            .then((response) => handleClose())
            .catch((err) => {
                console.log(err.message);
            });
    }

    const handleInputChange = function (event) {
        setVariableValues({ ...variableValues, [event.target.id]: { value: event.target.value } });
    }

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            <div>{task?.name}</div>
                            <div style={{ 'fontSize': '13px' }}>{task?.caseInstanceId}</div>
                            <div style={{ 'fontSize': '10px' }}>{task?.id}</div>
                        </Typography>
                        {!claimed ?
                            <Button autoFocus color="inherit" onClick={handleClaim}>
                                Claim
                            </Button>
                            :
                            <Button autoFocus color="inherit" onClick={handleUnclaim}>
                                <div>{assignee} <sup style={{ 'fontSize': '10px' }}>x</sup></div>
                            </Button>
                        }
                        <Button autoFocus color="inherit" onClick={handleComplete}>
                            Complete
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={{ display: 'grid', padding: '10px' }}>
                    {formComponents?.map(component => {
                        if (component.type === 'text') {
                            return (
                                <h2 key={component.id} id={component.id}>{component.text}</h2>
                            );
                        } else {
                            return (
                                <FormControl key={component.id} style={{ padding: '5px' }} disabled={!claimed}>
                                    <TextField id={component.key} aria-describedby="my-helper-text" disabled={!claimed} value={variableValues[component.key].value} onChange={handleInputChange} />
                                    <FormHelperText id="my-helper-text">{component.label}</FormHelperText>
                                </FormControl>
                            );
                        }
                    })}
                </div>
            </Dialog>
        </div>
    );
}