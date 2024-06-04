
import React from 'react';
import { TextField, MenuItem, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
const options = [
  { value: 'plugin1', label: '我的插件1' },
  { value: 'plugin2', label: '我的插件2' },
  { value: 'plugin3', label: '我的插件3' },
];

const PluginHeader = () => {
  const [selectedOption, setSelectedOption] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex justify-end">
      <TextField
        select
        value={selectedOption}
        onChange={handleOptionChange}
        variant="outlined"
        className="w-1/4"
        sx={{ mr: 2 }}
        size="small"
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        placeholder="输入插件名搜索"
        className="w-1/4 "
        size="small"
      />
    </div>
  );
};

export default PluginHeader;
