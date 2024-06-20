import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Nome',
    headerName: 'Nome',
    width: 150,
    editable: true,
  },
{
    field: 'Telefone',
    headerName: 'Telefone',
    width: 150,
    editable: true,
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    valueGetter: (params) => params.row ? `https://wa.me/${params.row.Telefone || ''}` : '',
    renderCell: (params) => (
      <a href={params.row ? `https://wa.me/${params.row.Telefone || ''}` : '#'} target="_blank" rel="noopener noreferrer">
        {params.row ? `${params.row.Telefone || ''}` : ''}
      </a>
    ),
},
  {
    field: 'Ticket Médio',
    headerName: 'Ticket Médio',
    type: 'number',
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 1, Nome: 'João', Telefone: '123456789', 'Ticket Médio': 34 },
  { id: 2, Nome: 'Maria', Telefone: '234567891', 'Ticket Médio': 28 },
  { id: 3, Nome: 'Ana', Telefone: '345678912', 'Ticket Médio': 45 },
  { id: 4, Nome: 'Carlos', Telefone: '456789123', 'Ticket Médio': 37 },
  { id: 5, Nome: 'Paulo', Telefone: '567891234', 'Ticket Médio': 52 },
  { id: 6, Nome: 'Lucas', Telefone: '678912345', 'Ticket Médio': 23 },
  { id: 7, Nome: 'Patricia', Telefone: '789123456', 'Ticket Médio': 39 },
  { id: 8, Nome: 'Bruna', Telefone: '891234567', 'Ticket Médio': 31 },
  { id: 9, Nome: 'Ricardo', Telefone: '912345678', 'Ticket Médio': 48 },
  { id: 10, Nome: 'Gabriela', Telefone: '123456789', 'Ticket Médio': 29 },
  { id: 11, Nome: 'Felipe', Telefone: '234567891', 'Ticket Médio': 33 },
  { id: 12, Nome: 'Isabela', Telefone: '345678912', 'Ticket Médio': 27 },
  { id: 13, Nome: 'Rafael', Telefone: '456789123', 'Ticket Médio': 40 },
  { id: 14, Nome: 'Sandra', Telefone: '567891234', 'Ticket Médio': 44 },
  { id: 15, Nome: 'Roberto', Telefone: '678912345', 'Ticket Médio': 50 },
];

export default function DataGridCostumers() {
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[15]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}