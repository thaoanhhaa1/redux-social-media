import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';

function App() {
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
                                    <Layout>
                                        <Element />
                                    </Layout>
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
