import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
                <input value={title}
                       onChange={ onChangeHandler }
                       onKeyPress={ onKeyPressAddItem }
                />
                <button onClick={addItem}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>

    )
}

export default AddItemForm