import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { deleteNotifications } from '../api/redux/slices/notificationsSlice';
import { getDocumentContentByVersionAction } from '../api/actions/contentsActions';
import { fileTypes } from './constants';
import { getHtmlContentAction } from '../api/actions/htmlsActions';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addItemByTargetAction,
  customUpdateAction,
  deleteItemByTargetAndIdAction,
  getDataByTargetAction,
  updateItemByTargetAction
} from '../api/actions/globalActions';
import { getAllUsersAction } from '../api/actions/usersActions';
import { isEmpty, sortBy } from 'lodash';
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

export const useDocumentContent = (fileId, version, dataTableViewType) => {
  const [document, setContent] = useState({});

  useEffect(() => {
    if (fileId) {
      if (dataTableViewType === fileTypes.HTML) {
        getHtmlContentAction(fileId, new AbortController()).then(response =>
          setContent({ preview: response })
        );
      } else {
        getDocumentContentByVersionAction(fileId, version).then(response =>
          setContent({ preview: response })
        );
      }
    }
  }, [fileId]);

  return [document];
};

export const useListFilter = (defaultData, withSort, target) => {
  const [filtredData, setFiltredData] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    if (target !== '') {
      setFilterValue('');
      setFiltredData([]);
    }
  }, [target]);

  const deleteFromFilter = (object, accessor) => {
    if (!isEmpty(filtredData)) {
      setFiltredData(
        filtredData.filter(data => {
          if (accessor) {
            return data[accessor] !== object[accessor];
          } else {
            return data !== object;
          }
        })
      );
    }
  };

  const handleFilter = (e, accessorr) => {
    setFilterValue(e.target.value);
    if (e.target.value !== '') {
      setFiltredData(
        withSort
          ? sortBy(
              defaultData?.filter(el => {
                if (accessorr) {
                  return el[accessorr].toUpperCase().includes(e.target.value.toUpperCase());
                } else {
                  return el.toUpperCase().includes(e.target.value.toUpperCase());
                }
              }),
              [
                function (item) {
                  if (accessorr) {
                    return item[accessorr].toUpperCase();
                  } else {
                    return item.toUpperCase();
                  }
                }
              ]
            )
          : defaultData?.filter(el => {
              if (accessorr) {
                return el[accessorr].toUpperCase().includes(e.target.value.toUpperCase());
              } else {
                return el.toUpperCase().includes(e.target.value.toUpperCase());
              }
            })
      );
    } else {
      setFiltredData([]);
    }
  };

  return { filtredData, filterValue, handleFilter, deleteFromFilter };
};
export const useUsersAuthorities = target => {
  const queryClient = useQueryClient();
  const [filtredData, setFiltredData] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [deleteModal, setDeleteModal] = useState({ open: false, value: {}, top: 0, left: 0 });
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState({ open: false, value: {} });

  const { data: users, isLoading: l1 } = useQuery(['users'], getAllUsersAction);
  const { data: authorities, isLoading: l5 } = useQuery(['authorities'], () =>
    getDataByTargetAction('authorities')
  );

  const { mutate: handleAdd, isLoading: l3 } = useMutation(
    item => addItemByTargetAction(target, item),
    {
      onSuccess: async newItem => {
        queryClient.setQueryData(target, old => [
          ...old,
          { ...newItem, ...(target === 'users' && { id: newItem.username }) }
        ]);
      }
    }
  );

  const { mutate: handleUpdate, isLoading: l2 } = useMutation(
    item => updateItemByTargetAction(item, target),
    {
      onSuccess: async updatedItem => {
        queryClient.setQueryData(target, old =>
          old.map(item =>
            item.id === updatedItem[target === 'users' ? 'username' : 'id']
              ? { ...updatedItem, ...(target === 'users' && { id: updatedItem.username }) }
              : item
          )
        );
      }
    }
  );

  const { mutate: handleDelete, isLoading: l4 } = useMutation(
    id => deleteItemByTargetAndIdAction(target, id),
    {
      onSuccess: async (data, id) => {
        queryClient.setQueryData(target, old => {
          return old.filter(item => item.id !== id);
        });
      }
    }
  );

  const handleFilter = e => {
    setFilterValue(e.target.value);
    if (e.target.value !== '') {
      setFiltredData(
        (target === 'users' ? users : authorities).filter(el =>
          el[target === 'users' ? 'username' : 'name']
            .toUpperCase()
            .includes(e.target.value.toUpperCase())
        )
      );
    } else {
      setFiltredData([]);
    }
  };

  const toggleModal = (type, value, e) => {
    switch (type) {
      case 'add':
        setAddModal(prev => !prev);
        break;
      case 'edit':
        setEditModal({ open: !editModal.open, value: value });
        break;
      case 'delete':
        setDeleteModal({
          open: !deleteModal.open,
          value: value,
          top: e?.clientY,
          left: e?.clientX
        });
        break;
      default:
        break;
    }
  };
  const isLoading = l1 || l2 || l3 || l4 || l5;

  return {
    users,
    authorities,
    filtredData,
    filterValue,
    isLoading,
    addModal,
    editModal,
    deleteModal,
    toggleModal,
    handleFilter,
    handleAdd,
    handleDelete,
    handleUpdate
  };
};

export const parseUsers = rawRows => {
  rawRows = rawRows.map(rawRow => {
    return { ...rawRow, id: rawRow.username };
  });

  return rawRows;
};
