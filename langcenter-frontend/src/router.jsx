import { createBrowserRouter, Navigate } from "react-router-dom";
import ContentLayout from "./layouts/ContentLayout/ContentLayout";
import Dashboard from "./views/Dashboard"
import Enseignants from "./views/Enseignants"
import Students from "./views/Etudiants"
import Error404 from "./views/Error404"
import Login from "./views/Login";
import Groupes from './views/Groupes';
import Cours from './views/Cours';
import EmploiTemps from './views/EmploiTemps';
import PaiementsEns from './views/PaiementsEns';
import PaiementsEtu from './views/PaiementsEtu';
import Parents from './views/Parents';
import PresencesEns from './views/PresencesEns';
import PresencesEtu from './views/PresencesEtu';
import Resultats from './views/Resultats';
import Salles from './views/Salles';
import Settings from './views/Settings';
import Utilisateurs from './views/Utliisateurs';


const router = createBrowserRouter([
        {
            path: '/',
            element: <ContentLayout />,
            children : [
            {
                path: '/',
                element: <Navigate to={'/dashboard'}/>
            },

            {
                    path: '/dashboard',
                    element: <Dashboard/>,
            },
            {
                path: '/teacher',
                element: <Enseignants/>,
            },
            {
                path: '/student',
                element: <Students/>
            },
            {
                path: '/parent',
                element: <Parents/>
            },
            {
                path: '/groupe',
                element: <Groupes/>
            },
            {
                path: '/course',
                element: <Cours />     
            },
            {
                path: "/attendance Teacher",
                element: <PresencesEns/>
            },
            {
                path: "/attendance Student",
                element: <PresencesEtu/>
            },
            {
                path: "/payement Student",
                element: <PaiementsEtu/>
            },
            {
                path: "/payement Teacher",
                element: <PaiementsEns/>
            },
            {
                path: "/schedule",
                element: <EmploiTemps/>
            },
            {
                path: "/results",
                element: <Resultats/>
            },
            {
                path: "/classroom",
                element: <Salles/>
            },
            {
                path: "/settings",
                element: <Settings/>
            },
            {
                path: "/users",
                element: <Utilisateurs/>
            }
        ]
    },
    {
        path: '/auth',
        element: <Login />
    },
    {
        path: '*',
        element: <Error404/>
    }
])
export default router;