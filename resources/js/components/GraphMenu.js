import { Button, Container, Divider, Group, Select } from "@mantine/core"
import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import baseUrl from "../constant/baseUrl"
import tahunGraphContext from "../context/tahunGraphContext"

const GraphMenu = (props) => {
    const navigate = useNavigate()
    const [tahun, setTahun] = useState("")
    const [tahunDropdown, setTahunDropdown] = useState([])

    useEffect(() => {
        axios.get(baseUrl + "/excel")
            .then((res) => {
                let tmp = []
                res.data.forEach((data) => {
                    tmp.push({
                        value: data?.tahun,
                        label: data?.tahun
                    })
                })
                setTahun(res.data[res.data.length - 1].tahun)
                setTahunDropdown(tmp)
            }).catch((err) => {
                console.log(err.response)
            })
    }, [])


    return (
        <Container>
            <tahunGraphContext.Provider value={{ tahun, setTahun }}>
                <div>
                    <Group position="center">
                        <Button variant="default" onClick={() => navigate('/a/dashboard')}>Summary</Button>
                        <Button variant="default" onClick={() => navigate('/a/dashboard/segment')}>Segment</Button>
                        <Button variant="default" onClick={() => navigate('/a/dashboard/area')}>Area</Button>
                        <Button variant="default" onClick={() => navigate('/a/dashboard/dealer')}>Dealer</Button>
                        <Button variant="default" onClick={() => navigate('/a/dashboard/branch')}>Branch</Button>
                        <Button variant="default" onClick={() => navigate('/a/dashboard/channel')}>Channel</Button>
                        <Button variant="default" onClick={() => navigate('/a/dashboard/customer')}>Customer</Button>
                        <Button variant="default" onClick={() => navigate('/a/dashboard/sales')}>Sales</Button>
                    </Group>
                </div>
                <Divider my={10} variant="dashed" />
                <Select
                    label="Tahun"
                    placeholder={tahun}
                    value={tahun}
                    data={tahunDropdown}
                    onChange={(val) => {
                        setTahun(val)
                    }}
                />
                {props.children}
            </tahunGraphContext.Provider>
        </Container>
    )
}

export default GraphMenu
