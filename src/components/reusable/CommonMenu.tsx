import React from "react";
import { Menu, MenuItem, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import theme from "../../theme";

/*
  Requires an object of the number of items to be present in the menu along with each item's handler function as an object.
  eg:-
  menuItems = {
    items : [{displayName: 'edit', handlerfunc : handleEdit}, {displayName: 'delete', handlerfunc : handleDelete}]
  }
*/
type MenuItems = {
  items: {
    displayName: string;
    handlerFunc: () => void;
    disable?: boolean;
    disabledText?: string;
  }[];
};
type MenuItemTypes = {
  displayName: string;
  handlerFunc: () => void;
  disable?: boolean;
  disabledText?: string;
};

type Props = {
  anchorEl: null | HTMLElement;
  open: boolean;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  menuItems: MenuItems;
  item: any;
  handleMenu: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    item?: any
  ) => void;
  handleClose?: () => void;
};

export const CommonMenu: React.FC<Props> = (props) => {
  const {
    anchorEl,
    setAnchorEl,
    open,
    handleMenu,
    menuItems,
    item,
    handleClose,
  } = props;

  return (
    <>
      <MoreVertIcon
        onClick={(e: any) => handleMenu(e, item._id, item)}
        sx={{
          color: theme.palette.text.secondary,
          cursor: "pointer",
        }}
      />
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose || (() => setAnchorEl(null))}
        PaperProps={{
          style: {
            minWidth: 120,
          },
        }}
        elevation={1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {menuItems.items.map((menuItem: MenuItemTypes, index: number) => {
          return (
            <Tooltip
              key={String(index)}
              title={(menuItem?.disable && menuItem?.disabledText) || ""}
              placement="left"
              arrow
            >
              <span>
                <MenuItem
                  sx={{
                    textTransform: "none",
                    background: theme.palette.grey[100],
                    "&:hover": {
                      background: theme.palette.primary.light,
                    },
                    m: 1,
                    borderRadius: "6px",
                    color: theme.palette.text.primary,
                  }}
                  onClick={
                    handleClose
                      ? () => {
                          menuItem.handlerFunc();
                          setAnchorEl(null);
                        }
                      : menuItem.handlerFunc
                  }
                  disabled={menuItem?.disable}
                >
                  {menuItem.displayName}
                </MenuItem>
              </span>
            </Tooltip>
          );
        })}
      </Menu>
    </>
  );
};
