import { Center, Card, Stack, InputWrapper, Input, Button } from "@mantine/core"

const Login = () => {

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
                        <Input type="email" />
                    </InputWrapper>
                    <InputWrapper
                        label="Password"
                        required
                    >
                        <Input type="password" />
                    </InputWrapper>
                    <Button>Login</Button>
                </Stack>
            </Card>
        </Center>
    )
}

export default Login
