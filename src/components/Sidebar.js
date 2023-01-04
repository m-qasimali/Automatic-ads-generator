import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useLocation } from 'react-router-dom';

// icons
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import QuizIcon from '@mui/icons-material/Quiz';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LoginIcon from '@mui/icons-material/Login';

import Home from './home_pages/Home';
import AboutUs from './home_pages/AboutUs';
import Services from './home_pages/Services';
import FAQs from "./home_pages/FAQs";
import Pricing from "./home_pages/Pricing"
import ContactUs from "./home_pages/ContactUs"


const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [menu, setMenu] = useState("Home");
    const [mobileOpen, setMobileOpen] = useState(false);
    // const location = useLocation();
    // const [slash, path] = location.pathname.split('/');
    const [path, setPath] = useState('Home')
    

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const clickHandler = (arg) => {
        setMenu(arg);
        setPath(arg);
    }

    const getPage = (p)=>{
        switch(p){
            case '': { return <Home />; break; }
            case 'Home': { return <Home />;break; }
            case 'About us': { return <AboutUs />;break; }
            case 'Pricing': { return <Pricing />; break; }
            case 'Services': { return <Services />; break; }
            case "FAQ's": { return <FAQs />; break; }
            case 'Contact us': { return <ContactUs />; break; }
        }
    }

    const icons1 = [<HomeIcon sx={{ color: '#F0F3FB' }} />, <InfoIcon sx={{ color: '#F0F3FB' }} />, <LocalOfferIcon sx={{ color: '#F0F3FB' }} />, <MedicalServicesIcon sx={{ color: '#F0F3FB' }} />, <QuizIcon sx={{ color: '#F0F3FB' }} />, <ContactPageIcon sx={{ color: '#F0F3FB' }} />]
    const icons2 = [<HomeIcon sx={{ color: '#9DA5D8' }} />, <InfoIcon sx={{ color: '#9DA5D8' }} />, <LocalOfferIcon sx={{ color: '#9DA5D8' }} />, <MedicalServicesIcon sx={{ color: '#9DA5D8' }} />, <QuizIcon sx={{ color: '#9DA5D8' }} />, <ContactPageIcon sx={{ color: '#9DA5D8' }} />]

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {['Home', 'About us', 'Pricing', 'Services', "FAQ's", 'Contact us'].map((text, index) => (
                        <ListItem key={text} style={{ marginBottom: '5px' }} disablePadding>
                        <ListItemButton sx={text === menu ? { color: '#F0F3FB', backgroundColor: '#1E0BA6', '&:hover': { color: '#F0F3FB', backgroundColor: '#1E0BA6' } } : { color: '#9DA5D8', backgroundColor: '#5F4FC1', '&:hover': { color: '#F0F3FB', backgroundColor: '#1E0BA6' } }} onClick={(e) => clickHandler(text)}>
                            
                            <ListItemIcon>
                                {text === menu ? icons1[index] : icons2[index]}
                            </ListItemIcon>
                                <ListItemText primary={text} />
                            
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        <Link to="/login">
            <ListItemButton sx={{ position: 'absolute', bottom: '20px', width: '100%', border: '3px solid #1E0BA6', color: '#1E0BA6' }}>
                <ListItemText primaryTypographyProps={{ style: { fontSize:'20px', fontWeight:'bold' } }} primary={'Login'} />
                <ListItemIcon>
                    <LoginIcon sx={{ color:'#1E0BA6', fontWeight:'bold' }} />
                </ListItemIcon>

            </ListItemButton>
        </Link>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }} >
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor:'#5F4FC1'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Automatic Ads Generator
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer

                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', backgroundColor: "#B9C5E9", width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', backgroundColor: "#B9C5E9", width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                {
                    getPage(path)
                }
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;