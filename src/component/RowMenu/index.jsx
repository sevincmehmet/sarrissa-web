import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { IconDotsVertical } from "@tabler/icons-react";

const Index = ({ row, menuItems }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (item) => {
    item.onClick(row); // Satır verisini gönder
    handleClose();
  };

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <IconDotsVertical className="text-slate-600/60 hover:text-slate-600" />
      </IconButton>
      <Menu
        sx={{
          ".MuiPaper-root": {
            background: "#fff",
            color: "#666",
            boxShadow:
              "#eee 0px 0px 0px 0px, rgb(0,0,0,0.1) 0px 0px 0px 1px, rgb(0,0,0,0.2) 0px 10px 15px -3px, rgb(0,0,0,0.1) 0px 4px 6px -2px",
            borderRadius: "0.6rem",
            border: "1px solid #eee",
          },
          ".MuiMenu-list ": {
            py: "0.25rem",
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuItems.map((item, index) => (
          <MenuItem className="group" key={index} onClick={() => handleClick(item)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Index;
