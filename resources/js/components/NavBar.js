import { AppShell, Navbar, Header, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const NavBar = (props) => {
    const navigate = useNavigate();
    return (
        <AppShell
            padding="md"
            header={<Header height={60} p="xs">
                <Group position='center'>
                    <Button variant='subtle' onClick={() => navigate('/a/dashboard')}>
                        Dashboard
                    </Button>
                    <Button variant='subtle' onClick={() => navigate('/a/manage_data')}>
                        Manage Data
                    </Button>
                    <Button variant='subtle' onClick={() => navigate('/a/profile')}>
                        User
                    </Button>
                    <Button variant='subtle' onClick={() => navigate('/a/list_user')}>
                        Management User
                    </Button>
                    <Button variant='subtle' color={"red"} onClick={() => navigate('/login')}>
                        Logout
                    </Button>
                </Group>
            </Header>}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            {props.children}
        </AppShell>
    )
}

export default NavBar
