import Logo from '@/assets/logo.svg'
import {
  AccountBox,
  HomeOutlined,
  ListAltRounded,
  Logout,
  MenuRounded,
  Message,
  SettingsOutlined,
  ShareOutlined,
  Widgets,
} from '@mui/icons-material'
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from '@mui/joy'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { version } from '../../../package.json'
import NavBarLink from './NavBarLink'
const links = [
  {
    to: '/my/chores',
    label: 'Home',
    icon: <HomeOutlined />,
  },
  {
    to: '/chores',
    label: 'Desktop View',
    icon: <ListAltRounded />,
  },
  {
    to: '/things',
    label: 'Things',
    icon: <Widgets />,
  },
  {
    to: '/settings#sharing',
    label: 'Sharing',
    icon: <ShareOutlined />,
  },
  {
    to: '/settings#notifications',
    label: 'Notifications',
    icon: <Message />,
  },
  {
    to: '/settings#account',
    label: 'Account',
    icon: <AccountBox />,
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: <SettingsOutlined />,
  },
]

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openDrawer, closeDrawer] = [
    () => setDrawerOpen(true),
    () => setDrawerOpen(false),
  ]
  const location = useLocation()
  // if url has /landing then remove the navbar:
  if (
    ['/', '/signup', '/login', '/landing', '/forgot-password'].includes(
      location.pathname,
    )
  ) {
    return null
  }

  return (
    <nav className='flex gap-2 p-3'>
      <IconButton size='sm' variant='plain' onClick={() => setDrawerOpen(true)}>
        <MenuRounded />
      </IconButton>
      <Box className='flex items-center gap-2'>
        <img component='img' src={Logo} width='34' />
        <Typography
          level='title-lg'
          sx={{
            fontWeight: 700,
            fontSize: 24,
          }}
        >
          Done
          <span
            style={{
              color: '#06b6d4',
              fontWeight: 600,
            }}
          >
            tick✓
          </span>
        </Typography>
      </Box>
      <Drawer
        open={drawerOpen}
        onClose={closeDrawer}
        size='sm'
        onClick={closeDrawer}
      >
        <div>
          {/* <div className='align-center flex px-5 pt-4'>
            <ModalClose size='sm' sx={{ top: 'unset', right: 20 }} />
          </div> */}
          <List
            // sx={{ p: 2, height: 'min-content' }}
            size='md'
            onClick={openDrawer}
            sx={{ borderRadius: 4, width: '100%', padding: 1 }}
          >
            {links.map((link, index) => (
              <NavBarLink key={index} link={link} />
            ))}
          </List>
        </div>
        <div>
          <List
            sx={{
              p: 2,
              height: 'min-content',
              position: 'absolute',
              bottom: 0,
              borderRadius: 4,
              width: '100%',
              padding: 2,
            }}
            size='md'
            onClick={openDrawer}
          >
            <ListItemButton
              onClick={() => {
                localStorage.removeItem('ca_token')
                localStorage.removeItem('ca_expiration')
                // go to login page:
                window.location.href = '/login'
              }}
              sx={{
                py: 1.2,
              }}
            >
              <ListItemDecorator>
                <Logout />
              </ListItemDecorator>
              <ListItemContent>Logout</ListItemContent>
            </ListItemButton>
            <Typography
              onClick={
                // force service worker to update:
                () => window.location.reload(true)
              }
              level='body-xs'
              sx={{
                // p: 2,
                p: 1,
                color: 'text.tertiary',
                textAlign: 'center',
                bottom: 0,
                // mb: -2,
              }}
            >
              V{version}
            </Typography>
          </List>
        </div>
      </Drawer>
    </nav>
  )
}

export default NavBar
