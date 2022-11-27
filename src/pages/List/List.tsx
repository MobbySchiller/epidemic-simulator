import { FC } from 'react'
import CustomizedTable from '../../components/CustomizedTable/CustomizedTable'
import Add from '../Add/Add'
import { simulations } from '../../data'

const List: FC = () => {
    // const isEmpty = simulations.length === 0
    const isEmpty = true

    return (
        <div>
            {isEmpty ? <Add /> : <CustomizedTable />}
            {/* <CustomizedTable /> */}
        </div>
    )
}

export default List