import React from 'react';
import Slider from '../src';

const App: React.FC = () => (
    <Slider slidesToShow={3} slidesToScroll={3}>
        <div className="slide">1</div>
        <div className="slide">2</div>
        <div className="slide">3</div>
        <div className="slide">4</div>
        <div className="slide">5</div>
        <div className="slide">6</div>
        <div className="slide">7</div>
    </Slider>
)

export default App;
