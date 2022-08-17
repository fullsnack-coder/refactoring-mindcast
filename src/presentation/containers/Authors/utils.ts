import { AppAuthor } from '@application/types'
import { palette } from '@system/theme'

export const authors: AppAuthor[] = [
  {
    name: 'Stenio Wagner',
    avatarURL: 'https://avatars.githubusercontent.com/u/5205982?v=4',
    role: 'Full-Stack Engineer',
    socialLinks: [
      {
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/steniowagner',
        color: palette.chambray,
      },
      {
        icon: 'github',
        link: 'https://github.com/steniowagner',
        color: palette['coolGray-500'],
      },
    ],
    description:
      "Hey! I'm Full-Stack JavaScript Engineer that loves apply his knowledge to solve problems, create amazing products and impact lives!",
  },
  {
    name: 'Manuel Garcia',
    avatarURL: 'https://avatars.githubusercontent.com/u/33798495?v=4',
    role: 'Frontend developer',
    description:
      "Hello, my name's Manuel, Frontend developer in love to make solutions with software, since webapps to mobile apps, based on the JavaScript Ecosystem",
    socialLinks: [
      {
        color: palette['coolGray-500'],
        icon: 'github',
        link: 'https://github.com/fullsnack-coder',
      },
      {
        color: palette.chambray,
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/manueldev/',
      },
    ],
  },
]
