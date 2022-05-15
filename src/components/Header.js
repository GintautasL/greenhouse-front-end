import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { logoutRequest } from "../requests"
import { ROLES } from "../constants"

const getMobilePages = (role) => [
  "Šiltnamio kontrolė",
  "Mėnesio temperatūra",
  "Dienos temperatūra",
  "Mėnesio drėgnumas",
  "Dienos drėgnumas",
  "Mėnesio žemės drėgnumas",
  "Dienos žemės drėgnumas",
  ...(role == ROLES.admin ? ["Vartotojai"] : []),
]

const getDesktopPages = (role) => [
  "Šiltnamio kontrolė",
  "Temperatūros statistika",
  "Drėgnumo statistika",
  "Žemės drėgnumo statistika",
  ...(role == ROLES.admin ? ["Vartotojai"] : []),
]

const settings = ["Mikrovaldiklis", "Atsijungti"]

export const Header = () => {
  const role = window.localStorage.getItem("role")
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [anchorElDesktop, setAnchorElDesktop] = React.useState(null)
  const [statisticsType, setStatisticsType] = React.useState("")

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseDesktopMenu = (event) => {
    setAnchorElDesktop(null)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleMobileLinkClick = async (action) => {
    if (action == "Šiltnamio kontrolė") {
      window.location.href = "/user/greenhouseControl"
    }
    if (action == "Mėnesio temperatūra") {
      window.location.href = "/statistics/temperature/month"
    }
    if (action == "Dienos temperatūra") {
      window.location.href = "/statistics/temperature/day"
    }
    if (action == "Mėnesio drėgnumas") {
      window.location.href = "/statistics/humidity/month"
    }
    if (action == "Dienos drėgnumas") {
      window.location.href = "/statistics/humidity/day"
    }
    if (action == "Dienos žemės drėgnumas") {
      window.location.href = "/statistics/soilHumidity/day"
    }
    if (action == "Mėnesio žemės drėgnumas") {
      window.location.href = "/statistics/soilHumidity/month"
    }
    if (action == "Vartotojai") {
      window.location.href = "/users"
    }
    setAnchorElNav(null)
  }

  const handleDesktopLinkClick = async (action, event) => {
    if (action == "Šiltnamio kontrolė") {
      window.location.href = "/user/greenhouseControl"
    } else if (action == "Vartotojai") {
      window.location.href = "/users"
    } else {
      setAnchorElDesktop(event.currentTarget)
      setStatisticsType(action)
    }
  }

  const handleDesktopDropdownLinkClick = async (duration) => {
    if (duration == "dienos") {
      if (statisticsType == "Drėgnumo statistika") {
        window.location.href = "/statistics/humidity/day"
      }
      if (statisticsType == "Žemės drėgnumo statistika") {
        window.location.href = "/statistics/soilHumidity/day"
      }
      if (statisticsType == "Temperatūros statistika") {
        window.location.href = "/statistics/temperature/day"
      }
    }
    if (duration == "mėnesio") {
      if (statisticsType == "Temperatūros statistika") {
        window.location.href = "/statistics/temperature/month"
      }

      if (statisticsType == "Drėgnumo statistika") {
        window.location.href = "/statistics/humidity/month"
      }

      if (statisticsType == "Žemės drėgnumo statistika") {
        window.location.href = "/statistics/soilHumidity/month"
      }
    }

    setAnchorElDesktop(null)
  }

  const handleUserMenuAction = async (action) => {
    if (action == "Atsijungti") {
      await logoutRequest()
    }
    if (action == "Mikrovaldiklis") {
      window.location.href = "/user"
    }
    setAnchorElUser(null)
  }
  console.log(anchorElNav, " ASDASD")
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleMobileLinkClick}
              sx={{
                display: { md: "none", xs: "block" },
              }}
            >
              {getMobilePages(role).map((page) => (
                <MenuItem key={page} onClick={handleMobileLinkClick}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Greenhouse
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {getDesktopPages(role).map((page) => (
              <Button
                key={page}
                onClick={(e) => handleDesktopLinkClick(page, e)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
            <Menu
              anchorEl={anchorElDesktop}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElDesktop)}
              onClose={handleCloseDesktopMenu}
            >
              <MenuItem
                onClick={() => handleDesktopDropdownLinkClick("dienos")}
              >
                <Typography textAlign="center">Dienos</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => handleDesktopDropdownLinkClick("mėnesio")}
              >
                <Typography textAlign="center">Mėnesio</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Rodyti daugiau">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleUserMenuAction}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleUserMenuAction(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
