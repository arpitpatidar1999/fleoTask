import * as React from 'react';
import {
    useEffect
    , useState
} from 'react';
import CardLayout from './../components/Card'
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';

const styles = {
    heading: {
        fontSize: '20px',
        fontWeight: 900,
        marginTop: '20px',
        marginBottom: '20px',
    },
    cardsParent: {},
    cardsGrid: {
        float: 'left',
        width: '22.33%',
        padding: '1%',
    }
};

function PageComponent({ data }) {
    const cards = (data.length ? <>
        {data.map((item, index) => {
            return <div key={index} style={styles.cardsGrid}>
                <CardLayout data={item} />
            </div>
        })}
    </> : "");
    return (
        <>
            <div styles={styles.cardsParent}>
                {cards}
            </div>
        </>
    )
}

export default function TablePaginationDemo() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get('https://api.github.com/search/repositories?q=language:Javascript&sort=stars&order=desc');
        setData(response.data.items);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <center><div style={styles.heading}>Github Repositories</div></center>
            <TablePagination
                component="div"
                count={data.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <PageComponent data = {data.slice(rowsPerPage*page, (rowsPerPage*(page+1)))}/>
        </>
    );
}