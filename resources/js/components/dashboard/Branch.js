import { Grid, LoadingOverlay, Checkbox, CheckboxGroup } from "@mantine/core"
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
import abbreviateNumber from "../../constant/shortHand";
import tahunGraphContext from "../../context/tahunGraphContext";
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const BranchScatter = () => {
    const [labels, setLabels] = useState([])
    const [value, setValue] = useState([])
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState([])
    const [selectedFilter, setSelectedFilter] = useState([])
    const { tahun } = useContext(tahunGraphContext)

    useEffect(() => {
        setLoading(true)
        axios.get(baseUrl + "/branch/", {
            params: {
                tahun: tahun,
                filter: selectedFilter,
            }
        })
            .then((res) => {
                // console.log(res.data)
                let label_tmp = []
                let value_tmp = []
                res.data.data.forEach((data) => {
                    label_tmp.push(data.label)
                    value_tmp.push({ x: data.x, y: data.y })
                })
                setLabels(label_tmp.reverse())
                setValue(value_tmp.reverse())
                setFilters(res.data.segment)
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                console.log(err.response)
            })
    }, [tahun, selectedFilter])


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
                text: 'Branch',
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
        <div>
            <CheckboxGroup
                my={5}
                label="Filter"
                value={selectedFilter}
                onChange={(val) => setSelectedFilter(val)}
            >
                {filters.map((data, key) => (
                    <Checkbox value={data.segm} label={data.segm} key={key} />
                ))}
            </CheckboxGroup>
            <Grid>
                <Grid.Col span={12}>
                    <div style={{ height: '500px', width: '100%', position: 'relative' }}>
                        <LoadingOverlay visible={loading} />
                        <Scatter options={options} data={dataa} />
                    </div>
                </Grid.Col>
            </Grid>
        </div>
    )
}

const Branch = () => {
    return <BranchScatter />
}

export default Branch
