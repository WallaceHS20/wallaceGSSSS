import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchInput({ value, onChange }) {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 280 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Procurar"
        inputProps={{ 'aria-label': 'Procurar' }}
        value={value}  // Conectando o valor de busca
        onChange={onChange}  // Conectando o evento de mudança
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
