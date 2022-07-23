import { useEffect, useState } from "react"
import axios from "axios"
import baseUrl from "../../constant/baseUrl"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Grid, LoadingOverlay } from "@mantine/core";
import abbreviateNumber from "../../constant/shortHand";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TopTenClientVolume = () => {

    const [labels, setLabels] = useState([])
    const [value, setValue] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(baseUrl + "/summary/topTenClientVolume")
            .then((res) => {
                let label_tmp = []
                let value_tmp = []
                res.data.forEach((data) => {
                    label_tmp.push(data.label)
                    value_tmp.push(data.total)
                })
                setLabels(label_tmp.reverse())
                setValue(value_tmp.reverse())
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                console.log(err.response)
            })
    }, [])



    const dataa = {
        labels: labels,
        datasets: [
            {
                label: 'IDR Volume End',
                data: value,
                backgroundColor: 'rgba(255, 99, 132, 1)',
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
                text: 'Top 10 Client Volume',
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'USD Volume end'
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
        <div style={{ height: '300px', width: '100%', position: 'relative' }}>
            <LoadingOverlay visible={loading} />
            <Bar options={options} data={dataa} />
        </div>)
}

const TopTenClientProfit = () => {

    const [labels, setLabels] = useState([])
    const [value, setValue] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(baseUrl + "/summary/topTenClientProfit")
            .then((res) => {
                let label_tmp = []
                let value_tmp = []
                res.data.forEach((data) => {
                    label_tmp.push(data.label)
                    value_tmp.push(data.total)
                })
                setLabels(label_tmp.reverse())
                setValue(value_tmp.reverse())
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                console.log(err.response)
            })
    }, [])



    const dataa = {
        labels: labels,
        datasets: [
            {
                label: 'IDR Volume End',
                data: value,
                backgroundColor: 'rgba(172, 209, 175, 1)',
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
                text: 'Top 10 Client Profit',
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Profit'
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        if (value < 5) return value
                        return value / 1e6 + ' M';
                    }
                }
            }
        }
    };

    return (
        <div style={{ height: '300px', width: '100%', position: 'relative' }}>
            <LoadingOverlay visible={loading} />
            <Bar options={options} data={dataa} />
        </div>)
}


const Profit = () => {

    const [labels, setLabels] = useState([])
    const [value, setValue] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(baseUrl + "/summary/profit")
            .then((res) => {
                let label_tmp = []
                let value_tmp = []
                res.data.forEach((data) => {
                    label_tmp.push(data.label)
                    value_tmp.push(data.total)
                })
                setLabels(label_tmp.reverse())
                setValue(value_tmp.reverse())
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                console.log(err.response)
            })
    }, [])



    const dataa = {
        labels: labels,
        datasets: [
            {
                label: 'IDR Volume End',
                data: value,
                backgroundColor: 'rgba(172, 209, 175, 1)',
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
                text: 'Profit',
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'IDR Profit end'
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
        <div style={{ height: '300px', width: '100%', position: 'relative' }}>
            <LoadingOverlay visible={loading} />
            <Bar options={options} data={dataa} />
        </div>)
}

const Volume = () => {

    const [labels, setLabels] = useState([])
    const [value, setValue] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(baseUrl + "/summary/volume")
            .then((res) => {
                let label_tmp = []
                let value_tmp = []
                res.data.forEach((data) => {
                    label_tmp.push(data.label)
                    value_tmp.push(data.total)
                })
                setLabels(label_tmp.reverse())
                setValue(value_tmp.reverse())
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                console.log(err.response)
            })
    }, [])



    const dataa = {
        labels: labels,
        datasets: [
            {
                label: 'USD Volume End',
                data: value,
                backgroundColor: 'rgba(255, 99, 132, 1)',
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
                text: 'Volume',
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'USD Volume end'
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
        <div style={{ height: '300px', width: '100%', position: 'relative' }}>
            <LoadingOverlay visible={loading} />
            <Bar options={options} data={dataa} />
        </div>)
}

const Summary = () => {


    return (
        <div>
            <Grid>
                <Grid.Col span={6} style={{ width: '200px' }}>
                    <Volume />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Profit />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TopTenClientVolume />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TopTenClientProfit />
                </Grid.Col>
            </Grid>
        </div>
    )
}

export default Summary
