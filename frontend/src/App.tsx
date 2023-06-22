import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { RootState } from './app/store';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { publicRoutes } from './routes';

function App() {
    const isDarkTheme = useSelector((state: RootState) => state.theme.isDark);

    useEffect(() => {
        document
            .getElementsByTagName('html')[0]
            .classList[isDarkTheme ? 'add' : 'remove']('dark');
    }, [isDarkTheme]);

    return (
        <>
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
        </>
    );
}

export default App;
