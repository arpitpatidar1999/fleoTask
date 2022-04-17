import * as React from 'react';
import {
    useEffect
    , useState
} from 'react';
import CardLayout from './../components/Card'
import axios from 'axios';

// pagination imports
import TablePagination from '@mui/material/TablePagination';

// autocomplete imports
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


// select bar imports
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';


const styles = {
    row: {
        margin: '10px 5%',
        width: '90%',
        display: 'inline-block'
    },
    heading: {
        fontSize: '20px',
        fontWeight: 900,
        marginTop: '20px',
        marginBottom: '20px',
    },
    leftAlign: {
        float: 'left',
        padding: '10px'
    },
    rightAlign: {
        float: 'right',
        padding: '10px'
    },
    cardsGrid: {
        float: 'left',
        width: '22.33%',
        padding: '1%',
    }
};

function PageComponent({ data }) {
    return (data.length ? <>
        {data.map((item, index) => {
            return <div key={index} style={styles.cardsGrid}>
                <CardLayout data={item} />
            </div>
        })}
    </> : "");
}


function SearchBox({ label, options }) {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={label} />}
        />
    );
}

function Selector({ label, disabled, handleChange, selectedValue, options }) {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth disabled={disabled}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    {label}
                </InputLabel>
                {/* <NativeSelect
                    defaultValue={'None'}
                    inputProps={{
                        name: { label },
                        id: 'uncontrolled-native',
                    }}
                >
                    {options.map((value) => (<option value={value}>{value}</option>))}
                </NativeSelect> */}
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedValue}
                    label={label}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {options.map((value) => (<MenuItem value={value}>{value}</MenuItem>))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default function TablePaginationDemo() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [data, setData] = useState([]);

    // search options
    const [languageOptions, setLanguageOptions] = useState([]);
    const [searchedLanguage, setSearchedLanguage] = useState(null);
    const [nameOptions, setNameOptions] = useState([]);
    const [searchedName, setSearchedName] = useState(null);

    // selected things
    const [selectedSortBy, setSelectedSortBy] = useState("");
    const [sortByOrder, setSortByOrder] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get('https://api.github.com/search/repositories?q=language:Javascript&sort=stars&order=desc');
        setData(response.data.items);
        let tempLanguageOptions = response.data.items.map((item) => item.language);
        let tempNameOptions = response.data.items.map((item) => item.full_name);
        setLanguageOptions(tempLanguageOptions);
        setNameOptions(tempNameOptions);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSelectedSortBy = (event) => {
        console.log("evnet is=====", event);
    }

    return (
        <>
            <center><div style={styles.heading}>Github Repositories</div></center>
            <div className="row" style={styles.row}>
                <div style={styles.leftAlign}><SearchBox label="Language" options={languageOptions} /></div>
                <div style={styles.rightAlign}><SearchBox label="Name" options={nameOptions} /></div>
            </div>
            <div className='row' style={styles.row}>
                <div style={styles.leftAlign}>
                    <div style={styles.leftAlign}><Selector label="SortBy" disabled={false} handleChange={handleSelectedSortBy} selectedValue={selectedSortBy} options={['stargazers_count', 'full_name']} /></div>
                    <div style={styles.leftAlign}><Selector label="Order" disabled={!selectedSortBy} options={['Asc', 'Desc']} /> </div>
                </div>
                <div style={styles.rightAlign}>
                    <TablePagination
                        component="div"
                        count={data.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
            <PageComponent data={data.slice(rowsPerPage * page, (rowsPerPage * (page + 1)))} />
        </>
    );
}