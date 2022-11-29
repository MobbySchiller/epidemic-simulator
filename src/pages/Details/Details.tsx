import { FC } from 'react'
import { Record } from '../../data'
import { calculatateStats } from './calculator';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import './Details.scss'

const Details: FC<{ data: Record }> = ({ data }) => {
    const { id, N, P, I, R, M, Tm, Ti, Ts } = data
    const statistics = calculatateStats(data)

    const lastDay = statistics[Ts]

    const overall = {
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
                    <div className='overall__healthy'>
                        <span>Healthy</span>
                        <span>{overall.healthy}</span>
                    </div>
                    <div className='overall__infected'>
                        <span>Infected</span>
                        <span>{overall.infected}</span>
                    </div>
                    <div className='overall__recovered'>
                        <span>Recovered</span>
                        <span>{overall.recovered}</span>
                    </div>
                    <div className='overall__dead'>
                        <span>Dead</span>
                        <span>{overall.dead}</span>
                    </div>
                </div>
                <div className='pie-chart'></div>
                <div className='line-chart'></div>
            </div>
        </div>
    )
}

export default Details