import { FC } from 'react'
import { Statistics } from '../../pages/Details/Details';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart: FC<{ stats: Statistics[] }> = ({ stats }) => {
    const healthy = stats.map(stat => stat.Pv)
    const infected = stats.map(stat => stat.Pi)
    const recovered = stats.map(stat => stat.Pr)
    const dead = stats.map(stat => stat.Pm)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Simulation chart',
            },
        },
    }

    const labels = stats.map((stat, index) => index)

    const data = {
        labels,
        datasets: [
            {
                label: 'Healthy',
                data: healthy,
                borderColor: 'rgb(33, 150, 243)',
                backgroundColor: 'rgba(33, 150, 243, 0.9)',
            },
            {
                label: 'Infected',
                data: infected,
                borderColor: 'rgb(255, 193, 7)',
                backgroundColor: 'rgba(255, 193, 7, 0.9)',
            },
            {
                label: 'Recovered',
                data: recovered,
                borderColor: 'rgb(76, 175, 80)',
                backgroundColor: 'rgba(76, 175, 80, 0.9)',
            },
            {
                label: 'Dead',
                data: dead,
                borderColor: 'rgb(244, 67, 54)',
                backgroundColor: 'rgba(244, 67, 54, 0.9)',
            },
        ],
    }

    return (
        <Line data={data} options={options} />
    )
}

export default LineChart