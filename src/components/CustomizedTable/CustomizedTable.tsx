import * as React from 'react';
import { Record } from '../App/App';
import { useDataContext } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: any;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'N',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'P',
        numeric: true,
        disablePadding: false,
        label: 'Population',
    },
    {
        id: 'I',
        numeric: true,
        disablePadding: false,
        label: 'Initial Infected',
    },
    {
        id: 'R',
        numeric: true,
        disablePadding: false,
        label: 'Contagiousness',
    },
    {
        id: 'M',
        numeric: true,
        disablePadding: false,
        label: 'Mortality',
    },
    {
        id: 'Ti',
        numeric: true,
        disablePadding: false,
        label: 'Days to cure',
    },
    {
        id: 'Tm',
        numeric: true,
        disablePadding: false,
        label: 'Days to death',
    },
    {
        id: 'Ts',
        numeric: true,
        disablePadding: false,
        label: 'Days of simulation',
    },
    {
        id: 'Details',
        numeric: false,
        disablePadding: false,
        label: '',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Record) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Record) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        sx={{ fontWeight: 700 }}
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number
    selected: string[]
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, selected, setSelected } = props;
    const { simulations, setSimulations } = useDataContext()

    const handleDelete = () => {
        const newSimulations = simulations.filter(simulation => !selected.includes(simulation.id))
        setSelected([])
        localStorage.setItem('simulations', JSON.stringify(newSimulations))
        setSimulations(newSimulations)
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h5"
                    fontWeight="700"
                    id="tableTitle"
                    component="div"
                >
                    Simulations list
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}>
                        <DeleteIcon />
                    </Button>
                </Tooltip>
            ) :
                (<Tooltip title="Add">
                    <Link to='/add'>
                        <Button
                            variant="contained">
                            <AddIcon />
                        </Button>
                    </Link>
                </Tooltip>)
            }
        </Toolbar >
    );
}

export default function EnhancedTable() {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Record>('P');
    const [selected, setSelected] = React.useState<string[]>([]);
    const { simulations } = useDataContext()

    function createData(
        id: string,
        N: string,
        P: number,
        I: number,
        R: number,
        M: number,
        Ti: number,
        Tm: number,
        Ts: number
    ): Record {
        return {
            id,
            N,
            P,
            I,
            R,
            M,
            Ti,
            Tm,
            Ts
        };
    }

    const rows = simulations.map(simulation => {
        const { id, N, P, I, R, M, Ti, Tm, Ts } = simulation
        return (
            createData(id, N, P, I, R, M, Ti, Tm, Ts))
    })

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Record,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    return (
        <Box sx={{ width: '100%' }}>
            <EnhancedTableToolbar numSelected={selected.length} selected={selected} setSelected={setSelected} />
            <TableContainer>
                <Table
                    sx={{ minWidth: 500 }}
                    aria-labelledby="tableTitle"
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.N}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={(event) => handleClick(event, row.id)}
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.N}
                                        </TableCell>
                                        <TableCell align="right">{row.P}</TableCell>
                                        <TableCell align="right">{row.I}</TableCell>
                                        <TableCell align="right">{row.R}</TableCell>
                                        <TableCell align="right">{row.M}</TableCell>
                                        <TableCell align="right">{row.Ti}</TableCell>
                                        <TableCell align="right">{row.Tm}</TableCell>
                                        <TableCell align="right">{row.Ts}</TableCell>
                                        <TableCell align="right">
                                            <Link to={`/results-${row.id}`} style={{ textDecoration: 'none' }}>
                                                <Button variant="outlined">Results</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}