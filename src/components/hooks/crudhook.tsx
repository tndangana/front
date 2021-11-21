import * as React from 'react';
import API from '../api';
import axios from 'axios';
import { useContext } from 'react';



// interface to define attributes need for country record
export interface ITask {
    id?: any
    title: string
    sellingPrice: number
    costPrice: number
    taxRate: string
    taxTaken: number
    profit: number
    assignedTo: string
}

export interface IUser {
    id?: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: any,
        geo: {
            lat: any,
            lng: any
        }
    },
    phone: any,
    website: any,
    company: {
        name: string,
        catchPhrase: any,
        bs: string
    }
}


export interface IRequestStatus {
    error: boolean,
    isLoading: boolean,
    isSuccesfull: boolean,
    message: string
}

export interface IInitialState {
    id: any,
    task: ITask
    taskList: ITask[]
    userList: IUser[]
    isUpdated: boolean
    isDeleted: boolean
}


export const initialState: IInitialState = { task: { assignedTo: "", costPrice: 0, profit: 0, sellingPrice: 0, taxRate: "", taxTaken: 0, title: "" }, taskList: [], userList: [], id: "", isDeleted: false, isUpdated: false }


//custom hook
export const useCrudBasic = () => {
    //watches the life cycle of an http request and displays result accordingly
    const [requestStatus, setRequestStatus] = React.useState<IRequestStatus>({ error: false, isLoading: false, isSuccesfull: false, message: "" });
    //Captures state and displayes it globally
    const { state, dispatch } = useContext(TaskContext);
    //define and populates country attribute
    const [task, setTask] = React.useState<ITask>({ assignedTo: "", id: "", costPrice: 0, profit: 0, sellingPrice: 0, taxRate: "", taxTaken: 0, title: "" })


    //watches changes in html input eg textfield
    const handleTaskChange = (e: any) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value })
    }
    const onTaxRateChange = (event: any, result: any) => {
        const { value } = result || event.target;
        setTask({ ...task, taxRate: value });
    };
    const onAssignedUserChange = (event: any, result: any) => {
        const { value } = result || event.target;
        setTask({ ...task, assignedTo: value });
    };
    


    // ensure that records passes certain conditions before being persited to database
    const validation = (c: ITask) => {
        const messages: string[] = [];
        if (!c.sellingPrice) {
            messages.push("Selling price should not be empty !!");
        }
        else if (!c.costPrice) {
            messages.push("Cost price should not be empty !!")
        }
        else if (!c.taxRate) {
            messages.push("Tax rate should should not be empty !!")
        }
        return messages;
    }

    // create hook
    const create = async (task: ITask) => {

        try {
            setRequestStatus({ error: false, isLoading: true, isSuccesfull: false, message: "Still loading request" });
            const messages = validation(task);
            if (messages.length === 0) {
                let payload = await API.post(`/task`, task);
                if (payload.status === 201) {
                    dispatch({ type: "CreateResponseAction", task: payload.data })
                    setRequestStatus({ error: false, isLoading: false, isSuccesfull: true, message: "Task has been saved" });
                }

            }
        } catch (error) {
                setRequestStatus({ error: true, isSuccesfull: false, isLoading: false, message: "Task record already available" })
           
        } finally {
            setRequestStatus({ error: false, isSuccesfull: false, isLoading: false, message: "" });

        }
    }

    //update function
    const update = async (task: ITask, id: string) => {
        try {
            setRequestStatus({ error: false, isLoading: true, isSuccesfull: false, message: "Still loading request" });
            const messages = validation(task);
            if (messages.length === 0) {
                let updatedPayload = await API.put(`/task/${id}`, task);
                if (updatedPayload.status === 200) {
                    dispatch({ type: "TaskUpdateAction", isUpdated: true });
                    setRequestStatus({ error: false, isLoading: false, isSuccesfull: true, message: "Task has been updated" });
                }
            }
        } catch (error) {
                setRequestStatus({ error: true, isSuccesfull: false, isLoading: false, message: "Record was not found !!" })

        } finally {
            setRequestStatus({ error: false, isSuccesfull: false, isLoading: false, message: "" });

        }
    }

    //list function
    const list = async () => {
        try {
            setRequestStatus({ error: false, isLoading: true, isSuccesfull: false, message: "Still loading request" });
            let listPayload = await API.get(`/task`);
            if (listPayload.status === 200) {
                console.log(listPayload.data)
                dispatch({ type: "TaskListResponseAction", taskList: listPayload.data })
            }
            else if (listPayload.status === 204) {
                setRequestStatus({ error: false, isSuccesfull: true, isLoading: false, message: "List is empty!!" });
                dispatch({ type: "TaskListResponseAction", countryList: listPayload.data });
            }

        } catch (error) {
                setRequestStatus({ error: true, isSuccesfull: false, isLoading: false, message: "Record was not found !!" });

        } finally {
            setRequestStatus({ error: false, isSuccesfull: false, isLoading: false, message: "" });

        }
    }

    //find by id function
    const findById = async (id: any) => {
        try {

            setRequestStatus({ error: false, isLoading: true, isSuccesfull: false, message: "Still loading request" });
            let payloadById = await API.get(`/task/${id}`);

            //this is dummy data edit

            if (payloadById.status === 200) {
                dispatch({ type: "CreateResponseAction", task: payloadById.data });
                setRequestStatus({ error: false, isLoading: false, isSuccesfull: true, message: "Task has been has be found" });
            }


        } catch (error) {
                 setRequestStatus({ error: true, isSuccesfull: false, isLoading: false, message: "Task was not found !!" });
            
        }
        finally {
            setRequestStatus({ error: false, isSuccesfull: false, isLoading: false, message: "" });
        }

    }


    // Consuming an extenal API
    const getUsers = async () => {
        try {
            let users = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        if (users.status === 200) {
            dispatch({ type: "UserListResponseAction", userList: users.data });
        }
        } catch (error) {
            console.error(error);
        }
    }

    // delete by id function
    const deleteById = async (id: ITask['id']) => {
        try {
            let deletedPayload = await API.delete(`/task/${id}`);
            if (deletedPayload.status === 200) {
                dispatch({ type: "TaskDeleteAction", isDeleted: true });
            }
        } catch (error) {
                setRequestStatus({ error: true, isSuccesfull: false, isLoading: false, message: "Record did not delete.Something went wrong" });
                dispatch({ type: "TaskDeleteAction", isDeleted: false });

           
        } finally {
            setRequestStatus({ error: false, isSuccesfull: false, isLoading: false, message: "" });
        }
    }


    return {
        create,
        update,
        list,
        deleteById,
        findById,
        handleTaskChange,
        task,
        validation,
        setTask,
        state, onTaxRateChange,getUsers,onAssignedUserChange
    }

}

interface ICreateRequestAction {
    type: "CreateRequestAction",
    task: ITask
}

interface ICreateResponseAction {
    type: "CreateResponseAction",
    task: ITask
}
interface ITaskUpdateAction {
    type: "TaskUpdateAction",
    isUpdated: boolean
}
interface ITaskDeletedAction {
    type: "TaskDeleteAction",
    isDeleted: boolean
}

interface ITaskListResponseAction {
    type: "TaskListResponseAction",
    taskList: ITask[]
}

interface IUserListResponseAction {
    type: "UserListResponseAction",
    userList: IUser[]
}
type Action = ICreateRequestAction | ICreateResponseAction | ITaskListResponseAction | ITaskUpdateAction | ITaskDeletedAction | IUserListResponseAction
//
//helps with state management
const taskReducer = (state = initialState, action: Action) => {
    switch (action.type) {

        case "TaskListResponseAction":
            return {
                ...state, taskList: action.taskList
            }
        case "CreateRequestAction":
            return {
                ...state, task: action.task
            }
        case "CreateResponseAction":
            return {
                ...state, task: action.task
            }
        case "TaskUpdateAction":
            return {
                ...state, isUpdated: action.isUpdated
            }
        case "TaskDeleteAction":
            return {
                ...state, isDeleted: action.isDeleted
            }
        case "UserListResponseAction":
            return {
                ...state, userList: action.userList
            }
        default:
            return {
                ...state,
            }
    }

}
//response for global access of attributes to other components in the app
export const TaskContext = React.createContext<any>([]);
export const TaskContextProvider = (props: any) => {
    const [state, dispatch] = React.useReducer(taskReducer, initialState);
    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {props.children}
        </TaskContext.Provider>)

}
export const useTaskContext = () => React.useContext(TaskContext);



