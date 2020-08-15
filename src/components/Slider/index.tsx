import React, { useState, useEffect } from 'react';
import { Props, defaultProps } from './types';
import { CLASS_NAME_PREFIX } from '../../consts';
import { useInterval, normilizeFunction, debounce } from '../../helpers';

const Slider: React.FC<Props> = (props) => {
    const settings = {
        ...defaultProps,
        ...props,
    }
    const childrenCount = props.children.length;
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const [hover, setHover] = useState<boolean>(false);
    const [autoplay, setAutoplay] = useState<number | null>(settings.autoplay ? settings.autoplaySpeed : null);
    settings.slidesToScroll = Math.min(settings.slidesToScroll, settings.slidesToShow);

    const beforeChange = normilizeFunction(settings.beforeChange);
    const afterChange = normilizeFunction(settings.afterChange);

    const getCountToEnd = (index: number) => {
        return childrenCount - (index * settings.slidesToScroll + settings.slidesToShow);
    }

    const getCounter = (dir: number = 1) => {
        const diff = getCountToEnd(activeSlide);
        if (diff < settings.slidesToScroll && dir > 0) {
            return diff / settings.slidesToScroll;
        }
        const integer = Math.floor(activeSlide) - activeSlide;
        const res = integer !== 0 ? integer * -1 : 0;
        return res !== 0 ? res : 1;
    }

    const getVisibleElementsIndex = (index: number = activeSlide) => {
        const isEnd = getCountToEnd(index) === 0;
        const start = isEnd ? childrenCount - settings.slidesToScroll : Math.ceil(index) * settings.slidesToScroll;
        const end = isEnd ? childrenCount : start + settings.slidesToShow;
        return { start, end };
    }

    const getVisibleElements = (index: number = activeSlide) => {
        const visibles = getVisibleElementsIndex(index);
        const slides = document.querySelectorAll(`.${CLASS_NAME_PREFIX}slide`);
        return Array.from(slides).slice(visibles.start, visibles.end);
    }

    const move = (newActiveSlide: number) => {
        beforeChange(getVisibleElements(), getVisibleElements(newActiveSlide));
        setActiveSlide(newActiveSlide);
        afterChange(getVisibleElements(newActiveSlide));
        if (settings.autoplay === true && !autoplay && !hover) {
            setAutoplay(settings.autoplaySpeed);
        }
    }

    const prev = () => {
        move(Math.max(activeSlide - getCounter(-1), 0));
    }

    const next = () => {
        if (getCounter() === 0) {
            setAutoplay(null);
            return;
        }
        move(activeSlide + getCounter());
    }

    const getWidthChild = () => {
        return 100 / settings.slidesToShow;
    }

    const getPosition = () => {
        return `${(-activeSlide * 100 / settings.slidesToShow) * settings.slidesToScroll}%`;
    }

    useInterval(next, autoplay);

    const onMouseEnter = () => {
        setAutoplay(null);
        setHover(true);
    }

    const onMouseLeave = () => {
        setAutoplay(settings.autoplay ? settings.autoplaySpeed : null);
        setHover(false);
    }

    const getPagiontaion = () => {
        const pagionation = [];
        const length = Math.ceil(childrenCount / settings.slidesToShow);
        for (let i = 0; i < length; i++) {
            pagionation.push(<div
                className={[
                    `${CLASS_NAME_PREFIX}paginationItem`,
                    i === Math.ceil(activeSlide) ? `${CLASS_NAME_PREFIX}paginationItemActive` : null
                ].join(' ')}
                key={i}
                onClick={goToSilde(i)}
            />);
        }
        return pagionation;
    }

    const goToSilde = (index: number) => () => {
        const diff = childrenCount - (index * settings.slidesToScroll);
        if (diff < settings.slidesToScroll) {
            index = (index - 1) + diff / settings.slidesToScroll;
        }
        move(index);
    }

    const getSlides = () => {
        const visibles = getVisibleElementsIndex();
        return props.children.map((child, i) => {
            return (
                <div
                    className={[
                        `${CLASS_NAME_PREFIX}slide`,
                        i >= visibles.start && i < visibles.end ? `${CLASS_NAME_PREFIX}slideActive` : null
                    ].join(' ')}
                    style={{
                        width: `${getWidthChild()}%`,
                        flex: `0 0 ${getWidthChild()}%`,
                    }}
                    key={i}
                >{child}</div>
            );
        })
    }

    const resize = () => {
        console.log(111);
    }

    useEffect(() => {
        window.addEventListener('resize', debounce(resize));
        return () => {
            window.addEventListener('resize', debounce(resize));
        }
    }, []);

    return (
        <div
            className={`${CLASS_NAME_PREFIX}root`}
            onMouseEnter={settings.pauseOnHover ? onMouseEnter : undefined}
            onMouseLeave={settings.pauseOnHover ? onMouseLeave : undefined}
            style={{
                zIndex: settings.zIndex,
            }}
        >
            <div className={`${CLASS_NAME_PREFIX}inner`}>
                <button onClick={prev} className={[`${CLASS_NAME_PREFIX}control`, `${CLASS_NAME_PREFIX}controlPrev`].join(' ')}>❮</button>
                <div
                    className={`${CLASS_NAME_PREFIX}track`}
                    style={{
                        // width: `${getWidthInner()}%`,
                        left: getPosition(),
                        transitionDuration: `${settings.speed}s`,
                        transitionTimingFunction: `${settings.timingFunction}s`,
                    }}
                >
                    {getSlides()}
                </div>
                <button onClick={next} className={[`${CLASS_NAME_PREFIX}control`, `${CLASS_NAME_PREFIX}controlNext`].join(' ')}>❯</button>
            </div>
            <div className={`${CLASS_NAME_PREFIX}pagination`}>{getPagiontaion()}</div>
        </div>
    );
};

export default Slider;
