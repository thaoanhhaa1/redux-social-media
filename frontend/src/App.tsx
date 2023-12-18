import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import api from './api';
import axiosClient from './api/axiosClient';
import { useAppDispatch } from './app/hooks';
import { RootState } from './app/store';
import config from './config';
import { connect } from './features/socket';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { publicRoutes } from './routes';

function App() {
    const user = useSelector((state: RootState) => state.user);
    const [isDarkTheme] = useLocalStorage(config.THEME_KEY, true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        document
            .getElementsByTagName('html')[0]
            .classList[isDarkTheme ? 'add' : 'remove']('dark');
    }, [isDarkTheme]);

    useEffect(() => {
        if (!user._id) return;

        dispatch(connect(user._id));
        axiosClient.post(api.updateOnlineStatus());
    }, [dispatch, user._id]);

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
