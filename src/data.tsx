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

export const records: Record[] = [
    { id: '1', N: 'COVID-19', P: 8000000000, I: 1, R: 1.4, M: 0.0028, Ti: 7, Tm: 8, Ts: 730 },
    { id: '2', N: 'Black Death', P: 53234, I: 50, R: 0.8, M: 0.24, Ti: 3, Tm: 3, Ts: 14 },
    { id: '3', N: 'Spanish flu', P: 643323, I: 86, R: 2.8, M: 0.44, Ti: 3, Tm: 4, Ts: 23 },
    { id: '4', N: 'Plague of Justinian', P: 1234123, I: 4.2, R: 1.6, M: 0.46, Ti: 3, Tm: 5, Ts: 65 },
    { id: '5', N: 'HIV/AIDS', P: 50602031, I: 201, R: 0.01, M: 0.21, Ti: 3, Tm: 100, Ts: 10 },
]