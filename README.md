## Install

```sh
npm install --save react-carousel-responsive
```

<!-- ## Demo -->

<!-- [https://stas-raranetskyi.github.io/react-rating-scale/](https://stas-raranetskyi.github.io/react-rating-scale/) -->

### [PlayGround](https://codesandbox.io/s/react-responsive-carousel-4tiwv)

## Example

```javascript
import React from 'react';
import Rating  from 'react-rating-scale';
import Slider from 'react-carousel-responsive';
import 'react-carousel-responsive/dist/styles.css';

const App = () => (
    <Slider>
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
```

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
children | ReactNode[] | [] | slides
autoplay | boolean | true | auto scroll
autoplaySpeed | number | 5000 | Delay between each auto scroll (in milliseconds)
pauseOnHover | boolean | true | Prevents autoplay while hovering on track
slidesToShow | number | 1 | How many slides to show in one frame
slidesToScroll | number | 1 | How many slides to scroll at once
speed | number | 500 | Animation speed in milliseconds
timingFunction | string | ease |
beforeChange(currentSlides: HTMLDivElement[]) | func | - | callback function before frame scroll
afterChange(currentSlides: HTMLDivElement[]) | func | - | callback function after frame scroll

## Author

|[![@Stas Raranetskyi](https://avatars0.githubusercontent.com/u/11090889?s=128&v=4)](https://github.com/stas-raranetskyi/)|
|:---:|
|[Stas Raranetskyi](https://github.com/stas-raranetskyi/)|
