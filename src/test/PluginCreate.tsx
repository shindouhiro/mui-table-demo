
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button,IconButton } from '@mui/material';
import AccordionPanel from './PluginPannel';
import PluginHeader from './PluginHeader';
import CloseIcon from '@mui/icons-material/Close';
const PluginCreate = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
     <DialogTitle>
        添加插件
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <PluginHeader />
        <AccordionPanel />
      </DialogContent>
     
    </Dialog>
  );
};

export default PluginCreate;
