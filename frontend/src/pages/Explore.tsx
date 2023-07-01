import Live from '../components/Live';
import Page from '../components/Page';
import Criket from '../components/criket/Criket';
import Trend from '../components/trend/Trend';

const Explore = () => {
    return (
        <Page
            scrollChildren={
                <>
                    {/* <Card />
                    <Card />
                    <Card /> */}
                </>
            }
            scrollHeight="var(--scroll-height)"
            scrollWidth="var(--explore-sidebar-width)"
        >
            <Live />
            <Criket />
            <Trend />
        </Page>
    );
};

export default Explore;
