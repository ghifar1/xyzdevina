import { Center, Card, Stack, InputWrapper, Input, Button } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import baseUrl from "../constant/baseUrl"

const Login = () => {
    const [form, setForm] = useState({
        'email': '',
        'password': '',
    })
    const navigate = useNavigate()

    const onLogin = () => {
        axios.post(baseUrl + '/login', form)
            .then((res) => {
                localStorage.setItem("token", JSON.stringify(res.data))
                showNotification({
                    title: 'Berhasil Login',
                    color: 'green'
                })
                navigate('/a/dashboard')
            })
            .catch((err) => {
                showNotification({
                    title: 'Login Gagal',
                    color: 'red'
                })
            })
    }

    return (
        <Center style={{ height: '100vh' }}>
            <Card shadow="sm" sx={(theme) => ({
                width: '40%',
                '@media (max-width: 755px)': {
                    width: '100%',
                    margin: '10px'
                }
            })}>
                <Stack align="stretch">
                    <InputWrapper
                        label="Email"
                        required
                    >
                        <Input type="email" onChange={(ev) => setForm({ ...form, email: ev.target.value })} />
                    </InputWrapper>
                    <InputWrapper
                        label="Password"
                        required
                    >
                        <Input type="password" onChange={(ev) => setForm({ ...form, password: ev.target.value })} />
                    </InputWrapper>
                    <Button onClick={onLogin}>Login</Button>
                </Stack>
            </Card>
        </Center>
    )
}

export default Login
