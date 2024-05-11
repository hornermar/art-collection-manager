import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

type DropdownProps = {
    options: any[];
    onChange: (value: any) => void;
    value: string | null;
};

export const Dropdown = ({ options, onChange, value }: DropdownProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (value: string) => {
        onChange(value);
        handleClose();
    };

    return (
        <div>
            <Button color="inherit" onClick={handleClick}>
                {value ? value : "Login"}
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {options.map((option) => (
                    <MenuItem
                        key={option.id}
                        onClick={() => handleChange(option.id)}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
