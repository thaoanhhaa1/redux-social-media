import { Criket, Live, Page, Trend } from '../components';

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
            scrollHeight='var(--scroll-height)'
            scrollWidth='var(--explore-sidebar-width)'
        >
            <Live />
            <Criket />
            <Trend />
        </Page>
    );
};

export default Explore;
