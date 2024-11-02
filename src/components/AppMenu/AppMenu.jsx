import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PersonIcon from '@mui/icons-material/Person';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Visão Geral',
  },
  {
    segment: 'home',
    title: 'Home',
    icon: <HomeIcon />,
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <GroupIcon />,
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <BarChartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Análitico',
  },
  {
    segment: 'duplicatas',
    title: 'Duplicatas',
    icon: <InsertDriveFileIcon />,
    children: [
      {
        segment: 'duplicatesDue',
        title: 'A vencer',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'expiredDue',
        title: 'Vencidas',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'completedDue',
        title: 'Finalizadas',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'sacados',
    title: 'Sacados',
    icon: <PersonIcon />,
  },
];

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

export default function AppMenu(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Estado para controlar se o menu está aberto ou fechado
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <AppProvider
      navigation={NAVIGATION}
    >
      <DashboardLayout
        menuOpen={menuOpen}  // Define o estado do menu
        onMenuToggle={() => setMenuOpen(false)}  // Alterna entre abrir e fechar o menu
      >
      </DashboardLayout>
    </AppProvider>
  );
}
