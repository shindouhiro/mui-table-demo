import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControl,
  TextField,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MenuItem } from '@mui/material';
import { Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
          
        >
          <div className="flex items-center  justify-around  w-full ">
            <div className="flex w-full items-center">
              <div className=" border-1  w-[50px] h-[50px] bg-emerald" />
              <div className="flex flex-col ml-10  justify-around">
                <div className="font-bold">Httpbin</div>
                <div >httpbin</div>
                <div>
                  <span className="bg-gray-200 px-2  mt-1 text-center inline-block rounded-full" >2个技能</span>
                </div>
                <div >创建于2024-04-23 11:23:45</div>
              </div>
            </div>
            <div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                className="w-60 mr-6"
              >
                <MenuItem value="https://httpbin.org">https://httpbin.org</MenuItem>
                <MenuItem value="https://another-url.com">https://another-url.com</MenuItem>
              </Select>
              </FormControl>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col">
            <div className="flex  w-full justify-between ">
                <div>
                    <div>Httpbin_post</div>
                    <div>https://httpbin.org/post</div>
                    <div>
                      <span className="bg-gray-200 px-2">passwrod</span>
                      <span className="bg-gray-200 px-2 ml-2">username</span>
                      <span className="ml-2">参数</span>
                    </div>
                </div>
                <div>
                      <button>添加</button>
                  </div>
            </div>
        </AccordionDetails>
      </Accordion>


      {/* Repeat the above Accordion for other items like 天气 etc. */}
      {/* Add your additional accordions here following the same structure */}
    </div>
  );
};

export default AccordionPanel;

