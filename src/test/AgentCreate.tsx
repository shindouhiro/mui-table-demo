import React, { useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { createAgent, putAgent } from '@/apis/agent';
import { CreateAgentParams } from '@/models/agent';

const AgentCreate = ({ open, handleClose,appId ,getAgentList,editInfo}: {
  open: boolean;
  handleClose: () => void;
  appId: string;
  getAgentList: () => void;
  editInfo?: CreateAgentParams ;
}) => {
  console.log({
    editInfo
  })
  const { handleSubmit, control, formState: { errors }, watch,reset } = useForm({
    defaultValues: {
      name: editInfo?.name || '',
      description: editInfo?.description || '',
    }
  });

  useEffect(() => {
    if (editInfo) {
      reset({
        name: editInfo.name || '',
        description: editInfo.description || '',
      });
    }
  }, [editInfo, reset]);
  const description = watch('description', '');



  const onSubmit = async(data) => {
    try {
      if (editInfo) {
        await putAgent({
          ...editInfo,
          ...data
        });
      } else {
        await createAgent({
          application_id: appId,
          role_prompt: '',
          ...data
        });
      }
      handleClose();
      reset();
      getAgentList();
    } catch (error) {
      console.error('Error:', error);
    }
    
  };


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>创建智能体</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { mt: 2, width: '100%' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: '名称是必填项' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="请输入智能体的名称，如：OA办公助手"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : '名称仅支持中文/英文/数字/下划线/英文点'}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{
              required: '描述是必填项',
              maxLength: {
                value: 100,
                message: '描述最多100个字符',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="请输入智能体描述，要能准确描述此智能体的功能，如：一键生成项目总结汇报，周报或会议纪要等，高效便捷。"
                variant="outlined"
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description ? errors.description.message : '描述仅支持中文/英文/数字/下划线/英文点'}
                InputProps={{
                  endAdornment: (
                    <span>{`${description.length}/100`}</span>
                  ),
                }}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button onClick={handleSubmit(onSubmit)}>提交</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgentCreate;
