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

const AreaSnd = () => {
    const [labels, setLabels] = useState([])
    const [valueProfit, setValueProfit] = useState([])
    const [value, setValue] = useState([])
    const [loading, setLoading] = useState(false)
    const { tahun } = useContext(tahunGraphContext)

    function random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 1 + ')';
    }

    useEffect(() => {
        setLoading(true)
        axios.get(baseUrl + "/area/areaSnd?tahun=" + tahun)
            .then((res) => {
                console.log(res.data)
                let result = res.data?.reduce(function (r, a) {
                    r[a.snd_head] = r[a.snd_head] || [];
                    r[a.snd_head].push(a.volume);
                    return r;
                }, Object.create(null));

                let resultProfit = res.data?.reduce(function (r, a) {
                    r[a.snd_head] = r[a.snd_head] || [];
                    r[a.snd_head].push(a.profit);
                    return r;
                }, Object.create(null));

                let tmp = []
                let tmp_profit = []
                let tmp_dataset = []
                let tmp_dataset_profit = []
                let maxlength = 0
                let maxlengthProfit = 0

                Object.keys(result).map((data) => {
                    if (result[data].length > maxlength) maxlength = result[data].length
                    tmp.push(data)
                    tmp_dataset.push({
                        label: "value",
                        data: result[data]
                    })
                })

                Object.keys(resultProfit).map((data) => {
                    if (resultProfit[data].length > maxlengthProfit) maxlengthProfit = resultProfit[data].length
                    tmp_profit.push(data)
                    tmp_dataset_profit.push({
                        label: "profit",
                        data: resultProfit[data]
                    })
                })

                setLabels(tmp)
                // fill empty array
                Object.keys(tmp_dataset).map((key) => {
                    for (let i = 0; i < maxlength; i++) {
                        if (!tmp_dataset[key]['data'][i]) {
                            tmp_dataset[key]['data'][i] = 0
                        }
                    }
                })

                // fill empty array
                Object.keys(tmp_dataset_profit).map((key) => {
                    for (let i = 0; i < maxlengthProfit; i++) {
                        if (!tmp_dataset_profit[key]['data'][i]) {
                            tmp_dataset_profit[key]['data'][i] = 0
                        }
                    }
                })

                let final_dataset = []
                let final_dataset_profit = []

                //final dataset
                for (let i = 0; i < maxlength; i++) {
                    let data_array = []
                    for (let j = 0; j < Object.keys(tmp_dataset).length; j++) {
                        data_array.push(tmp_dataset[j].data[i])
                    }
                    final_dataset.push({
                        label: 'dataset ' + (i + 1),
                        data: data_array,
                        backgroundColor: 'rgba(147,202,237)'
                    })
                }

                //final dataset
                for (let i = 0; i < maxlengthProfit; i++) {
                    let data_array = []
                    for (let j = 0; j < Object.keys(tmp_dataset_profit).length; j++) {
                        data_array.push(tmp_dataset_profit[j].data[i])
                    }
                    final_dataset_profit.push({
                        label: 'dataset ' + (i + 1),
                        data: data_array,
                        backgroundColor: 'rgba(147,202,237)'
                    })
                }

                setValue(final_dataset)
                setValueProfit(final_dataset_profit)
                console.log(final_dataset_profit)
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                console.log(err.response)
            })
    }, [tahun])

    const dataa = {
        labels: labels,
        datasets: value
    }

    const dataaProfit = {
        labels: labels,
        datasets: valueProfit
    }


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Snd Head/Snd Area',
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

    const optionsProfit = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Snd Head/Snd Area',
            },
        },
        scales: {
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
        }

    };

    return (
        <div style={{ height: '500px', width: '100%', position: 'relative' }}>
            <LoadingOverlay visible={loading} />
            <Bar options={options} data={dataa} />
            <Bar options={optionsProfit} data={dataaProfit} />
        </div>
    )
}

const Area = () => {
    return (
        <div>
            <Grid>
                <Grid.Col span={6}>
                    <AreaSnd />
                </Grid.Col>
            </Grid>
        </div>
    )
}

export default Area
