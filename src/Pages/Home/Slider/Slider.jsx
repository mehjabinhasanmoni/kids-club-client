import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
const Slider = () => {


  return (
    <div>
        <Carousel>
                <div>
                    <img src="https://i.ibb.co/280ZsWf/slider-4.jpg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="https://i.ibb.co/cJCtjYp/slider-2.jpg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="https://i.ibb.co/R33pcKX/slider-3.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>

      
    </div>
  );
};

export default Slider;
