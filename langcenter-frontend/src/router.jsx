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
import ForgotPasswordPage from './views/ForgotPasswordPage';



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
                path: '/enseignants',
                element: <Enseignants/>,
            },
            {
                path: '/students',
                element: <Students/>
            },
            {
                path: '/parents',
                element: <Parents/>
            },
            {
                path: '/groupes',
                element: <Groupes/>
            },
            {
                path: '/cours',
                element: <Cours />     
            },
            {
                path: "/presencesEns",
                element: <PresencesEns/>
            },
            {
                path: "/presencesEtu",
                element: <PresencesEtu/>
            },
            {
                path: "/paiementsEtu",
                element: <PaiementsEtu/>
            },
            {
                path: "/paiementsEns",
                element: <PaiementsEns/>
            },
            {
                path: "/emploiTemps",
                element: <EmploiTemps/>
            },
            {
                path: "/resultats",
                element: <Resultats/>
            },
            {
                path: "/salles",
                element: <Salles/>
            },
            {
                path: "/settings",
                element: <Settings/>
            },
            {
                path: "/utilisateurs",
                element: <Utilisateurs/>
            }
        ]
    },
    {
        path: '/auth',
        element: <Login />
    },
    {
        path: '/ForgotPassword',
        element: <ForgotPasswordPage />
    },
    {
        path: '*',
        element: <Error404/>
    }
])
export default router;