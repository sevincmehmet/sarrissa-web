import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import RowMenu from "../../component/RowMenu";

const Index = ({ tableData, menuItems = [] }) => {
  const columns = [
    ...tableData.columns,
    {
      field: "actions",
      headerName: "Kontrol",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <RowMenu row={params.row} menuItems={menuItems} />
      ),
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={tableData.rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default Index;
