import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Auth from './routes/Auth'

import {
    createBrowserRouter as Router,
    Navigate,
    RouterProvider
    } from "react-router-dom";
import ErrorPage from './routes/Error';
import Test from './test';
import UserRouteFunc from './routes/UserRouteFunc';
import SignUp from './routes/SignUp'
import Chat from './routes/Chat';
import WrapNavigate from './routes/WrapNavigate';
import NoChat from './routes/NoChat';
import MessageBlock from './routes/MessageBlock'
import SignIn from './routes/SignIn';
import AppLayout from './routes/AppLayout';
import GroupChat from './routes/GroupChat';


const router = Router([
    {
        path: "/chat",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [{
            path: 'auth',
            element: <Auth />,
            children: [{
                path: 'signin',
                element: <SignIn />
            }, {
                path: 'signup',
                element: <SignUp />
            }]
        }, {
            path: 'room',
            element: <AppLayout />,
            children: [{
                path: ':userId',
                element: <Chat />,
                children: [{
                    path: '',
                    element: <NoChat />
                },{
                    path: ':contactId',
                    element: <MessageBlock />
                }]
            }]
        }]
        
    }
])

/**
 * Handle sending state through use navigation hook
 * Use the useNavigate hook:

    const navigate = useNavigate();
    navigate('/other-page', { state: { id: 7, color: 'green' } });
    Then, you can access the state data in '/other-page' via the useLocation hook:

    const {state} = useLocation();
    const { id, color } = state; // Read values passed on state
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);