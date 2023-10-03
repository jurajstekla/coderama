export const sampleData = {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child - 1'
    },
    {
      id: '3',
      name: 'Child - 3',
      children: [
        {
          id: '4',
          name: 'Child - 4',
          children: [
            {
              id: '5',
              name: 'Child - 5',
              children: [
                {
                  id: '6',
                  name: 'Child - 6'
                },
                {
                  id: '7',
                  name: 'Child - 7'
                },
                {
                  id: '8',
                  name: 'Child - 8'
                },
                {
                  id: '9',
                  name: 'Child - 9'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const initialRows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
];

export const documentVersions = ['1.0', '2.0', '3.0'];
export const detailsTypes = ['metadata', 'referencedDocuments'];
export const workflowDummy = {
  id: 'b9d6e3bb-44f5-49d7-b9ff-ea013d31c3da',

  name: 'Invoice Accounting',
  steps: [
    {
      id: '125e6d10-1a73-49c0-8ad1-e6bf45fc3b81',
      priority: 'HIGH',
      states: [
        {
          id: '26679b05-939b-458c-b9cd-23249bd16bc3',
          name: 'Approved',
          followingStepIds: ['d2aac990-bfa6-4973-a96e-5bab611d9843'],
          isFinal: false,
          moveToFolder: null
        },
        {
          id: '307d84ee-fab1-40be-96ef-9c1d4fb5156e',
          name: 'Rejected',
          followingStepIds: [],
          isFinal: false,
          moveToFolder: null
        }
      ],
      assignees: [],
      assigneesByAuthority: [],
      name: 'Invoice Approval',
      condition: null,
      isActionRequiredFromAll: false,
      isPasswordApproval: false,
      isFirst: false,
      durationInMinutes: 0
    },
    {
      id: '1eb22b87-8ebb-4c90-93d7-b8fe43589000',

      priority: 'HIGH',

      states: [
        {
          id: 'b097712b-7722-40fb-8987-588dcdd933ef',
          name: 'Done',
          followingStepIds: [
            '125e6d10-1a73-49c0-8ad1-e6bf45fc3b81',
            '801aaa3e-62af-4814-9645-085cf511ebab'
          ],
          isFinal: false,
          moveToFolder: null
        }
      ],
      assignees: ['PROPERTY'],
      assigneesByAuthority: [],
      name: 'Triage',
      condition: null,
      isActionRequiredFromAll: false,
      isPasswordApproval: false,
      isFirst: true,
      durationInMinutes: 2885
    },
    {
      id: '801aaa3e-62af-4814-9645-085cf511ebab',

      priority: 'HIGH',

      states: [
        {
          id: 'd561487d-ca60-4e45-88d4-3f9bd15cdc43',
          name: 'Set For Payment (Due Date)',
          followingStepIds: [],
          isFinal: false,
          moveToFolder: null
        },
        {
          id: '2d1c1160-78b8-42c7-b6e8-b349d84cdd5a',
          name: 'Payment Done',
          followingStepIds: [],
          isFinal: false,
          moveToFolder: null
        },
        {
          id: '028fef21-c6ba-433c-86bf-afddf99e6708',
          name: 'Withheld',
          followingStepIds: [],
          isFinal: false,
          moveToFolder: null
        }
      ],
      assignees: [],
      assigneesByAuthority: [],
      name: 'Payment',
      condition: null,
      isActionRequiredFromAll: false,
      isPasswordApproval: false,
      isFirst: false,
      durationInMinutes: 0
    },
    {
      id: 'd2aac990-bfa6-4973-a96e-5bab611d9843',

      priority: 'HIGH',

      states: [
        {
          id: '246fcf9c-6e35-46fb-ad23-6b35410dab35',
          name: 'Done',
          followingStepIds: ['801aaa3e-62af-4814-9645-085cf511ebab'],
          isFinal: false,
          moveToFolder: null
        }
      ],
      assignees: ['fgalfy'],
      assigneesByAuthority: [],
      name: 'Accounting',
      condition: null,
      isActionRequiredFromAll: false,
      isPasswordApproval: false,
      isFirst: false,
      durationInMinutes: 0
    }
  ]
};

export const workflowDummy2 = {
  id: 'aa7e0d2a-b282-445a-9dca-62323177b73a',
  name: 'Test',
  steps: [
    {
      id: '1cdf140d-71fa-4bdb-ab61-dbd0f8b3e433',
      point: {
        id: '837fed74-3aea-4282-a2f5-fa09b6f8a8db',
        xcoordinate: 241,
        ycoordinate: 485
      },
      states: [
        {
          id: '58465db2-62a3-4c62-94c0-26254a6a0ffe',
          name: 'Schvalena',
          followingStepIds: ['6e52c6ac-a830-4747-a036-816989e2dfc5']
        }
      ],
      previousStateIds: ['677df1d4-577f-4d1a-80e4-a0495f4f0590'],
      name: 'Vezmime pozicku',
      isFirst: false
    },
    {
      id: '6e52c6ac-a830-4747-a036-816989e2dfc5',
      point: {
        id: 'b144822f-0e02-481d-9817-ddcea86ba533',
        xcoordinate: 285,
        ycoordinate: 224
      },
      states: [
        {
          id: '677df1d4-577f-4d1a-80e4-a0495f4f0590',
          name: 'Nemame love',
          followingStepIds: ['1cdf140d-71fa-4bdb-ab61-dbd0f8b3e433']
        },
        {
          id: '5b1b240f-464b-4d9f-8b74-2bff9328de77',
          name: 'Zaplatene',
          followingStepIds: ['787443be-05be-476e-80a6-e7de3b33c3dd']
        }
      ],
      previousStateIds: [
        'e205f394-2f50-463a-acb1-4a124321d917',
        '58465db2-62a3-4c62-94c0-26254a6a0ffe'
      ],
      name: 'Financne',
      isFirst: false
    },
    {
      id: '787443be-05be-476e-80a6-e7de3b33c3dd',
      point: {
        id: '0652aefe-c9d5-4ba3-9966-2dc6577b0cbc',
        xcoordinate: 483,
        ycoordinate: 257
      },
      states: [
        {
          id: '0af6f766-f1d4-4607-b7a1-96a805e02a18',
          name: 'Zauctovane',
          followingStepIds: ['ad2754ef-2e06-42e1-904d-e41cae7b0b2f']
        }
      ],
      previousStateIds: ['5b1b240f-464b-4d9f-8b74-2bff9328de77'],
      name: 'Zauctovanie',
      isFirst: false
    },
    {
      id: 'ad2754ef-2e06-42e1-904d-e41cae7b0b2f',
      point: {
        id: '65100145-df61-4324-ae03-d7b2ef9e07f6',
        xcoordinate: 585,
        ycoordinate: 424
      },
      states: [
        {
          id: '5ad2ca4b-eb6a-4c17-a944-fa9d4aab2eaa',
          name: 'Vybavene',
          followingStepIds: []
        }
      ],
      previousStateIds: ['0af6f766-f1d4-4607-b7a1-96a805e02a18'],
      name: 'Koniec pribehu',
      isFirst: false
    },
    {
      id: 'ba82b570-5acd-426e-9982-c3544a2c3825',
      point: {
        id: '67e5d964-f088-444a-ad28-1880af8dada7',
        xcoordinate: 58,
        ycoordinate: 93
      },
      states: [
        {
          id: 'e205f394-2f50-463a-acb1-4a124321d917',
          name: 'Prisla faktura',
          followingStepIds: ['6e52c6ac-a830-4747-a036-816989e2dfc5']
        }
      ],
      previousStateIds: [],
      name: 'Start',
      isFirst: true
    }
  ]
};
