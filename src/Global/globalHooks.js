import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { deleteNotifications } from '../api/redux/slices/notificationsSlice';
import { Box, Button, Typography } from '@mui/material';
import Condition from './HelperComponents/Condition';

export const useNotify = () => {
  const { notifications } = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  const Container = props => <>{props.children}</>;

  const Message = notification => (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography color='black'>{notification.message}</Typography>
        <Condition condition={notification.type === 'error'}>
          <Button
            onClick={() => alert(notification.fullMessage)}
            sx={{ color: 'gray', ml: 'auto' }}
          >
            info
          </Button>
        </Condition>
      </Box>
    </Container>
  );

  const handleNotification = () => {
    notifications.forEach(notification => {
      toast[notification.type](Message(notification));
      dispatch(deleteNotifications());
    });
  };

  useEffect(() => {
    handleNotification();
  }, [notifications]);
};
