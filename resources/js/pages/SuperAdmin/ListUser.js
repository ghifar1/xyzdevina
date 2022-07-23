import { ActionIcon, Button, Container, Group, Input, InputWrapper, Modal, Stack, Table, Text } from "@mantine/core"
import { useState } from "react"
import { Plus, UserPlus } from "tabler-icons-react"

const ListUser = () => {
    const [modalOpen, setModalOpen] = useState(false)

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
                        <Input type="email" />
                    </InputWrapper>
                    <InputWrapper
                        label="Nama"
                        required
                    >
                        <Input />
                    </InputWrapper>
                    <InputWrapper
                        label="Divisi"
                        required
                    >
                        <Input />
                    </InputWrapper>
                    <Button>Save</Button>
                </Stack>
            </Modal>
            <Stack>
                <Group>
                    <Text size="xl" weight={"500"}>List User</Text>
                    <ActionIcon onClick={() => setModalOpen(true)}>
                        <UserPlus />
                    </ActionIcon>
                </Group>
                <UserTable />
            </Stack>
        </Container>
    )
}

const UserTable = () => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Element position</th>
                    <th>Element name</th>
                    <th>Symbol</th>
                    <th>Atomic mass</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        aaaaa
                    </td>
                    <td>
                        bbb
                    </td>
                    <td>
                        ccc
                    </td>
                    <td>
                        eee
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}

export default ListUser
