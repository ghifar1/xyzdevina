import { ActionIcon, Avatar, Container, Divider, Group, Input, InputWrapper, Modal, Stack } from "@mantine/core"
import { useState } from "react"
import { Edit, X } from "tabler-icons-react"

const Profile = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [isEdited, setIsEdited] = useState(false)

    return (
        <Container py={50}>
            <Modal
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                centered
                title="Edit Photo"
            >

            </Modal>
            <Group position="center">
                <Avatar onClick={() => setModalOpen(true)} src={"https://images.bisnis-cdn.com/posts/2022/05/06/1530404/bill-gates.jpg"} size="xl" radius="xl" />
            </Group>
            <Divider my={20} variant="dashed" />
            <Group position="right">
                <ActionIcon onClick={() => setIsEdited(!isEdited)}>
                    {isEdited ? <X /> : <Edit />}
                </ActionIcon>
            </Group>
            <Stack spacing={2}>
                <InputWrapper
                    label="Email"
                    required
                >
                    <Input type="email" disabled={!isEdited} />
                </InputWrapper>
                <InputWrapper
                    label="Nama"
                    required
                >
                    <Input disabled={!isEdited} />
                </InputWrapper>
                <InputWrapper
                    label="Divisi"
                    required
                >
                    <Input disabled={!isEdited} />
                </InputWrapper>
            </Stack>
        </Container>
    )
}

export default Profile
