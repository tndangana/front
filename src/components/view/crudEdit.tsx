import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button,  Container,  Form, Message, Select } from 'semantic-ui-react';
import toaster from 'toasted-notes';
import { useCrudBasic } from '../hooks/crudhook';


export const Edit = () => {
    const basichook = useCrudBasic();
    let users: any = []
    let navigate = useNavigate();
    let { id }:any = useParams();
    const { handleTaskChange,  validation, task, onTaxRateChange, onAssignedUserChange,update,setTask } = basichook;
    const { assignedTo, costPrice, title, taxRate, sellingPrice } = basichook.state.task;
    const taxRateList: any = [{ key: 'five', value: '5', text: '5%' },
    { key: 'ten', value: '10', text: '10%' },
    { key: 'eighteen', value: '18', text: '18%' },];
    React.useEffect(() => {

        //the real persiting of data
        basichook.findById(id);
    }, [id]);

    React.useEffect(() => {
        basichook.getUsers();
    }, []);

    React.useEffect(() => {
        setTask(basichook.state.task);
    }, [basichook.state.task])



    basichook.state.userList.forEach((x: any) => {
        users.push({ key: x.id ? x.id : "", value: x.username, text: x.username })
    });
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const messages = validation(basichook.state.task);
        if (messages.length > 0) {
            messages.map(message => {
                return toaster.notify(<Message
                    negative
                    warning
                    icon='info circle'
                    header={("You cannot submit!! Fix your data")}
                    content={message}
                />);
            })
        } else if (messages.length === 0) {
            await update(task,id);

            toaster.notify(<Message
                success
                icon='info circle'
                header={("Sucees")}
                content="Record has been submitted succesfully"
            />)
            return navigate("/list");
        }

    }

    return (
        <Container>
            <h1>Edit Task</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Title*:</label>
                    <input placeholder='Title' name="title" value={title} onChange={handleTaskChange} />
                </Form.Field>
                <Form.Field>
                    <label>Selling Price(exc tax)*:</label>
                    <input placeholder='€' name="sellingPrice" value={sellingPrice} onChange={handleTaskChange} />
                </Form.Field>
                <Form.Field>
                    <label>Cost Price(exc. tax)</label>
                    <input placeholder='€' name="costPrice" value={costPrice} onChange={handleTaskChange} />
                </Form.Field>
                <Form.Group unstackable widths={'16'}>
                    <Select placeholder='Tax Rate*:' value={taxRate} name="taxRate" onChange={onTaxRateChange} options={taxRateList} />
                </Form.Group>
                <Form.Group unstackable widths={5}>
                    <Select placeholder='Assigned To:' value={assignedTo} name="assignedTo" onChange={onAssignedUserChange} options={users} />
                </Form.Group>
                <Button type='submit' color="blue">Save</Button>
            </Form>
        </Container>
    );


}
