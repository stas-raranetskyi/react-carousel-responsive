import { ReactNode } from 'react';

export interface Props {
    children: ReactNode[];
    autoplay?: boolean;
    autoplaySpeed?: number;
    pauseOnHover?: boolean;
    slidesToShow?: number;
    slidesToScroll?: number;
    speed?: number;
    zIndex?: number;
    timingFunction?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'step-start' | 'step-end' | 'steps' | 'cubic-bezier';
    breakpoint?: any; // -
    afterChange?(currentSlides: HTMLDivElement[]): void;
    beforeChange?(currentSlides: HTMLDivElement[]): void;
}

export const defaultProps = {
    children: [],
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    zIndex: 100,
    speed: 500,
    timingFunction: 'ease',
}
