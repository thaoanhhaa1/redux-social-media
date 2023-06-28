import Live from '../components/Live';
import Page from '../components/Page';
import Trend from '../components/trend/Trend';
import Card from '../components/card/Card';
import Criket from '../components/criket/Criket';

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
