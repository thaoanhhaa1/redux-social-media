import Page from '../components/Page';
import Card from '../components/card/Card';

const Explore = () => {
    return (
        <Page
            scrollChildren={
                <>
                    <Card />
                    <Card />
                    <Card />
                </>
            }
            scrollWidth="var(--explore-sidebar-width)"
        >
            <div>Children</div>
        </Page>
    );
};

export default Explore;
