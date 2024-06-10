import StatusBadge from '@/components/UI/StatusBadge';
import type { IApp } from '@/models/app';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { Avatar, CardHeader, Link, Skeleton, Typography } from '@mui/material';

type AppMeta = {
  meta?: IApp;
  isLoading?: boolean;
  onEdit: () => void;
};

const AppMeta = ({ meta, isLoading, onEdit }: AppMeta) => {
  return (
    <CardHeader
      sx={{ p: 0 }}
      avatar={
        isLoading ? (
          <Skeleton
            animation="wave"
            variant="rounded"
            width={40}
            height={40}
          />
        ) : (
          <Avatar
            variant="rounded"
            src={meta?.icon}
            sx={{ width: 40, height: 40 }}
          />
        )
      }
      title={
        isLoading ? (
          <Skeleton
            animation="wave"
            width={200}
            style={{ marginBottom: 6 }}
          />
        ) : (
          <Typography variant="h5">
            {meta?.name}
            <Link
              sx={{ ml: 2, cursor: 'pointer' }}
              onClick={onEdit}
            >
              <EditCalendarIcon sx={{ fontSize: 16 }} />
            </Link>
          </Typography>
        )
      }
      subheader={
        isLoading ? (
          <Skeleton
            animation="wave"
            width={80}
          />
        ) : (
          <StatusBadge status={meta?.status === '未发布' ? 'fail' : 'success'}>
            {meta?.status}
          </StatusBadge>
        )
      }
    />
  );
};

export default AppMeta;
