import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { useCrudBasic } from '../hooks/crudhook';


export const DeleteModal = (params: any) => {
    const [open, setOpen] = React.useState(false)

    const basicHook = useCrudBasic();
    const { deleteById } = basicHook;

    const handleDelete = () => {
        deleteById(params.id);
        setOpen(false);
        window.location.reload();
    }
    return (
        <>
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
        </>
    )
}


