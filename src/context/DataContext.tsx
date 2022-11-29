import { createContext, useContext } from "react"
import { Record } from "../components/App/App"

export interface Data {
    simulations: Record[]
    setSimulations: (c: Record[]) => void
}

export const DataContext = createContext<Data>({
    simulations: [],
    setSimulations: () => { }
})

export const useDataContext = () => useContext(DataContext)