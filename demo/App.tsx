import React from 'react';
import Slider from '../src';
// import Slider from '../dist';
// import '../src/styles.scss';

const App: React.FC = () => (
    <Slider slidesToShow={1} slidesToScroll={1}>
        <div className="slide">1</div>
        <div className="slide">2</div>
        <div className="slide">3</div>
        <div className="slide">4</div>
        <div className="slide">5</div>
        <div className="slide">6</div>
        <div className="slide">7</div>
        {/* <div className="slide">8</div>
        <div className="slide">9</div> */}
    </Slider>
)

export default App;
