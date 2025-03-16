import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    styled,
    tableCellClasses,
    Box,
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
    const [searchText, setSearchtext] = useState("");

    // Add function to be called on page loading and on "onClick" button event to apply search filter
    const fetchCustomers = async () => {
        try {
            const params = new URLSearchParams();
            if(searchText) {
                params.append("SearchText", searchText);
            }

            const response = await fetch (`/api/customers/list?${params.toString()}`);

            if(!response.ok) {
                throw new Error("Network response not ok");
            }

            const data = await response.json();
            setCustomers(data as CustomerListQuery[]);
        }
        catch (error) {
            console.error("Error fatching customers:", error);
        }
    };

    useEffect(() => {
        fetchCustomers();
      }, []);

    const exportToXml = () => {
        const xmlContent = `
            <Customers>
                ${customers.map(customer => `
                    <Customer>
                    <Id>${customer.id}</Id>
                    <Name>${customer.name}</Name>
                    <Address>${customer.address}</Address>
                    <Email>${customer.email}</Email>
                    <Phone>${customer.phone}</Phone>
                    <Iban>${customer.iban}</Iban>
                    <CategoryCode>${customer.categoryCode}</CategoryCode>
                    <CategoryDescription>${customer.categoryDescription}</CategoryDescription>
                    </Customer>
                `).join('')}
            </Customers>`.trim();

        const blob = new Blob([xmlContent], {type: 'application/xml'});
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a')
        a.href = url;
        a.download = 'customers.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    return ( 
    <>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
            Customers
        </Typography>

        <Box sx = {{display: "flex", alignItems: "center", gap: 2, mb: 2}}>
            <TextField 
                label = "Filter by Name or Email"
                value = {searchText}
                onChange = {(e) => setSearchtext(e.target.value)}
               fullWidth
            />
            <Button 
                variant="contained" 
                onClick={fetchCustomers}>
                Filter 
            </Button>
            <Button 
                variant="contained" 
                onClick={exportToXml}>
                XML EXPORT 
            </Button>
        </Box>

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