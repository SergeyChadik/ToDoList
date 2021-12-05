import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormType) {
    let [title, setTitle] = useState("")

    let [error, setError] =useState<string | null>(null)

    const addItem = () => {
        if(title.trim() !== '') {
            props.addItem(title);
            setTitle("");
        } else {
            setError('Title is requared')
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addItem();
        }
    }


    return (

            <div>
                <TextField variant="outlined"
                    value={title}
                           error={!!error}
                    onChange={ onChangeHandler }
                    onKeyPress={ onKeyPressAddItem }
                           label='Title'
                           helperText={error}
                />
                {/*<Button variant='contained' color='primary' onClick={addItem}>+</Button>*/}
                <IconButton color='primary' onClick={addItem}>
                    <AddBox />
                </IconButton>
                {/*{error && <div className='error-message'>{error}</div>}*/}
            </div>

    )
}

export default AddItemForm