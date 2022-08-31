import { ActionIcon, Avatar, Container, Divider, Group, Input, InputWrapper, Modal, Stack } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import axios from "axios"
import { useEffect, useState } from "react"
import { Edit, X } from "tabler-icons-react"
import baseUrl from "../../constant/baseUrl"

const Profile = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [isEdited, setIsEdited] = useState(false)
    const [user, SetUser] = useState({
        id: 0,
        name: '',
        email: '',
        divisi: '',
        password: '',
    })

    useEffect(() => {
        axios.get(`${baseUrl}/profile`, {
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token")).access_token
            }
        }).then((res) => {
            console.log(res.data);
            SetUser(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const saveUser = (bool) => {
        if (bool) {
            return
        }

        axios.post(`${baseUrl}/profile/edit`, user, {
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token")).access_token
            }
        })
            .then((res) => {
                console.log(res.data);
                showNotification({
                    message: 'success'
                })
            }).catch((err) => {
                console.log(err);
                showNotification({
                    message: 'failed',
                    color: 'red'
                })
            })
    }

    return (
        <Container py={50}>
            <Modal
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                centered
                title="Edit Photo"
            >

            </Modal>
            {/* <Group position="center">
                <Avatar onClick={() => setModalOpen(true)} src={"https://images.bisnis-cdn.com/posts/2022/05/06/1530404/bill-gates.jpg"} size="xl" radius="xl" />
            </Group> */}
            <Divider my={20} variant="dashed" />
            <Group position="right">
                <ActionIcon onClick={() => {
                    saveUser(!isEdited)
                    setIsEdited(!isEdited)
                }}>
                    {isEdited ? <X /> : <Edit />}
                </ActionIcon>
            </Group>
            <Stack spacing={2}>
                <InputWrapper
                    label="Email"
                    required
                >
                    <Input type="email" disabled={!isEdited} value={user?.email ?? ""} onChange={(ev) => SetUser({ ...user, email: ev.target.value })} />
                </InputWrapper>
                <InputWrapper
                    label="Nama"
                    required
                >
                    <Input disabled={!isEdited} value={user?.name ?? ""} onChange={(ev) => SetUser({ ...user, name: ev.target.value })} />
                </InputWrapper>
                <InputWrapper
                    label="Divisi"
                    required
                >
                    <Input disabled={!isEdited} value={user?.divisi ?? ""} onChange={(ev) => SetUser({...user, divisi: ev.target.value})}  />
                </InputWrapper>
                {isEdited && (
                    <InputWrapper
                        label="Password baru"
                    >
                        <Input value={user.password} onChange={(ev) => SetUser({...user, password: ev.target.value})}  />
                    </InputWrapper>
                )}
            </Stack>
        </Container>
    )
}

export default Profile
