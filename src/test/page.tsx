'use client';

import AppBoardHeader from '@/components/Features/AppBoard/AppBoardHeader';
import { Fragment, useEffect, useState } from 'react';
import AgentCraete from '@/components/Features/AppBoard/AgentCreate';
import PluginCreate from '@/components/Features/AppBoard/PluginCreate';
import {
  Accordion, AccordionSummary,
  AccordionDetails, Typography,
  TextField, Button,
  Switch,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
  Avatar,
  Paper
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { agentList, deleteAgent, putAgent } from '@/apis/agent';
import { useConfirm } from 'material-ui-confirm';
import { set, update } from 'lodash';
import DebugChat from '@/components/Features/DebugChat';
import { IAgent } from '@/models/agent';
import { useForm, Controller } from 'react-hook-form';

const options = [
  { value: 'plugin1', label: 'Httpbin' },
  { value: 'plugin2', label: '插件2' },
  { value: 'plugin3', label: '插件3' },
];
const data = [
  {
    plugin: 'httpbin',
    skill: 'httpbin post',
  },
];
export default function AppBoard({ params }: { params: { appid: string } }) {
  const appId = params.appid;
  // const [agentItem,setAgenItem] = useState<IAgent | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editInfo, setEditInfo] = useState<IAgent | null>(null)
  const [pluginVisible, setPluginVisible] = useState(false)
  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [customPrompt, setCustomPrompt] = useState(false);
  const [list, setList] = useState([])
  const confirm = useConfirm();
  const { handleSubmit, control, formState: { errors }, watch, reset } = useForm({
    introduction: editInfo?.introduction || '',
    suggested_question: editInfo?.suggested_question || '',
  });

  useEffect(() => {
    getAgentList()
  }, [])

  useEffect(() => {
    if (editInfo) {
      reset({
        introduction: editInfo.introduction || '',
        suggested_question: editInfo.suggested_question || '',
      });
    }
  },[editInfo,reset])

  

  const getAgentList = () => {
    agentList({ page: 1, page_size: 99 }).then(res => {
      console.log(res)
      setList(res.data)
      setExpanded(res.data[0].name)
      setEditInfo(res.data[0])
    })
  }
  const onSubmit = async (data) => {
    console.log({ data })
  }






  const handleChange = (panel) => (event, isExpanded) => {
    setEditInfo(panel)
    setExpanded(isExpanded ? panel.name : false);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCustomPromptChange = () => {
    setCustomPrompt(!customPrompt);
  };

  const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper': {
      transform: 'none',
    },
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(180deg)',
    },
  }));
  return (
    (<Fragment>
      <AppBoardHeader appId={appId} />
      <AgentCraete open={isPopupOpen} handleClose={() => setIsPopupOpen(false)} appId={appId} getAgentList={getAgentList} editInfo={editInfo} />
      <PluginCreate open={pluginVisible} onClose={() => setPluginVisible(false)} />
      <div className="grid grid-cols-1 md:grid-cols-3 ">
        <div className="bg-blue-100 p-8 shadow-lg">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold " >智能体定义</h2>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsPopupOpen(true)}>
              添加智能体
            </Button>
          </div>
          {
            list.map((agent: IAgent) => {
              return (
                <Accordion expanded={expanded === `${agent.name}`} onChange={handleChange(agent)} className="mb-4">
                  <CustomAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <div className="flex justify-between items-center w-full">
                      <Typography >{agent.name}</Typography>
                      <div>
                        <CreateIcon className="text-[#632ae6] mr-2" onClick={(e) => {
                          e.stopPropagation();
                          setEditInfo(agent)
                          setIsPopupOpen(true)
                        }} />
                        <DeleteIcon className="text-[#632ae6] " onClick={(e) => {
                          e.stopPropagation();
                          confirm({ description: '你确定要删除这个项目吗？' })
                            .then(() => {
                              deleteAgent(agent.id).then(res => {
                                getAgentList()
                              })
                            })
                            .catch(() => {
                              console.log('删除取消');
                            });
                        }} />
                      </div>
                    </div>
                  </CustomAccordionSummary>
                  <AccordionDetails className="flex flex-col">
                    <div className="p-4 bg-gray-100 rounded shadow">
                      <h2 className="text-xl font-bold mb-2">角色指令</h2>
                      <div dangerouslySetInnerHTML={{ __html: agent.role_prompt }} />
                    </div>
                  </AccordionDetails>
                </Accordion>
              )
            })
          }

        </div>
        <div className="bg-green-100 p-8 shadow-lg">
          <div className="flex  mb-4">
            <h2 className="text-xl font-bold " >能力扩展</h2>
          </div>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Accordion>
              <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className="flex justify-between w-full ">
                  <Typography >插件</Typography>
                  <AddIcon onClick={(e) => {
                    e.stopPropagation();
                    setPluginVisible(true);
                  }} />
                </div>
              </CustomAccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>插件</TableCell>
                        <TableCell>技能</TableCell>
                        <TableCell>操作</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Badge
                                badgeContent="API"
                                color="primary"
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left',
                                }}
                              >
                                <Avatar style={{ backgroundColor: '#9c27b0' }}>H</Avatar>
                              </Badge>
                              <span style={{ marginLeft: 8 }}>{row.plugin}</span>
                            </div>
                          </TableCell>
                          <TableCell>{row.skill}</TableCell>
                          <TableCell>
                            <IconButton color="primary">
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

              </AccordionDetails>
            </Accordion>

            {/* <Accordion>
            <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>知识库</Typography>
            </CustomAccordionSummary>
            <AccordionDetails>
              <TextField
                select
                value={selectedOption}
                onChange={handleOptionChange}
             
                variant="outlined"
                className="w-full"
                size="small"
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </AccordionDetails>
          </Accordion> */}

            <Accordion>
              <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>开场白</Typography>
              </CustomAccordionSummary>
              <AccordionDetails>
                <Controller
                  name="introduction"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    (<><TextField
                        {...field}
                        multiline
                        rows={4}
                        placeholder="欢迎来到我的Agent应用！作为一个智能助手，我将竭尽所能为您提供帮助。请告诉我您需要做什么，我会尽力满足您的需求。"
                        variant="outlined"
                        className="w-full"
                        size="small"
                        onChange={(e) => {
                          field.onChange(e); // 执行默认的 onChange 逻辑
                          putAgent({
                            ...editInfo,
                            introduction: e.target.value,
                          })
                        }}
                      /></>)
                  )}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>推荐问</Typography>
              </CustomAccordionSummary>
              <AccordionDetails>
                <Box className="space-y-2">
                  <Controller
                    name="suggestedQuestions[0]"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder="请输入推荐问"
                        variant="outlined"
                        className="w-full"
                        size="small"
                      />
                    )}
                  />
                  <Controller
                    name="suggestedQuestions[1]"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder="请输入推荐问"
                        variant="outlined"
                        className="w-full"
                        size="small"
                      />
                    )}
                  />
                  <Controller
                    name="suggestedQuestions[2]"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder="请输入推荐问"
                        variant="outlined"
                        className="w-full"
                        size="small"
                      />
                    )}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className="flex justify-between w-full items-center">
                  <Typography>追问</Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={customPrompt}
                        onChange={handleCustomPromptChange}
                        color="primary"
                      />
                    }
                  />
                </div>
              </CustomAccordionSummary>
              <AccordionDetails>
                <Box className="space-y-2">
                  <Typography>每次完成任务后，根据用户最后一轮对话内容自动提供3个提问建议</Typography>
                  <FormControlLabel
                    control={<Checkbox name="checkedA" />}
                    label="自定义Prompt"
                  />
                  <TextField
                    multiline
                    rows={4}
                    value="问题应该与你最后一轮的回复紧密相关，可以发进一步的讨论。"
                    variant="outlined"
                    className="w-full"
                    size="small"
                  />
                </Box>
              </AccordionDetails>
            </Accordion>

          </form>
        </div>
        <div className="bg-red-100 p-8 shadow-lg">
          <div className="flex  mb-4">
            <h2 className="text-xl font-bold ">预览调试</h2>
          </div>

          <DebugChat />
        </div>
      </div>
      <div className="max-w-md mx-auto mt-10">

      </div>
    </Fragment>)
  );
}
