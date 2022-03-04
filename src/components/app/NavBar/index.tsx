import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import logoRoboVaultLight from '../../../images/logo_robo_vault.png';
import logoRoboVaultDark from '../../../images/logo_robo_vault.png';
import Link from '@material-ui/core/Link';

const StyledAppBar = styled(AppBar)`
    background-color: transparent !important;
`;

const StyledImg = styled.img`
    height: 68px;
    @media (max-width: 768px) {
        height: 40px;
    }
`;

const StyledWatchTitle = styled(Typography)`
    color: ${({ theme }) => theme.iconTheme};
    font-family: 'Lucida Console', 'Courier New', monospace;
    font-weight: bolder;
`;

const StyledBrightness2Icon = styled(Brightness2Icon)`
    color: ${({ theme }) => theme.iconTheme};
`;

interface NavBarProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    themeToggler: any;
    theme: string | boolean | (() => void);
}

export const NavBar: React.FC<NavBarProps> = ({ themeToggler, theme }) => {
    return (
        <Container>
            <StyledAppBar position="static" elevation={0}>
                <Toolbar>
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item>
                            <Link component={RouterLink} to="/">
                                <StyledImg
                                    alt="RoboVault Watch"
                                    src={
                                        theme === 'light'
                                            ? logoRoboVaultLight
                                            : logoRoboVaultDark
                                    }
                                />
                            </Link>
                        </Grid>

                        <Grid item>
                            <StyledWatchTitle variant="h2">
                                Robo Watch
                            </StyledWatchTitle>
                        </Grid>

                        <Grid item>
                            <IconButton
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={themeToggler}
                                color="inherit"
                            >
                                {theme === 'light' ? (
                                    <StyledBrightness2Icon />
                                ) : (
                                    <Brightness4Icon />
                                )}
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </StyledAppBar>
        </Container>
    );
};
