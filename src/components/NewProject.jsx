import Modal from "./ErrorModal";
import Input from "./Input";
import { useRef } from "react";

export default function NewProject({onAdd , onCancle}){

    const modal = useRef();

    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function handleSave(){
        const enteredTitle = title.current.value;
        const enteredDEscription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        if(enteredTitle.trim() === '' || enteredDEscription.trim() === "" || enteredDueDate.trim() === "" ){
            modal.current.open();
            return;
        }

        onAdd({
            title: enteredTitle,
            description: enteredDEscription,
            dueDate: enteredDueDate,
        })
    }

    return(
        <>
        <Modal ref={modal} buttonCaption = "Okay" >
            <h2 className="text-xl font-bold text-stone-700 mt-4 my-4">Invalid Input</h2>
            <p className="text-stone-600 mb-4">...Opss .... looks like you forgot value.</p>
        </Modal>
        <div className="w-[35rem] mt-16 ">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button className="text-stone-800 hover:text-stone-950" onClick={onCancle}>Cancle</button>
                </li>
                <li>
                    <button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button>
                </li>
            </menu>
            <div>
                <Input ref={title} label="Title"/>
                <Input ref={description} label="Description" textarea={true}/>
                <Input type='date' ref={dueDate} label="Due Date"/>
            </div>
        </div>
        </>
    )
}