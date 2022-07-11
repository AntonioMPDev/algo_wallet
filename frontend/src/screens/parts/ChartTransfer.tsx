import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { Transaction } from '../../model/models';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
};

type Props = {
    data: Transaction[]
}

const ChartTransfer = ({data}: Props ) =>{

    const labels: string[] = [];
    if(data.length > 0) data.map((w:any)=>{
      labels.push(moment(w.createdAt).fromNow())
      
    })

    const dataChart = {
        labels,
        datasets: [
          {
            fill: true,
            label: 'Amount',
            data: data.map((t:Transaction) => t.amount),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
    };


    return (
        <Line options={options} data={dataChart} />
    )
}

export default ChartTransfer