import Home from '../Components/Pages/Home';
import NotFound from '../Components/Pages/NotFound/NotFound';
import ErrorPage from '../Components/Pages/ErrorPage/ErrorPage';
import Search from '../Components/Pages/Search/Search';
import Details from '../Components/Pages/Details/Details';

import {
  Home as HomeIcon,
  Delete,
  Download,
  LockPerson,
  LockOpen,
  OpenInBrowser,
  Edit,
  SettingsSuggest,
  CreateNewFolder,
  FolderDelete,
  Info,
  RoomPreferences,
  RuleFolder,
  SettingsApplications,
  Launch,
  InfoOutlined,
  UploadFile,
  Preview,
  AccountTree,
  AddTask,
  Search as SearchIcon,
  Favorite,
  Details as DetailsIcon
} from '@mui/icons-material';
import Favorites from '../Components/Pages/Favorites/Favorites';

export const pages = [];
export const privatePages = [
  {
    path: `/`,
    exact: true,
    component: Home,
    children: [
      {
        path: `/search`,
        component: Search,
        menuLabel: `Movie search`,
        menuIcon: SearchIcon
      },
      {
        path: `/favorites`,
        component: Favorites,
        menuLabel: `Favorites`,
        menuIcon: Favorite
      },
      {
        path: `/details/:movieId`,
        component: Details,
        menuLabel: `Details`,
        menuIcon: Info
      },
      {
        path: `/`,
        component: Search,
        menuLabel: `Movie search`,
        menuIcon: SearchIcon
      }
    ]
  },
  { path: `/error`, component: ErrorPage },
  { path: `*`, component: NotFound }
];

export const dateTimeFormat = 'dd. mm. yy, h:MM TT';
export const dateFormat = 'dd. mm. yyyy';
export const dateTimeFormatRaw = 'yyyy-MM-ddThh:mm';
export const dateFormatRaw = 'yyyy-MM-dd';
export const sidebarWidth = 200;
export const headerHeight = 60;
export const modalHeaderFooterHeight = 50;
export const detailsWidth = 400;
export const treeWidth = 300;
export const documentClassDefinitionId = '8a1d4e6a-2936-11e9-b210-d663bd873d93';
export const dmsUserAuthority = '347fc71f-cc9d-4008-a032-1238d6483efc';
export const closeDetails = {
  tree: { lg: 3, md: 3 },
  table: { lg: 9, md: 9 },
  details: { lg: 0, md: 0 }
};

export const openDetails = {
  tree: { lg: 2, md: 2 },
  table: { lg: 7, md: 7 },
  details: { lg: 3, md: 3 }
};

export const treeContextMenuItems = [
  {
    label: 'folderDetails',
    icon: Info,
    permission: 'READ'
  },
  {
    label: 'createFolder',
    icon: CreateNewFolder,
    permission: 'WRITE'
  },
  {
    label: 'renameFolder',
    icon: Edit,
    permission: 'WRITE'
  },
  {
    label: 'folderPreferences',
    icon: RoomPreferences,
    permission: 'READ'
  },
  {
    label: 'folderPermissions',
    icon: RuleFolder,
    permission: 'admin'
  },
  {
    label: 'startWorkflow',
    icon: AccountTree,
    permission: 'WRITE'
  },
  { label: 'folderColumns', icon: SettingsApplications, permission: 'WRITE' },
  {
    label: 'deleteFolder',
    icon: FolderDelete,
    permission: 'DELETE'
  }
];

export const treeContextBasicMenuItems = [
  {
    label: 'createFolder',
    icon: CreateNewFolder
  },
  {
    label: 'renameFolder',
    icon: Edit
  },
  {
    label: 'deleteFolder',
    icon: FolderDelete
  }
];

export const rootTreeContextMenuItems = [
  {
    label: 'createFolder',
    icon: CreateNewFolder,
    permission: 'WRITE'
  }
];

export const loaderSizes = {
  small: 25,
  medium: 50,
  large: 100
};

export const listFormats = [
  // { value: 'xslx', format: 'xlsx' },
  // { value: 'csvTemplate', format: 'csv' },
  { value: 'csv', format: 'csv' }
];

export const uploadTableOptions = [
  { label: 'uploadCsv', value: false },
  { label: 'appendCsv', value: true }
];
export const checkedOutedDocumentDetailsActions = [
  'preview',
  'download',
  'checkin',
  'checkinByDocument',
  'open'
];

export const documentActionsForNotCurrentVersion = ['preview', 'download', 'open'];
export const documentDetailsActionsVariants = {
  checkedOutByMe: ['preview', 'download', 'checkin', 'checkinByDocument', 'open', 'openInModal'],
  checkedOut: ['preview', 'download', 'checkin', 'open', 'openInModal'],
  notCurrentVersion: ['preview', 'download', 'open', 'openInModal']
};
export const detailsActionsItems = {
  DOCUMENT: [
    {
      name: 'preview',
      icon: InfoOutlined,
      permission: 'READ',
      webOnly: true
    },
    {
      name: 'delete',
      icon: Delete,
      permission: 'DELETE',
      webOnly: false
    },
    {
      name: 'download',
      icon: Download,
      permission: 'READ',
      webOnly: false
    },
    {
      name: 'checkout',
      icon: LockOpen,
      permission: 'WRITE',
      webOnly: true
    },
    { name: 'checkin', icon: LockPerson, permission: 'WRITE', webOnly: true },
    {
      name: 'checkinByDocument',
      icon: UploadFile,
      permission: 'WRITE',
      webOnly: true
    },
    // { name: 'workflowDefine', icon: AccountTree },
    {
      name: 'open',
      icon: OpenInBrowser,
      permission: 'READ',
      webOnly: false
    },
    {
      name: 'openInModal',
      icon: Preview,
      permission: 'READ',
      webOnly: true
    },
    {
      name: 'editDocType',
      icon: Edit,
      permission: 'WRITE',
      webOnly: true
    },
    {
      name: 'editCustomProperties',
      icon: SettingsSuggest,
      permission: 'WRITE',
      webOnly: true
    },
    {
      name: 'startWorkflow',
      icon: AccountTree,
      permission: 'WRITE',
      webOnly: false
    }
  ],
  TABLE: [
    {
      name: 'delete',
      icon: Delete,
      permission: 'DELETE',
      webOnly: false
    },
    {
      name: 'download',
      icon: Download,
      permission: 'READ',
      webOnly: false
    },
    {
      name: 'openTable',
      icon: Launch,
      permission: 'READ',
      webOnly: true
    }
  ],
  HTML: [
    {
      name: 'delete',
      icon: Delete,
      permission: 'DELETE',
      webOnly: false
    },
    {
      name: 'open',
      icon: OpenInBrowser,
      permission: 'READ',
      webOnly: false
    },
    {
      name: 'openHtml',
      icon: Launch,
      permission: 'READ',
      webOnly: true
    },
    {
      name: 'openInModal',
      icon: Preview,
      permission: 'READ',
      webOnly: true
    },
    {
      name: 'download',
      icon: Download,
      permission: 'READ',
      webOnly: false
    }
  ]
};

export const dataTableColumns = [
  'id',
  'title',
  'mimetype',
  'creator',
  'created',
  'modifier',
  'modified',
  'comment'
];

export const dataTableColumnsToNotShow = [
  'folderId',
  'definitionId',
  'isCheckedOut',
  'referencedDocumentsIds',
  'customProperties',
  'usedInWorkflows',
  'entity'
];

export const detailsTableFields = {
  DOCUMENT: ['id', 'title', 'creator', 'created', 'modifier', 'modified', 'mimetype', 'comment'],
  TABLE: ['id', 'title', 'creator', 'created', 'modifier', 'modified'],
  HTML: ['id', 'title', 'creator', 'created', 'modifier', 'modified']
};

export const folderDetails = [
  { value: 'name', label: 'folder' },
  { value: 'path', label: 'path' },
  { value: 'creator', label: 'creator' },
  { value: 'created', label: 'created' },
  { value: 'modifier', label: 'modifier' },
  { value: 'modified', label: 'modified' }
];

export const workflowDetails = [
  { value: 'createdBy', label: 'creator' },
  { value: 'createdDate', label: 'created' },
  { value: 'lastModifiedBy', label: 'modifier' },
  { value: 'lastModifiedDate', label: 'modified' }
];
export const defaultThemeColor = '#127081';
export const dataTypes = [
  'STRING',
  'DOUBLE',
  'INTEGER',
  'DATE',
  'TIME',
  'DATETIME',
  'BOOLEAN',
  'SMILE'
];
export const actionsToNotifiedAbout = [];
export const fileTypes = { DOCUMENT: 'DOCUMENT', TABLE: 'TABLE', HTML: 'HTML' };
export const preferencesOptions = [{ type: 'view', options: ['DOCUMENT', 'TABLE', 'HTML'] }];
export const defaultColumns = [
  {
    id: 'title-col',
    propertyId: null,
    name: 'title',
    dataType: 'STRING'
  },
  {
    id: 'mimetype-col',
    propertyId: null,
    name: 'mimetype',
    dataType: 'STRING'
  },

  {
    id: 'creator-col',
    propertyId: null,
    name: 'creator',
    dataType: 'STRING'
  },
  {
    id: 'created-col',
    propertyId: null,
    name: 'created',
    dataType: 'DATETIME'
  }
];

export const defaultSearchColumns = [
  {
    id: 'title-col',
    propertyId: null,
    name: 'title',
    dataType: 'STRING'
  },
  {
    id: 'filetype-col',
    propertyId: null,
    name: 'fileType',
    dataType: 'STRING'
  },

  {
    id: 'creator-col',
    propertyId: null,
    name: 'creator',
    dataType: 'STRING'
  },
  {
    id: 'created-col',
    propertyId: null,
    name: 'created',
    dataType: 'DATETIME'
  }
];
export const defaultListAndHtmlColumns = [
  {
    id: 'title-col',
    propertyId: null,
    name: 'title',
    dataType: 'STRING'
  },
  {
    id: 'creator-col',
    propertyId: null,
    name: 'creator',
    dataType: 'STRING'
  },
  {
    id: 'created-col',
    propertyId: null,
    name: 'created',
    dataType: 'DATETIME'
  }
];

export const acceptedFiles = {
  DOCUMENT: {
    'image/png': ['.png', '.jpg', '.jpeg'],
    'text/html': ['.pdf', '.txt', '.tex', '.doc', '.wpd', '.zip', '.xlsx', '.docx']
  },
  HTML: {
    'text/html': ['.html']
  },
  LIST: { 'text/csv': ['.csv'] },
  themeLogo: {
    'image/png': ['.png', '.jpg', '.jpeg']
  }
};

export const maxUploadSize = 10000000;
