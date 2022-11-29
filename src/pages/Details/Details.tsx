import { FC } from 'react'
import { Record } from '../../data'
import { calculatateStats } from './calculator';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import LineChart from '../../components/LineChart/LineChart';
import PieChart from '../../components/PieChart/PieChart';
import './Details.scss'

export interface Statistics {
    Pi: number
    Pv: number
    Pm: number
    Pr: number
    newPi: number
}

export interface Overall {
    healthy: number
    infected: number
    recovered: number
    dead: number
}

const Details: FC<{ data: Record }> = ({ data }) => {
    const { id, N, P, I, R, M, Tm, Ti, Ts } = data
    const statistics: Statistics[] = calculatateStats(data)

    const lastDay = statistics[Ts]

    const overall: Overall = {
        healthy: lastDay.Pv,
        infected: lastDay.Pi,
        recovered: lastDay.Pr,
        dead: lastDay.Pm,
    }

    const handleBackButton = () => window.history.back()

    return (
        <div className='details'>
            <div className='details__title'>
                <h2>Details</h2>
                <span>{N}</span>
            </div>
            <div className='details__buttons'>
                <Button
                    variant="contained"
                    onClick={handleBackButton}
                    startIcon={<ArrowBackIcon />}>
                    Back
                </Button>
                <Link to={`/edit-${id}`} style={{ textDecoration: 'none' }}>
                    <Button
                        color="secondary"
                        variant="contained"
                        startIcon={<SettingsIcon />}>
                        Edit
                    </Button>
                </Link>
            </div>
            <div className='details__results'>
                <div className='overall'>
                    <div className='overall-element overall-element--healthy'>
                        <span className='overall-element__category'>Healthy</span>
                        <span className='overall-element__value'>{overall.healthy}</span>
                    </div>
                    <div className='overall-element overall-element--infected'>
                        <span className='overall-element__category'>Infected</span>
                        <span className='overall-element__value'>{overall.infected}</span>
                    </div>
                    <div className='overall-element overall-element--recovered'>
                        <span className='overall-element__category'>Recovered</span>
                        <span className='overall-element__value'>{overall.recovered}</span>
                    </div>
                    <div className='overall-element overall-element--dead'>
                        <span className='overall-element__category'>Dead</span>
                        <span className='overall-element__value'>{overall.dead}</span>
                    </div>
                </div>
                <div className='pie-chart'>
                    <PieChart stats={overall} />
                </div>
                <div className='line-chart'>
                    <LineChart stats={statistics} />
                </div>
            </div>
        </div>
    )
}

export default Details