declare module "react-elastic-carousel" {
    import React from "react";
  
    export interface RenderArrowProps {
      type: "PREV" | "NEXT";
      onClick?: () => void;
      isEdge?: boolean;
    }
  
    export interface ReactElasticCarouselProps {
      children?: React.ReactNode;
      breakPoints?: { width: number; itemsToShow: number }[];
      pagination?: boolean;
      renderArrow?: (props: RenderArrowProps) => React.ReactNode;
      itemPadding?: [number, number, number, number] | [number];
      style?: React.CSSProperties;
    }
  
    const Carousel: React.FC<ReactElasticCarouselProps>;
    export default Carousel;
  }
  