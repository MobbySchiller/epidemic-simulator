import { FC, useEffect } from 'react'
import { useDataContext } from '../../context/DataContext'
import { Routes, Route } from 'react-router-dom'
import { records } from '../../data'
import List from '../../pages/List/List'
import Add from '../../pages/Add/Add'
import Details from '../../pages/Details/Details'
import Edit from '../../pages/Edit/Edit'
import './Mains.scss'

const Main: FC = () => {
    const { simulations, setSimulations } = useDataContext()

    useEffect(() => setSimulations(records), [])

    const detailsRoutes = simulations.map(simulation => (
        <Route path={`/details-${simulation.id}`} element={<Details data={simulation} key={simulation.id} />} />
    ))
    const editRoutes = simulations.map(simulation => (
        <Route path={`/edit-${simulation.id}`} element={<Edit data={simulation} key={simulation.id} />} />
    ))

    return (
        <main>
            <Routes>
                <Route path='/' element={<List />} />
                <Route path='/add' element={<Add />} />
                {detailsRoutes}
                {editRoutes}
            </Routes>
        </main >
    )
}

export default Main
