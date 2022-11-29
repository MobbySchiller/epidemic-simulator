import { FC } from 'react'
import { Record } from '../../data'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import './Details.scss'

const Details: FC<{ data: Record }> = ({ data }) => {
    const { id, N } = data

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
                </div>
                <div className='pie-chart'></div>
                <div className='line-chart'></div>
            </div>
        </div>
    )
}

export default Details