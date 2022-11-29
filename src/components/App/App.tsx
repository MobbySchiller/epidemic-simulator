import { FC, useState } from 'react'
import { DataContext } from '../../context/DataContext'
import Header from '../Header/Header'
import Main from '../Main/Main'
import './App.scss'

export interface Record {
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

const App: FC = () => {
    const [simulations, setSimulations] = useState<Record[]>([])

    return (
        <DataContext.Provider value={{ simulations, setSimulations }}>
            <Header />
            <div className='wrapper'>
                <Main />
            </div>
        </DataContext.Provider >

    )
}

export default App