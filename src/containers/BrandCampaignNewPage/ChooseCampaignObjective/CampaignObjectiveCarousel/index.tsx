import React from 'react';
import Carousel from "react-multi-carousel";
import { Icon } from 'semantic-ui-react';
import BrandCampaignObjectiveCard from '../../../../components/BrandCampaignObjectiveCard';
/* Components */

/* Styles */
import './index.scss';
import "react-multi-carousel/lib/styles.css";


interface Props {
  selectedObjective: string,
  setSelectedObjective: (objective: string) => void;
  options: string[];
}

const ProductStatCarousel = (props:Props) => {
      const {options, selectedObjective, setSelectedObjective} = props;
      
      // @ts-ignore
      const ArrowGroup = ({ next, previous, ...rest }:any) => {
        const { carouselState: { currentSlide, totalItems, slidesToShow } } = rest;
        return (
          <div className="carouselArrowGroup">
            <button 
              onClick={previous}
              className={currentSlide === 0 ? 'disable' : 'leftArrow'}
            > 
              <Icon name="chevron circle left" color="teal" size="big"/>
            </button>

            <button 
              onClick={next} 
              className={currentSlide+slidesToShow === totalItems ? 'disable' : 'rightArrow'}
            > 
              <Icon name="chevron circle right" color="teal" size="big"/>
            </button>
          </div>
        );
      };
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 0 },
          items: 2,
          paritialVisibilityGutter: 300,
        }
    }
	return (
        <div className="carouselBox">
            <Carousel 
                className="carouselWrapper"
                responsive={responsive}
                centerMode
                itemClass="statItem"
                showDots={false}
                arrows={false}
                /* @ts-ignore */
                customButtonGroup={<ArrowGroup/>}
            >
                {options.map((option) => {
                  const cardClassName = selectedObjective === option 
                    ? 'objectiveCard objectiveCard__selected' 
                    : 'objectiveCard';
                    
                  return (
                  <BrandCampaignObjectiveCard
                    onClick={() => setSelectedObjective(option)}
                    title={option}
                    className={cardClassName}
                  />);
                })}
            </Carousel>
        </div>
	);
};

export default ProductStatCarousel;
