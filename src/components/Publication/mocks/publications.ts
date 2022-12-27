import { IPublication } from '../../../models'

export const publications: IPublication[] = [
  {
    author: {
      id: 1,
      avatar: 'https://picsum.photos/100/100?random=1',
      birthday: '12/12/2001',
      createdAt: '12/12/2022',
      names: 'Example user',
      surnames: 'user example',
      userName: 'Example'
    },
    comments: [
      {
        id: 1,
        createdAt: '12/12/2022',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        commentator: {
          id: 1,
          avatar: 'https://picsum.photos/100/100?random=1',
          birthday: '12/12/2001',
          createdAt: '12/12/2022',
          names: 'Example comentator',
          surnames: 'comentator example',
          userName: 'Comentator'
        }
      }
    ],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: '12/12/2022',
    score: 0,
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/500'
    ],
    id: 1
  },
  {
    author: {
      id: 2,
      avatar: 'https://picsum.photos/100/100?random=2',
      birthday: '12/12/2001',
      createdAt: '12/12/2022',
      names: 'Example user',
      surnames: 'user example',
      userName: 'Example'
    },
    comments: [
      {
        id: 2,
        createdAt: '12/12/2022',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        commentator: {
          id: 2,
          avatar: 'https://picsum.photos/100/100?random=2',
          birthday: '12/12/2001',
          createdAt: '12/12/2022',
          names: 'Example comentator',
          surnames: 'comentator example',
          userName: 'Comentator'
        }
      }
    ],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: '12/12/2022',
    score: 0,
    images: ['https://via.placeholder.com/300'],
    id: 2
  },
  {
    author: {
      id: 3,
      avatar: 'https://picsum.photos/100/100?random=3',
      birthday: '12/12/2001',
      createdAt: '12/12/2022',
      names: 'Example user',
      surnames: 'user example',
      userName: 'Example'
    },
    comments: [
      {
        id: 3,
        createdAt: '12/12/2022',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        commentator: {
          id: 3,
          avatar: 'https://picsum.photos/100/100?random=3',
          birthday: '12/12/2001',
          createdAt: '12/12/2022',
          names: 'Example comentator',
          surnames: 'comentator example',
          userName: 'Comentator'
        }
      }
    ],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: '12/12/2022',
    score: 0,
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/200'
    ],
    id: 3
  },
  {
    author: {
      id: 4,
      avatar: 'https://picsum.photos/100/100?random=4',
      birthday: '12/12/2001',
      createdAt: '12/12/2022',
      names: 'Example user',
      surnames: 'user example',
      userName: 'Example'
    },
    comments: [
      {
        id: 4,
        createdAt: '12/12/2022',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        commentator: {
          id: 4,
          avatar: 'https://picsum.photos/100/100?random=4',
          birthday: '12/12/2001',
          createdAt: '12/12/2022',
          names: 'Example comentator',
          surnames: 'comentator example',
          userName: 'Comentator'
        }
      },
      {
        id: 5,
        createdAt: '12/12/2022',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        commentator: {
          id: 4,
          avatar: 'https://picsum.photos/100/100?random=4',
          birthday: '12/12/2001',
          createdAt: '12/12/2022',
          names: 'Example comentator',
          surnames: 'comentator example',
          userName: 'Comentator'
        }
      },
      {
        id: 6,
        createdAt: '12/12/2022',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        commentator: {
          id: 4,
          avatar: 'https://picsum.photos/100/100?random=4',
          birthday: '12/12/2001',
          createdAt: '12/12/2022',
          names: 'Example comentator',
          surnames: 'comentator example',
          userName: 'Comentator'
        }
      },
      {
        id: 7,
        createdAt: '12/12/2022',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        commentator: {
          id: 4,
          avatar: 'https://picsum.photos/100/100?random=4',
          birthday: '12/12/2001',
          createdAt: '12/12/2022',
          names: 'Example comentator',
          surnames: 'comentator example',
          userName: 'Comentator'
        }
      },
      {
        id: 8,
        createdAt: '12/12/2022',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        commentator: {
          id: 4,
          avatar: 'https://picsum.photos/100/100?random=4',
          birthday: '12/12/2001',
          createdAt: '12/12/2022',
          names: 'Example comentator',
          surnames: 'comentator example',
          userName: 'Comentator'
        }
      },
      {
        id: 9,
        createdAt: '12/12/2022',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        commentator: {
          id: 4,
          avatar: 'https://picsum.photos/100/100?random=4',
          birthday: '12/12/2001',
          createdAt: '12/12/2022',
          names: 'Example comentator',
          surnames: 'comentator example',
          userName: 'Comentator'
        }
      },
      {
        id: 10,
        createdAt: '12/12/2022',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        commentator: {
          id: 4,
          avatar: 'https://picsum.photos/100/100?random=4',
          birthday: '12/12/2001',
          createdAt: '12/12/2022',
          names: 'Example comentator',
          surnames: 'comentator example',
          userName: 'Comentator'
        }
      },
      {
        id: 11,
        createdAt: '12/12/2022',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        commentator: {
          id: 4,
          avatar: 'https://picsum.photos/100/100?random=4',
          birthday: '12/12/2001',
          createdAt: '12/12/2022',
          names: 'Example comentator',
          surnames: 'comentator example',
          userName: 'Comentator'
        }
      },
      {
        id: 12,
        createdAt: '12/12/2022',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        commentator: {
          id: 4,
          avatar: 'https://picsum.photos/100/100?random=4',
          birthday: '12/12/2001',
          createdAt: '12/12/2022',
          names: 'Example comentator',
          surnames: 'comentator example',
          userName: 'Comentator'
        }
      }
    ],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: '12/12/2022',
    score: 0,
    images: [],
    id: 4
  },
  {
    author: {
      id: 5,
      avatar: 'https://picsum.photos/100/100?random=5',
      birthday: '12/12/2001',
      createdAt: '12/12/2022',
      names: 'Example user',
      surnames: 'user example',
      userName: 'Example'
    },
    comments: [
      {
        id: 5,
        createdAt: '12/12/2022',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        commentator: {
          id: 5,
          avatar: 'https://picsum.photos/100/100?random=1',
          birthday: '12/12/2001',
          createdAt: '12/12/2022',
          names: 'Example comentator',
          surnames: 'comentator example',
          userName: 'Comentator'
        }
      }
    ],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: '12/12/2022',
    score: 0,
    images: [],
    id: 5
  }
]
