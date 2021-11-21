
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Container, Header, Icon, Item, Modal, Table } from 'semantic-ui-react';
import { ITask, useCrudBasic } from '../hooks/crudhook';
import { DeleteModal } from "./utilities";
export const List = () => {

    const { state, list, deleteById } = useCrudBasic();
    const handleDelete = (id: any) => {
        deleteById(id);
        window.location.reload();
    }
    const basicHook = useCrudBasic();
    let { id }: any = useParams();
    const [open, setOpen] = React.useState(false)


    //watches changes of the incoming list request
    useEffect(() => {
        list();
    }, []);
    let totalTaskCost = 0;
    let totalTaskTax = 0;
    let totalTaskProfit = 0;

    state.taskList.forEach((x: ITask) => {
        totalTaskCost += x.costPrice;
        totalTaskTax += x.taxTaken;
        totalTaskProfit += x.profit
    });

    return (
        <Container textAlign="center">
            <Header as='h1' style={{ float: "left" }}> Tasks</Header>
            <br /><br />
            <br />

            <div style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "60em"
            }}>
                <Item.Group relaxed divided >
                    {state.taskList.map((x: any) => {
                        return (x.assignedTo ? (<Item key={x._id}>
                            <div style={{ width: "250px" }} >
                                <div style={{ float: "left", marginRight: "1.5px" }}>
                                    <Link to={`/edit/${x._id}`}> <div style={{
                                        width: "10px",
                                        minHeight: "135px",
                                        background: "blue",
                                    }}> </div></Link>
                                </div>
                                <div style={{ float: "right" }}>
                                    <div style={{ float: "left", marginRight: "35px" }}> <Card.Header ><b>{x.title}</b></Card.Header></div>
                                    <div style={{ float: "right" }}> <Card.Header style={{ color: "blue" }}>{"€"}{x.sellingPrice}</Card.Header></div><br /><br />
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ float: "left" }}>Cost</div>
                                        <div style={{ display: "inline" }}>Profit</div>
                                        <div style={{ float: "right" }}>Tax @ {x.taxRate}{"%"}</div>
                                    </div>
                                    <div>
                                        <hr style={{ borderTop: "1px dotted grey" }} />

                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ float: "left", color: "red" }}><b> {"€"} {x.costPrice}</b></div>
                                        <div style={{ display: "inline", color: "green" }}><b>{"€"}{x.profit}</b></div>
                                        <div style={{ float: "right", color: "grey" }}><b>{"€"}{x.taxTaken}</b></div>
                                    </div>
                                    <br />
                                    <div style={{ textAlign: "center" }}>
                                        <Button style={{ width: "75px", float: "left", color: "white" }} size="tiny"
                                            content='Planned' color="blue"
                                        />
                                        <div onClick={() => { handleDelete(x._id) }}>
                                            <Link to={''}><Icon style={{ color: "red" }} name="delete calendar" /></Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Item>) : <Item key={x._id}>

                            <div style={{ width: "250px" }}>
                                <div style={{ float: "left", marginRight: "1.5px" }}>
                                    <Link to={`/edit/${x._id}`}> <div style={{
                                        width: "10px",
                                        minHeight: "135px",
                                        background: "blue",
                                    }}> </div></Link>
                                </div>
                                <div style={{ float: "right" }}>
                                    <div style={{ float: "left", marginRight: "35px" }}> <Card.Header ><b>{x.title}</b></Card.Header></div>
                                    <div style={{ float: "right" }}> <Card.Header style={{ color: "blue" }} >{"€"}{x.sellingPrice}</Card.Header></div><br /><br />
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ float: "left" }}>Cost</div>
                                        <div style={{ display: "inline" }}>Profit</div>
                                        <div style={{ float: "right" }}>Tax @ {x.taxRate}{"%"}</div>
                                    </div>
                                    <div>
                                        <hr style={{ borderTop: "1px dotted grey" }} />

                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ float: "left", color: "red" }}><b> {"€"} {x.costPrice}</b></div>
                                        <div style={{ display: "inline", color: "green" }}><b>{"€"}{x.profit}</b></div>
                                        <div style={{ float: "right", color: "grey" }}><b>{"€"}{x.taxTaken}</b></div>
                                    </div>
                                    <br />
                                    <div style={{ textAlign: "center" }}>
                                        <Button style={{ width: "95px", float: "left", color: "white" }} size="tiny"
                                            content='UNPLANNED' color="red"
                                        />
                                        <Modal
                                            onClose={() => setOpen(false)}
                                            onOpen={() => setOpen(true)}
                                            open={open}
                                            trigger={<Button>Show Modal</Button>}
                                        >
                                            <Modal.Header>Delete Your Task</Modal.Header>
                                            <Modal.Content>
                                                <p>Are you sure you want to delete a task</p>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button negative onClick={() => setOpen(false)}>
                                                    No
                                                </Button>
                                                <Button positive onClick={handleDelete}>
                                                    Yes
                                                </Button>
                                            </Modal.Actions>
                                        </Modal>
                                        <div >
                                            <Link to={''}><Icon style={{ color: "red" }} name="delete calendar" /></Link>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                        </Item>)
                    })}

                </Item.Group>
                <Table style={{ marginRight: "-20%" }}>
                    <Table.Body>
                        <Table.Row verticalAlign="top">
                            <Table.Cell>
                                <br />
                                <p>Total Tasks cost:</p>
                                <br />
                                <p>Total Tasks tax:</p>
                                <br />
                                <p> Total Tasks tax: </p><br />
                                <b> Total Tasks price:</b><br />
                            </Table.Cell>
                            <Table.Cell verticalAlign="top" >
                                <br />
                                <p style={{ color: "red" }}>{"€"}{totalTaskCost}</p><br />
                                <p style={{ color: "grey" }}>{"€"}{totalTaskTax}</p><br />
                                <p style={{ color: "green" }}>{"€"}{totalTaskProfit}</p><br />
                                <p style={{ color: "blue" }}>{"€"}{totalTaskCost + totalTaskTax + totalTaskProfit}</p><br />
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Button style={{ width: "550px" }} size="massive" color="orange"
                    content='Add New TasK' as="a" href="/add"
                />
            </div>
        </Container>);


}

