import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    styled,
    tableCellClasses,
  } from "@mui/material";
import { useEffect, useState } from "react";

interface CustomerListQuery {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    iban: string;
    categoryCode: string;
    categoryDescription: string;
  }

export default function CustomerListPage() {
    const [customers, setCustomers] = useState<CustomerListQuery[]>([]);

    useEffect(() => {
        fetch("/api/customers/list")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setCustomers(data as CustomerListQuery[]);
          });
      }, []);

    return ( 
    <>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        Customers
        </Typography>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableHeadCell>Name</StyledTableHeadCell>
                        <StyledTableHeadCell>Address</StyledTableHeadCell>
                        <StyledTableHeadCell>Email</StyledTableHeadCell>
                        <StyledTableHeadCell>Phone</StyledTableHeadCell>
                        <StyledTableHeadCell>Iban</StyledTableHeadCell>
                        <StyledTableHeadCell>Category</StyledTableHeadCell>
                        <StyledTableHeadCell>Category Description</StyledTableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.address}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.iban}</TableCell>
                        <TableCell>{row.categoryCode}</TableCell>
                        <TableCell>{row.categoryDescription}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
    );
}

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}));