import React, { FC, useState } from 'react'
import TextField from '@mui/material/TextField'
import { FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button';
import './Add.scss'

const Add: FC = () => {
    const [N, setN] = useState<string>('')
    const [P, setP] = useState<number>()
    const [I, setI] = useState<number>()
    const [R, setR] = useState<number>(1.5)
    const [M, setM] = useState<number>(0.4)
    const [Ti, setTi] = useState<number>()
    const [Tm, setTm] = useState<number>()
    const [Ts, setTs] = useState<number>()

    const handleN = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setN(e.target.value)
    const handleP = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setP(Number(e.target.value))
    const handleI = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setI(Number(e.target.value))
    const handleR = (e: any) => setR(Number(e.target.value))
    const handleM = (e: any) => setM(Number(e.target.value))
    const handleTi = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setTi(Number(e.target.value))
    const handleTm = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setTm(Number(e.target.value))
    const handleTs = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setTs(Number(e.target.value))
    const handleAddButton = () => console.log({
        N, P, I, R, M, Ti, Tm, Ts
    })

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
        <div className='add'>
            <h2>Add new simulation</h2>
            <div className="add__name">
                <FormControl className="add__form" variant="outlined">
                    <InputLabel htmlFor="add-name" className="add__input">Name</InputLabel>
                    <OutlinedInput
                        id="add-name"
                        className="add__input"
                        value={N}
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
                        value={P}
                        onChange={handleP}
                        label="Population" />
                </FormControl>
                <FormControl className="add__form" variant="outlined">
                    <InputLabel htmlFor="add-population" className="add__input">Initial Infected</InputLabel>
                    <OutlinedInput
                        type="number"
                        id="add-population"
                        className="add__input"
                        value={I}
                        onChange={handleI}
                        label="Initial Infected" />
                </FormControl>
            </div>
            <div className="add__indicators">
                <label>
                    Contagiousness (R)
                    <Slider
                        aria-label="Contagiousness (R)"
                        value={R}
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
                        value={M}
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
                        value={Ti || ''}
                        onChange={handleTi}
                        label="Days to cure" />
                </FormControl>
                <FormControl className="add__form" variant="outlined">
                    <InputLabel htmlFor="add-death" className="add__input">Days to death</InputLabel>
                    <OutlinedInput
                        type="number"
                        id="add-death"
                        className="add__input"
                        value={Tm || ''}
                        onChange={handleTm}
                        label="Days to death" />
                </FormControl>
                <FormControl className="add__form" variant="outlined">
                    <InputLabel htmlFor="add-simulation" className="add__input">Days of simulation</InputLabel>
                    <OutlinedInput
                        type="number"
                        id="add-simulation"
                        className="add__input"
                        value={Ts || ''}
                        onChange={handleTs}
                        label="Days of simulation" />
                </FormControl>

            </div>
            <Button
                variant="contained"
                size="large"
                onClick={handleAddButton}>Add</Button>
        </div >
    )
}

export default Add