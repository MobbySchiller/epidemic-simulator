import { createContext, useContext } from "react"
import { Record } from '../data'

export interface Data {
    simulations: Record[]
    setSimulations: (c: Record[]) => void
}

export const DataContext = createContext<Data>({
    simulations: [],
    setSimulations: () => { }
})

export const useDataContext = () => useContext(DataContext)