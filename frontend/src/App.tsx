import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import api from './api';
import axiosClient from './api/axiosClient';
import { RootState } from './app/store';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { publicRoutes } from './routes';

function App() {
    const user = useSelector((state: RootState) => state.user);
    const theme = useSelector((state: RootState) => state.theme);

    useEffect(() => {
        document
            .getElementsByTagName('html')[0]
            .classList[theme.isDark ? 'add' : 'remove']('dark');
    }, [theme.isDark]);

    useEffect(() => {
        if (!user._id) return;

        axiosClient.post(api.updateOnlineStatus());
    }, [user._id]);

    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    let Layout = route?.layout || DefaultLayout;
                    const Element = route.element;

                    return (
                        <Route
                            path={route.path}
                            key={index}
                            element={
                                (route.layout === null && <Element />) || (
                                    <Layout>
                                        <Element />
                                    </Layout>
                                )
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
