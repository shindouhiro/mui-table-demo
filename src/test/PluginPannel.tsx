import React, { useState } from 'react';
import { Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography,
  FormControl,
   TextField,
    Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HttpIcon from '@mui/icons-material/Http';
import PersonIcon from '@mui/icons-material/Person';
import { InputLabel } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Select } from '@mui/material';
import { InputAdornment } from '@mui/material';
const AccordionPanel = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };



  return (
    <div className="w-full p-4">
  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="mb-4">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className="flex items-center"
      >
        <HttpIcon className="text-purple-500 mr-2" />
        <div className="flex flex-col">
          <Typography className="font-bold">Httpbin</Typography>
          <Typography variant="body2">httpbin</Typography>
          <Typography variant="caption" className="bg-gray-200 px-2 py-1 rounded-full mt-1">2个技能</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col">
        <FormControl variant="outlined" fullWidth>
          <InputLabel>URL</InputLabel>
          <Select
            // value={selectedOption}
            // onChange={handleOptionChange}
            input={<OutlinedInput startAdornment={<InputAdornment position="start"><PersonIcon className="text-blue-500" /></InputAdornment>} label="URL" />}
          >
            <MenuItem value="https://httpbin.org">https://httpbin.org</MenuItem>
            <MenuItem value="https://another-url.com">https://another-url.com</MenuItem>
          </Select>
        </FormControl>
        <div className="mt-2">
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className="mb-2">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className="font-bold">Httpbin_post</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form className="space-y-2">
                <FormControl variant="outlined" fullWidth required>
                  <InputLabel>Username</InputLabel>
                  <OutlinedInput label="Username" />
                </FormControl>
                <FormControl variant="outlined" fullWidth required>
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput type="password" label="Password" />
                </FormControl>
                <Button variant="contained" color="primary">Add</Button>
              </form>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className="mb-2">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className="font-bold">Httpbin_get</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form className="space-y-2">
                <FormControl variant="outlined" fullWidth required>
                  <InputLabel>Query</InputLabel>
                  <OutlinedInput label="Query" />
                </FormControl>
                <Button variant="contained" color="primary">Add</Button>
              </form>
            </AccordionDetails>
          </Accordion>
        </div>
      </AccordionDetails>
    </Accordion>
      

      {/* Repeat the above Accordion for other items like 天气 etc. */}
      {/* Add your additional accordions here following the same structure */}
    </div>
  );
};

export default AccordionPanel;

