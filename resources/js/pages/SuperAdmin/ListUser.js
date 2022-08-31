import { ActionIcon, Button, Container, Group, Input, InputWrapper, Modal, Stack, Table, Text } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import axios from "axios"
import { useEffect, useState } from "react"
import { Plus, UserPlus } from "tabler-icons-react"
import baseUrl from "../../constant/baseUrl"

const ListUser = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({
        email: '',
        name: '',
        divisi: '',
        password: '',
        confirm_password: '',
    })


    useEffect(() => {

    }, [user])

    useEffect(() => {
        axios.get(`${baseUrl}/profile/getall`)
            .then((res) => {
                console.log(res.data);
                setUsers(res.data)
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    const onSubmit = () => {
        axios.post(`${baseUrl}/profile/add`, user)
            .then((res) => {
                console.log(res.data);
                showNotification({
                    message: "success",
                })
                setModalOpen(false)
                axios.get(`${baseUrl}/profile/getall`)
                    .then((res) => {
                        console.log(res.data);
                        setUsers(res.data)
                    }).catch((err) => {
                        console.log(err);
                    })

            }).catch((err) => {
                console.log(err);
                showNotification({
                    message: "failed",
                    color: 'red',
                })
            })
    }

    return (
        <Container>
            <Modal
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Add User"
            >
                <Stack spacing={10}>
                    <InputWrapper
                        label="Email"
                        required
                    >
                        <Input type="email" value={user.email} onChange={(ev) => setUser({ ...user, email: ev.target.value })} />
                    </InputWrapper>
                    <InputWrapper
                        label="Nama"
                        required
                    >
                        <Input value={user.name} onChange={(ev) => setUser({ ...user, name: ev.target.value })} />
                    </InputWrapper>
                    <InputWrapper
                        label="Divisi"
                        required
                    >
                        <Input value={user.divisi} onChange={(ev) => setUser({ ...user, divisi: ev.target.value })} />
                    </InputWrapper>
                    <InputWrapper
                        label="Password"
                        required
                    >
                        <Input type={'password'} value={user.password} onChange={(ev) => setUser({ ...user, password: ev.target.value })} />
                    </InputWrapper>
                    <InputWrapper
                        label="Konfirmasi Password"
                        required
                    >
                        <Input type={'password'} value={user.confirm_password} onChange={(ev) => setUser({ ...user, confirm_password: ev.target.value })} />
                    </InputWrapper>
                    <Button onClick={onSubmit}>Save</Button>
                </Stack>
            </Modal>
            <Stack>
                <Group>
                    <Text size="xl" weight={"500"}>List User</Text>
                    <ActionIcon onClick={() => setModalOpen(true)}>
                        <UserPlus />
                    </ActionIcon>
                </Group>
                <UserTable user={users} />
            </Stack>
        </Container>
    )
}

const UserTable = ({ user }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Divisi</th>
                </tr>
            </thead>
            <tbody>
                {user.map((data, idx) => (
                    <tr key={idx}>
                        <td>
                            {data.name}
                        </td>
                        <td>
                            {data.email}
                        </td>
                        <td>
                            {data.divisi}
                        </td>

                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default ListUser
