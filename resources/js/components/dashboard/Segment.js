import { Grid, LoadingOverlay } from "@mantine/core"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import baseUrl from "../../constant/baseUrl"
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import abbreviateNumber from "../../constant/shortHand";
import tahunGraphContext from "../../context/tahunGraphContext";
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const SegmentGrowth = () => {
    const [labels, setLabels] = useState([])
    const [value, setValue] = useState([])
    const [loading, setLoading] = useState(false)
    const { tahun } = useContext(tahunGraphContext)
    const [bulan, setBulan] = useState({
        januari: [],
        februari: [],
        maret: []
    })

    useEffect(() => {
        setLoading(true)
        axios.get(baseUrl + "/segment/segmentGrowth?tahun=" + tahun)
            .then((res) => {
                let label_tmp = []
                res.data.labels.forEach((data) => {
                    label_tmp.push(data.segm)
                })

                res.data.data.forEach((data) => {
                    switch (data.bulan) {
                        case '1':
                            let newJan = bulan.januari
                            newJan.push(data.volume)
                            setBulan({ ...bulan, januari: newJan })
                            break;
                        case '2':
                            let newFeb = bulan.februari
                            newFeb.push(data.volume)
                            setBulan({ ...bulan, februari: newFeb })
                            break;
                        case '3':
                            let newMar = bulan.maret
                            newMar.push(data.volume)
                            setBulan({ ...bulan, maret: newMar })
                            break;

                        default:
                            break;
                    }
                })

                setLabels(label_tmp)
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }, [tahun])


    const dataa = {
        labels: labels,
        datasets: [
            {
                label: 'Januari',
                data: bulan.januari,
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: 'Februari',
                data: bulan.februari,
                backgroundColor: 'rgba(255, 150, 132, 1)',
            },
            {
                label: 'Maret',
                data: bulan.maret,
                backgroundColor: 'rgba(150, 150, 132, 1)',
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Pertumbuhan Month to Month Segmen',
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Transaction Volume (USD)'
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return abbreviateNumber(value)
                    }
                }
            }
        }

    };

    return (
        <div style={{ height: '500px', width: '100%', position: 'relative' }}>
            <LoadingOverlay visible={loading} />
            <Bar options={options} data={dataa} />
        </div>)
}

const KinerjaSegment = () => {
    const [labels, setLabels] = useState([])
    const [value, setValue] = useState([])
    const [loading, setLoading] = useState(false)
    const { tahun } = useContext(tahunGraphContext)

    useEffect(() => {
        setLoading(true)
        axios.get(baseUrl + "/segment/segment?tahun=" + tahun)
            .then((res) => {
                let label_tmp = []
                let value_tmp = []
                res.data.forEach((data) => {
                    label_tmp.push(data.label)
                    value_tmp.push({ x: data.x, y: data.y })
                })
                setLabels(label_tmp.reverse())
                setValue(value_tmp.reverse())
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                console.log(err.response)
            })
    }, [tahun])


    const dataa = {
        labels: labels,
        datasets: [
            {
                label: 'USD Volume End',
                labels: labels,
                data: value,
                backgroundColor: 'rgba(255, 99, 132, 1)',
                pointRadius: 6,
                pointHoverRadius: 6
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Kinerja Setiap Segmen',
            },
            tooltip: {
                callbacks: {
                    label: function (ctx) {
                        let label = ctx.dataset.labels[ctx.dataIndex];
                        label += " (" + ctx.parsed.x + ", " + ctx.parsed.y + ")";
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Transaction Volume (USD)'
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return abbreviateNumber(value)
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Profit (IDR)'
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return abbreviateNumber(value)
                    }
                }
            }
        },
    };

    return (
        <div style={{ height: '500px', width: '100%', position: 'relative' }}>
            <LoadingOverlay visible={loading} />
            <Scatter options={options} data={dataa} />
        </div>)
}

const Segment = () => {

    return (
        <div>
            <Grid>
                <Grid.Col span={12}>
                    <KinerjaSegment />
                </Grid.Col>
                <Grid.Col span={12}>
                    <SegmentGrowth />
                </Grid.Col>

            </Grid>
        </div>
    )

}

export default Segment
