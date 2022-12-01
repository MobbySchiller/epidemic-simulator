import { Record } from '../../components/App/App'

export const calculatateStats = (record: Record) => {
    const { P, I, R, M, Ti, Tm, Ts } = record

    const dayZero = {
        Pi: I,
        Pv: P - I,
        Pm: 0,
        Pr: 0,
        newPi: I,
    }

    let data = [{ ...dayZero }]

    for (let i = 1; i < Ts + 1; i++) {
        const { Pi: prevPi, Pv: prevPv, Pm: prevPm, Pr: prevPr } = data[i - 1]

        let current = {
            cases: Math.round(prevPi * R),
            dead: 0,
            cured: 0,
        }

        if (i >= Tm) {
            const { newPi: pastNewPi } = data[i - Tm]
            current.dead = Math.floor(pastNewPi * M)
        }

        if (i >= Ti) {
            const { newPi: pastNewPi } = data[i - Ti]
            current.cured = Math.ceil(pastNewPi * (1 - M))
        }

        const allCases = current.cases + data.reduce((accumulator, currentValue) => accumulator + currentValue.newPi, 0)

        if (allCases === P + current.cases) {
            current.cases = 0
        } else if (allCases > P) {
            current.cases = prevPv
        }
        const Pi = prevPi + current.cases - current.dead - current.cured
        const Pm = prevPm + current.dead
        const Pr = prevPr + current.cured
        const Pv = prevPv - current.cases

        data[i] = { ...data[i], Pi, Pv, Pm, Pr, newPi: current.cases }
    }
    return data
}