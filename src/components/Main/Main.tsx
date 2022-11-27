import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import List from '../../pages/List/List'

const Main: FC = () => {

    return (
        <main>
            <Routes>
                <Route path='/' element={<List />} />
            </Routes>
        </main>
    )
}

export default Main