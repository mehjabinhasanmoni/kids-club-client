import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
const Slider = () => {


  return (
    <div className="mt-5">
        <Carousel>
                <div>
                    <img src="https://i.ibb.co/280ZsWf/slider-4.jpg" />
                    <p className="legend">Art is Life</p>
                </div>
                <div>
                    <img src="https://i.ibb.co/cJCtjYp/slider-2.jpg" />
                    <p className="legend">Art is Life</p>
                </div>
                <div>
                    <img src="https://i.ibb.co/R33pcKX/slider-3.jpg" />
                    <p className="legend">Art is Life</p>
                </div>
            </Carousel>

      
    </div>
  );
};

export default Slider;
