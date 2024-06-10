'use client';
import { createCRUD } from '@/apis/crud';
import { RowStack } from '@/components/UI/Layouts/Stack';
import { IApp } from '@/models/app';
import useModalOpen from '@/utils/hooks/useModalOpen';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import useSWR, { mutate } from 'swr';
import AppCreateModal from '../Applications/AppCreateModal';
import { HEADER_HEIGHT } from '../Header';
import AppMeta from './AppMeta';
import BoardSubMenu from './BoardSubmenu';
import { APPLICATIONS_PATH } from '@/apis/alias';

const updateApp = createCRUD(APPLICATIONS_PATH).Update;

const AppBoardHeader = ({ appId }: { appId: string }) => {
  const router = useRouter();

  const { data, isLoading } = useSWR(`/applications/${appId}`);

  const goBack = () => {
    router.push('../dashboard');
  };

  const { open, openModal, closeModal } = useModalOpen(false);

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data: IApp) => {
    return updateApp(appId, data).then(() => {
      enqueueSnackbar('保存成功');
      closeModal();
      mutate(`/applications/${appId}`);
    });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 100,
        height: HEADER_HEIGHT,
        backgroundColor: 'transparent',
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: HEADER_HEIGHT,
          backgroundColor: 'background.paper',
          justifyContent: 'space-between',
        }}
      >
        <RowStack>
          <IconButton onClick={goBack}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <AppMeta
            meta={data}
            isLoading={isLoading}
            onEdit={openModal}
          />
        </RowStack>
        <BoardSubMenu />
        <Box>
          <Button variant="contained">发布</Button>
        </Box>
      </Toolbar>
      <AppCreateModal
        open={open}
        defaultValues={data}
        onClose={closeModal}
        onSubmit={onSubmit}
      />
    </AppBar>
  );
};

export default AppBoardHeader;
