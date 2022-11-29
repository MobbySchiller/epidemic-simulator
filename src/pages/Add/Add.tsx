import React, { FC, useState } from 'react'
import { v4 as uuid } from 'uuid';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDataContext } from '../../context/DataContext';
import './Add.scss'


interface State {
    N: string
    P: number
    I: number
    R: number
    M: number
    Ti: number
    Tm: number
    Ts: number
}

const initialState: State = {
    N: '',
    P: 0,
    I: 0,
    R: 1.5,
    M: 0.4,
    Ti: 0,
    Tm: 0,
    Ts: 0
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Add: FC = () => {
    const { simulations, setSimulations } = useDataContext()
    const [state, setState] = useState<State>(initialState)
    const [open, setOpen] = useState<boolean>(false)


    const handleN = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setState({ ...state, N: e.target.value })
    const handleP = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setState({ ...state, P: Number(e.target.value) })
    const handleI = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setState({ ...state, I: Number(e.target.value) })
    const handleR = (e: any) => setState({ ...state, R: Number(e.target.value) })
    const handleM = (e: any) => setState({ ...state, M: Number(e.target.value) })
    const handleTi = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setState({ ...state, Ti: Number(e.target.value) })
    const handleTm = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setState({ ...state, Tm: Number(e.target.value) })
    const handleTs = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setState({ ...state, Ts: Number(e.target.value) })

    const unique_id = uuid();
    const id = unique_id.slice(0, 8)

    const handleAddButton = () => {
        const newRecord = { id, ...state }
        localStorage.setItem('simulations', JSON.stringify([...simulations, newRecord]))
        setSimulations([...simulations, newRecord])
        setOpen(true)
        setState(initialState)
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setOpen(false)
    };

    const handleBackButton = () => window.history.back()

    const contagiousness = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 5,
            label: '5',
        },
    ];

    const mortality = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 1,
            label: '1',
        },
    ];

    return (
        <div className='add'>
            <h2 className='add__title'>Add new simulation</h2>
            <Button
                variant="contained"
                onClick={handleBackButton}
                startIcon={<ArrowBackIcon />}>Back</Button>
            <div className='add__sheet'>
                <div className="add__name">
                    <FormControl className="add__form" variant="outlined">
                        <InputLabel htmlFor="add-name" className="add__input">Name</InputLabel>
                        <OutlinedInput
                            id="add-name"
                            className="add__input"
                            value={state.N}
                            onChange={handleN}
                            label="Name" />
                    </FormControl>
                </div>
                <div className="add__people">
                    <FormControl className="add__form" variant="outlined">
                        <InputLabel htmlFor="add-population" className="add__input">Population</InputLabel>
                        <OutlinedInput
                            type="number"
                            id="add-population"
                            className="add__input"
                            value={state.P || ''}
                            onChange={handleP}
                            label="Population" />
                    </FormControl>
                    <FormControl className="add__form" variant="outlined">
                        <InputLabel htmlFor="add-population" className="add__input">Initial Infected</InputLabel>
                        <OutlinedInput
                            type="number"
                            id="add-population"
                            className="add__input"
                            value={state.I || ''}
                            onChange={handleI}
                            label="Initial Infected" />
                    </FormControl>
                </div>
                <div className="add__indicators">
                    <label>
                        Contagiousness (R)
                        <Slider
                            aria-label="Contagiousness (R)"
                            value={state.R}
                            onChange={handleR}
                            step={0.1}
                            valueLabelDisplay='auto'
                            marks={contagiousness}
                            min={0}
                            max={5}
                        />
                    </label>
                    <label>
                        Mortality
                        <Slider
                            aria-label="Mortality"
                            value={state.M}
                            onChange={handleM}
                            step={0.05}
                            valueLabelDisplay='auto'
                            marks={mortality}
                            min={0}
                            max={1}
                        />
                    </label>
                </div>
                <div className="add__days">
                    <FormControl className="add__form" variant="outlined">
                        <InputLabel htmlFor="add-cure" className="add__input">Days to cure</InputLabel>
                        <OutlinedInput
                            type="number"
                            id="add-cure"
                            className="add__input"
                            value={state.Ti || ''}
                            onChange={handleTi}
                            label="Days to cure" />
                    </FormControl>
                    <FormControl className="add__form" variant="outlined">
                        <InputLabel htmlFor="add-death" className="add__input">Days to death</InputLabel>
                        <OutlinedInput
                            type="number"
                            id="add-death"
                            className="add__input"
                            value={state.Tm || ''}
                            onChange={handleTm}
                            label="Days to death" />
                    </FormControl>
                    <FormControl className="add__form" variant="outlined">
                        <InputLabel htmlFor="add-simulation" className="add__input">Days of simulation</InputLabel>
                        <OutlinedInput
                            type="number"
                            id="add-simulation"
                            className="add__input"
                            value={state.Ts || ''}
                            onChange={handleTs}
                            label="Days of simulation" />
                    </FormControl>
                </div>
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleAddButton}>
                    Add
                </Button>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        This is a success message!
                    </Alert>
                </Snackbar>
            </div>
        </div >
    )
}

export default Add