import Hero from "../hero/Hero";
import Description from "../description/Description";
const Home = ({ slider }) => {
    return (
        <>
            <Hero slider={slider} />
            <Description />
        </>
    );
}

export default Home;