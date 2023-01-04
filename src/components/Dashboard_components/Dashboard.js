import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import "./dashboard.css";
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../utils/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import AccountSetting from "./pages/AccountSetting";
import AdSetting from "./pages/AdSetting";
import Analytics from "./pages/Analytics";
import Audience from "./pages/Audience";
import CreateAd from "./pages/CreateAd";
import DashboardHome from "./pages/DashboardHome";
import Help from "./pages/Help";
import Payment from "./pages/Payment";
import Platform from "./pages/Platform";
import Traffic from "./pages/Traffic";
import Upgrade from "./pages/Upgrade";

// icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import Groups2Icon from "@mui/icons-material/Groups2";
import CreateIcon from "@mui/icons-material/Create";
import PaymentIcon from "@mui/icons-material/Payment";
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import SearchIcon from '@mui/icons-material/Search';

import LoginIcon from "@mui/icons-material/Login";

const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#CED6F0",
    '&:hover': {
        backgroundColor: "#CED6F0",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '50%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "rgba(67, 63, 76, 0.8)",
    fontSize: "1rem",
    fontWeight: "bold",
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
}));

const Dashboard = (props) => {
    const { window } = props;
    const [name, setName] = useState("");
    const [menu, setMenu] = useState("Dashboard");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [path, setPath] = useState("Dashboard");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    }, [user, loading]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const clickHandler = (arg) => {
        setMenu(arg);
        setPath(arg);
    };

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    const getPage = (p) => {
        switch (p) {
            case '': { return <DashboardHome />; }
            case 'Dashboard': { return <DashboardHome />; }
            case 'Analytics': { return <Analytics />; }
            case 'Setting': { return <AdSetting />; }
            case 'Audience': { return <Audience />; }
            case "Create Ad": { return <CreateAd />; }
            case 'Payment': { return <Payment />; }
            case 'Traffic': { return <Traffic />; }
            case 'Platform': { return <Platform />; }
            case 'Account Setting': { return <AccountSetting />; }
            case "Help": { return <Help />; }
            case 'Upgrade Plan': { return <Upgrade />; }
        }
    }

    const icons1 = [
        <DashboardIcon sx={{ color: "#1E0BA6" }} />,
        <AnalyticsIcon sx={{ color: "#1E0BA6" }} />,
        <SettingsSuggestIcon sx={{ color: "#1E0BA6" }} />,
        <Groups2Icon sx={{ color: "#1E0BA6" }} />,
        <CreateIcon sx={{ color: "#1E0BA6" }} />,
        <PaymentIcon sx={{ color: "#1E0BA6" }} />,
        <InsightsRoundedIcon sx={{ color: "#1E0BA6" }} />,
        <LineStyleIcon sx={{ color: "#1E0BA6" }} />,
        <SettingsIcon sx={{ color: "#1E0BA6" }} />,
        <HelpIcon sx={{ color: "#1E0BA6" }} />,
        <UpgradeIcon sx={{ color: "#1E0BA6" }} />,


    ];
    const icons2 = [
        <DashboardIcon sx={{ color: "#433F4C" }} />,
        <AnalyticsIcon sx={{ color: "#433F4C" }} />,
        <SettingsSuggestIcon sx={{ color: "#433F4C" }} />,
        <Groups2Icon sx={{ color: "#433F4C" }} />,
        <CreateIcon sx={{ color: "#433F4C" }} />,
        <PaymentIcon sx={{ color: "#433F4C" }} />,
        <InsightsRoundedIcon sx={{ color: "#433F4C" }} />,
        <LineStyleIcon sx={{ color: "#433F4C" }} />,
        <SettingsIcon sx={{ color: "#433F4C" }} />,
        <HelpIcon sx={{ color: "#433F4C" }} />,
        <UpgradeIcon sx={{ color: "#433F4C" }} />,
    ];

    const drawer = (
        <div>
            <Toolbar />
            <List>
                {[
                    "Dashboard",
                    "Analytics",
                    "Setting",
                    "Audience",
                    "Create Ad",
                    "Payment",
                    "Traffic",
                    "Platform",
                    "Account Setting",
                    "Help",
                    "Upgrade Plan",
                ].map((text, index) => (
                    <>
                        <ListItem key={text} style={{ marginBottom: "5px" }} disablePadding>
                            <ListItemButton
                                sx={
                                    text === menu
                                        ? {
                                            borderRight: "12px solid #1E0BA6",
                                            color: "#1E0BA6",
                                            backgroundColor: "#9DA5D8",
                                            "&:hover": {
                                                color: "#433F4C",
                                                backgroundColor: "#9DA5D8",
                                            },
                                        }
                                        : {
                                            color: "#433F4C",
                                            backgroundColor: "#fff",
                                            "&:hover": {
                                                color: "#433F4C",
                                                backgroundColor: "#9DA5D8",
                                            },
                                        }
                                }
                                onClick={(e) => clickHandler(text)}
                            >
                                <ListItemIcon>
                                    {text === menu ? icons1[index] : icons2[index]}
                                </ListItemIcon>
                                <p style={{ fontWeight: "bold" }}>{text}</p>
                            </ListItemButton>
                        </ListItem>
                        {(index === 7) && <Divider />}
                    </>
                ))}
            </List>

            <Divider />
            <ListItemButton
                onClick={logout}
                sx={{
                    width: "100%",
                    border: "3px solid #1E0BA6",
                    color: "#1E0BA6",
                    marginTop: '15px'
                }}
            >
                <ListItemIcon>
                    <LoginIcon
                        sx={{
                            color: "#1E0BA6",
                            fontWeight: "bold",
                            transform: "rotate(180deg)",
                        }}
                    />
                </ListItemIcon>
                <ListItemText
                    primaryTypographyProps={{
                        style: { fontSize: "20px", fontWeight: "bold" },
                    }}
                    primary={"Logout"}
                />
            </ListItemButton>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex", backgroundColor: '#F0F3FB' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: "#5F4FC1",
                }}
            >
                <Toolbar className="toolbar">
                    <IconButton
                        color="#1E0BA6"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon color="#1E0BA6" />
                    </IconButton>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon style={{ color: "rgba(67, 63, 76, 0.8)" }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <div>
                        <img className="profile" src="./images/profile.jpg" alt="" />
                    </div>
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
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            backgroundColor: "#fff",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            backgroundColor: "#fff",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                {
                    getPage(path)
                }
            </Box>
        </Box>
    );
};

export default Dashboard;
