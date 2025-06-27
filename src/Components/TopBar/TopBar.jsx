import React from 'react'
import './TopBar.css'
import NotificationsIcon from "@mui/icons-material/Notifications";
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';


export default function TopBar() {
  return (
    <div className='topbar'>
      <div className="topbar-container">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">SabzLearn ❤</span>
          </div>
          <div className="topRight">
            <div className="topbarIconContainer">
              <NotificationsIcon />
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              <LanguageIcon />
              <span className="topIconBadge">4</span>
            </div>
            <div className="topbarIconContainer">
              <SettingsIcon />
            </div>
            <img src="images/npm.png" className="topAvatar" />
          </div>
        </div>
      </div>
    </div>
  )
}
