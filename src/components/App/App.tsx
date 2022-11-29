import { FC, useState } from 'react'
import { DataContext } from '../../context/DataContext'
import { Record } from '../../data'
import Header from '../Header/Header'
import Main from '../Main/Main'
import './App.scss'

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