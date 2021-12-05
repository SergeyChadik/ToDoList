import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}


function EditableSpan(props: EditableSpanPropsType){
    const [title, setTitle] = useState(props.title)

    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    return (
        editMode
        ? <input
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={onChangeHandler}
            />
        : <span onDoubleClick={onEditMode}>{props.title}</span>

    )
}

export default EditableSpan;