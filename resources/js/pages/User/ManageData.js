import { Button, Container, Divider, Group, Select, Stack, Table, Text, useMantineTheme } from "@mantine/core"
import { Dropzone, MS_EXCEL_MIME_TYPE } from "@mantine/dropzone"
import axios from "axios";
import { getYear } from "date-fns";
import { useEffect, useState } from "react";
import { Upload, X, Photo, File } from "tabler-icons-react";
import baseUrl from "../../constant/baseUrl";

function getIconColor(status, theme) {
    return status.accepted
        ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
        : status.rejected
            ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
            : theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[7];
}


const ImageUploadIcon = ({ status, ...props }) => {
    if (status.accepted) {
        return <Upload {...props} />;
    }

    if (status.rejected) {
        return <X {...props} />;
    }

    return <File {...props} />;
}

const DropzoneChildren = (status, theme) => (
    <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
        <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />

        <div>
            <Text size="xl" inline>
                Drag or drop files here
            </Text>
        </div>
    </Group>
)

const ManageData = () => {
    const theme = useMantineTheme()
    const [tahun, setTahun] = useState([])
    const [files, setFiles] = useState([])
    const [form, setForm] = useState({
        file: null,
        tahun: getYear(new Date())
    })
    const [history, setHistory] = useState([])

    const onSubmit = () => {
        const fData = new FormData();
        fData.append('excel', form.file)
        fData.append('tahun', form.tahun)

        const config = {
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                console.log(percentCompleted)
            }
        }

        axios.post(baseUrl + '/upload', fData, config)
            .then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err.response)
            })

    }

    useEffect(() => {
        console.log(form)
    }, [form])

    useEffect(() => {
        let date = new Date();
        let year = getYear(date) - 5;
        let tmp = []

        for (let i = 1; i <= 5; i++) {
            tmp.push({
                value: year + i,
                label: year + i,
            })
        }
        setTahun(tmp)

        axios.get(baseUrl + "/excel")
            .then((res) => {
                setHistory(res.data)
            }).catch((err) => {
                console.log(err.response)
            })
    }, [])

    return (
        <Container>
            <div>
                <Stack spacing={10}>
                    <Dropzone
                        multiple={false}
                        onDrop={(files) => { console.log('accepted files', files); setFiles(files); setForm({ ...form, file: files[0] }) }}
                        onReject={(files) => console.log('rejected files', files)}
                        accept={MS_EXCEL_MIME_TYPE}
                    >
                        {(status) => DropzoneChildren(status, theme)}
                    </Dropzone>
                    <Select
                        label="Pilih Tahun"
                        data={tahun}
                        defaultValue={form.tahun}
                        value={form.tahun}
                        onChange={(val) => setForm({ ...form, tahun: val })}
                    />
                    <Button disabled={files.length == 0} onClick={onSubmit} > Upload  </Button>
                </Stack>
            </div>
            <Divider my={10} />
            <div>
                <Stack>
                    <Text size="xl" weight={"500"}>History</Text>
                    <HistoryTable data={history} />
                </Stack>
            </div>
        </Container>
    )
}

const HistoryTable = ({ data }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Rate</th>
                    <th>Tahun</th>
                    <th>Jumlah Data</th>
                </tr>
            </thead>
            <tbody>
                {data.map((data, key) => (
                    <tr key={key}>
                        <td>
                            {data.rate}
                        </td>
                        <td>
                            {data.tahun}
                        </td>
                        <td>
                            {data.total}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default ManageData
