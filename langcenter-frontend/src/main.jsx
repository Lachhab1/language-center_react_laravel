import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import {ContextProvider} from "./context/ContextProvider"
import "./App.css";

ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider>
    <RouterProvider router={router} />
    </ContextProvider>
)