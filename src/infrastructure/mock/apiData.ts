import { Author, Podcast } from '@application/types'

export const podcasts: Podcast[] = [
  {
    id: '21',
    author: {
      id: '222',
      description: 'some description',
      firstName: 'The First Dude',
      podcasts: 7,
      avatarUrl: 'https://randomuser.me/api/portraits/women/57.jpg',
      subjects: [
        {
          description: 'subject description',
          id: 'id',
          tag: '#tec',
          title: 'the title of subject',
        },
      ],
    },
    averagePuntuation: 4,
    description: 'Some description about podcast',
    subjects: [
      {
        description: 'subject description',
        id: 'id',
        tag: '#technology',
        title: 'the title of subject',
      },
    ],
    title: 'How to use the dragonglass',
    coverImage:
      'https://cdn.dribbble.com/users/5325603/screenshots/12190443/3.jpg',
  },
  {
    id: 'as',
    author: {
      id: '2222',
      description: 'some description',
      firstName: 'mly cyriys',
      podcasts: 7,
      subjects: [
        {
          description: 'subject description',
          id: 'id',
          tag: '#tec',
          title: 'the title of subject',
        },
      ],
    },
    averagePuntuation: 5,
    description: 'Some description about podcast',
    subjects: [
      {
        description: 'subject description',
        id: 'id',
        tag: '#music',
        title: 'the title of subject',
      },
    ],
    title: 'The state of poprock in 2021',
    coverImage:
      'https://direct.rhapsody.com/imageserver/images/alb.552950040/500x500.jpg',
  },
  {
    id: 'thesame',
    author: {
      id: '2220',
      description: 'some description',
      firstName: 'kny west',
      avatarUrl: 'https://randomuser.me/api/portraits/men/59.jpg',
      podcasts: 7,
      subjects: [
        {
          description: 'subject description',
          id: 'id',
          tag: '#tec',
          title: 'the title of subject',
        },
      ],
    },
    averagePuntuation: 2,
    description: 'Riding of object',
    subjects: [
      {
        description: 'subject description',
        id: 'id',
        tag: '#horror',
        title: 'the title of subject',
      },
    ],
    title: 'Blinding my eyes',
    coverImage: 'https://i.ytimg.com/vi/SmJz-GSmdrg/maxresdefault.jpg',
  },
]

export const trendingAuthors: Author[] = [
  {
    id: '1212',
    description: 'some description',
    firstName: 'YOBOY',
    podcasts: 7,
    avatarUrl: 'https://randomuser.me/api/portraits/women/54.jpg',
    subjects: [
      {
        description: 'subject description',
        id: 'id',
        tag: '#tec',
        title: 'the title of subject',
      },
    ],
  },
  {
    id: '09090',
    description: 'some description',
    firstName: 'The First Dude',
    podcasts: 7,
    avatarUrl: 'https://randomuser.me/api/portraits/women/57.jpg',
    subjects: [
      {
        description: 'subject description',
        id: 'id',
        tag: '#tec',
        title: 'the title of subject',
      },
    ],
  },
]

export const hottestPodcast: Podcast[] = [
  {
    id: '21',
    author: {
      id: '222',
      description: 'some description',
      firstName: 'Love and Lie',
      podcasts: 7,
      avatarUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
      subjects: [
        {
          description: 'subject description',
          id: 'id',
          tag: '#tec',
          title: 'the title of subject',
        },
      ],
    },
    averagePuntuation: 3,
    description: 'Some description about podcast',
    subjects: [
      {
        description: 'subject description',
        id: 'id',
        tag: '#technology',
        title: 'the title of subject',
      },
    ],
    title: 'How to use the dragonglass',
    coverImage:
      'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b3/1d/43/b31d432b-b252-c8fe-bf46-ed9ccec4edc4/cover_4062851775489.jpg/400x400cc.jpg',
  },
  {
    id: 'as',
    author: {
      id: '2222',
      description: 'some description',
      firstName: 'mly cyriys',
      podcasts: 7,
      subjects: [
        {
          description: 'subject description',
          id: 'id',
          tag: '#tec',
          title: 'the title of subject',
        },
      ],
    },
    averagePuntuation: 6,
    description: 'Some description about podcast',
    subjects: [
      {
        description: 'subject description',
        id: 'id',
        tag: '#music',
        title: 'the title of subject',
      },
    ],
    title: 'Mr Yeti',
    coverImage:
      'https://direct.rhapsody.com/imageserver/images/alb.553161619/500x500.jpg',
  },
  {
    id: 'thesame',
    author: {
      id: '2220',
      description: 'some description',
      firstName: 'kny west',
      avatarUrl: 'https://randomuser.me/api/portraits/men/59.jpg',
      podcasts: 7,
      subjects: [
        {
          description: 'subject description',
          id: 'id',
          tag: '#tec',
          title: 'the title of subject',
        },
      ],
    },
    averagePuntuation: 3,
    description: 'Riding of object',
    subjects: [
      {
        description: 'subject description',
        id: 'id',
        tag: '#horror',
        title: 'the title of subject',
      },
    ],
    title: 'Blinding my eyes',
    coverImage: 'https://i.ytimg.com/vi/SmJz-GSmdrg/maxresdefault.jpg',
  },
]
