import React, { FC, useState } from 'react'
import { useDataContext } from '../../context/DataContext';
import { Record } from '../../data';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import './Edit.scss'

interface State {
    id: string
    N: string
    P: number
    I: number
    R: number
    M: number
    Ti: number
    Tm: number
    Ts: number
}

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//     props,
//     ref,
// ) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const Edit: FC<{ data: Record }> = ({ data }) => {
    const { simulations, setSimulations } = useDataContext()
    const [state, setState] = useState<State>(data)
    // const [open, setOpen] = useState<boolean>(false)


    const handleN = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setState({ ...state, N: e.target.value })
    const handleP = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setState({ ...state, P: Number(e.target.value) })
    const handleI = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setState({ ...state, I: Number(e.target.value) })
    const handleR = (e: any) => setState({ ...state, R: Number(e.target.value) })
    const handleM = (e: any) => setState({ ...state, M: Number(e.target.value) })
    const handleTi = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setState({ ...state, Ti: Number(e.target.value) })
    const handleTm = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setState({ ...state, Tm: Number(e.target.value) })
    const handleTs = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setState({ ...state, Ts: Number(e.target.value) })

    const handleAddButton = () => {
        // const editedSimulation = simulations.find(simulation => simulation.id === state.id)
        const newSimulations = simulations.filter(simulation => simulation.id !== state.id)
        setSimulations([...newSimulations, state])
        // const newRecord = { id, ...state }
        // setSimulations([...simulations, newRecord])
        // setOpen(true)
    }

    // const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    //     if (reason === 'clickaway') return
    //     setOpen(false)
    // };


    const handleBackButton = () => window.history.back()

    const contagiousness = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 10,
            label: '10',
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
        <div className='edit'>
            <div className='edit__title'>
                <h2>Edit</h2>
                <span>{state.N}</span>
            </div>
            <div className='edit__buttons'>
                <Button
                    variant="contained"
                    onClick={handleBackButton}
                    startIcon={<ArrowBackIcon />}>Back</Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleAddButton}
                    startIcon={<SaveIcon />}>Save</Button>
            </div>
            <div className='edit__sheet'>
                <div className="edit__name">
                    <FormControl className="edit__form" variant="outlined">
                        <InputLabel htmlFor="edit-name" className="edit__input">Name</InputLabel>
                        <OutlinedInput
                            id="edit-name"
                            className="edit__input"
                            value={state.N}
                            onChange={handleN}
                            label="Name" />
                    </FormControl>
                </div>
                <div className="edit__people">
                    <FormControl className="edit__form" variant="outlined">
                        <InputLabel htmlFor="edit-population" className="edit__input">Population</InputLabel>
                        <OutlinedInput
                            type="number"
                            id="edit-population"
                            className="edit__input"
                            value={state.P || ''}
                            onChange={handleP}
                            label="Population" />
                    </FormControl>
                    <FormControl className="edit__form" variant="outlined">
                        <InputLabel htmlFor="edit-population" className="edit__input">Initial Infected</InputLabel>
                        <OutlinedInput
                            type="number"
                            id="edit-population"
                            className="edit__input"
                            value={state.I || ''}
                            onChange={handleI}
                            label="Initial Infected" />
                    </FormControl>
                </div>
                <div className="edit__indicators">
                    <label>
                        Contagiousness (R)
                        <Slider
                            aria-label="Contagiousness (R)"
                            value={state.R}
                            onChange={handleR}
                            step={0.25}
                            valueLabelDisplay='auto'
                            marks={contagiousness}
                            min={0}
                            max={10}
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
                <div className="edit__days">
                    <FormControl className="edit__form" variant="outlined">
                        <InputLabel htmlFor="edit-cure" className="edit__input">Days to cure</InputLabel>
                        <OutlinedInput
                            type="number"
                            id="edit-cure"
                            className="edit__input"
                            value={state.Ti || ''}
                            onChange={handleTi}
                            label="Days to cure" />
                    </FormControl>
                    <FormControl className="edit__form" variant="outlined">
                        <InputLabel htmlFor="edit-death" className="edit__input">Days to death</InputLabel>
                        <OutlinedInput
                            type="number"
                            id="edit-death"
                            className="edit__input"
                            value={state.Tm || ''}
                            onChange={handleTm}
                            label="Days to death" />
                    </FormControl>
                    <FormControl className="edit__form" variant="outlined">
                        <InputLabel htmlFor="edit-simulation" className="edit__input">Days of simulation</InputLabel>
                        <OutlinedInput
                            type="number"
                            id="edit-simulation"
                            className="edit__input"
                            value={state.Ts || ''}
                            onChange={handleTs}
                            label="Days of simulation" />
                    </FormControl>
                </div>
                {/* <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        This is a success message!
                    </Alert>
                </Snackbar> */}
            </div>
        </div >
    )
}

export default Edit