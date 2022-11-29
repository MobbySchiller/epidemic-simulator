import { FC } from 'react';
import { Overall } from '../../pages/Details/Details';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: FC<{ stats: Overall }> = ({ stats }) => {
    const { healthy, infected, recovered, dead } = stats

    const data = {
        labels: ['Healthy', 'Infected', 'Recovered', 'Dead'],
        datasets: [
            {
                label: 'People',
                data: [healthy, infected, recovered, dead],
                backgroundColor: [
                    'rgb(33, 150, 243, 0.6)',
                    'rgb(255, 193, 7, 0.6)',
                    'rgb(76, 175, 80, 0.6)',
                    'rgb(244, 67, 54, 0.6)',
                ],
                borderColor: [
                    'rgb(33, 150, 243)',
                    'rgb(255, 193, 7)',
                    'rgb(76, 175, 80)',
                    'rgb(244, 67, 54)',
                ],
                borderWidth: 1,
            },
        ],
    }
    return (
        <Pie data={data} />
    )
}

export default PieChart