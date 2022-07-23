import { Button, Container, Divider, Group } from "@mantine/core"
import {useNavigate} from "react-router-dom"

const GraphMenu = (props) => {
    const navigate = useNavigate()

    return (
        <Container>
            <div>
                <Group position="center">
                    <Button variant="default" onClick={() => navigate('/a/dashboard')}>Summary</Button>
                    <Button variant="default">Segment</Button>
                    <Button variant="default" onClick={() => navigate('/a/dashboard/area')}>Area</Button>
                    <Button variant="default">Dealer</Button>
                    <Button variant="default">Branch</Button>
                    <Button variant="default">Channel</Button>
                    <Button variant="default">Customer</Button>
                    <Button variant="default">Sales</Button>
                </Group>
            </div>
            <Divider my={10} variant="dashed" />
            {props.children}
        </Container>
    )
}

export default GraphMenu
