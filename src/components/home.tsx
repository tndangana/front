import React from 'react'
import {
    Container,
    Menu,

} from 'semantic-ui-react'
export const FixedMenuLayout = () => (
    <div>
        <Menu fixed='top' inverted>
            <Container>
              
                <Menu.Item as='a' href="/">Home</Menu.Item>
                <Menu.Item as='a' href="/add">Add Task</Menu.Item>
                <Menu.Item as='a' href="/list">List Task</Menu.Item>
            </Container>
        </Menu>
        <Container text style={{ marginTop: '7em' }}>
            <br />  <br />
            <br />
            <br />
        </Container>
    </div>
)
