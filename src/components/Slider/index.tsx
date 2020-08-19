import React, { useState, useEffect } from 'react';
import { Props, defaultProps } from './types';
import { CLASS_NAME_PREFIX } from '../../consts';
import { useInterval, normilizeFunction, debounce } from '../../helpers';

let busy = false;
const Slider: React.FC<Props> = (props) => {
    const settings = {
        ...defaultProps,
        ...props,
    }
    const childrenCount = props.children.length;
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const [withoutAnimation, setWithoutAnimation] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);
    const [autoplay, setAutoplay] = useState<number | null>(settings.autoplay ? settings.autoplaySpeed : null);
    settings.slidesToScroll = Math.min(settings.slidesToScroll, settings.slidesToShow);
    const shift = settings.slidesToShow;
    const [originalX, setOriginalX] = useState<number>(0);
    const threshold = 10;

    const beforeChange = normilizeFunction(settings.beforeChange);
    const afterChange = normilizeFunction(settings.afterChange);

    const getVisibleElementsIndex = (index: number = activeSlide) => {
        const start = index + shift;
        const end = start + settings.slidesToShow;
        return { start, end };
    }

    const getVisibleElements = (index: number = activeSlide) => {
        const visibles = getVisibleElementsIndex(index);
        const slides = document.querySelectorAll(`.${CLASS_NAME_PREFIX}slide`);
        return Array.from(slides).slice(visibles.start, visibles.end);
    }

    const changeBoundaries = (activeIndex: number) => {
        let newActiveIndex = activeIndex;
        if (activeIndex < 0) {
            newActiveIndex = childrenCount + activeIndex;
        }
        else if (activeIndex + settings.slidesToShow > childrenCount) {
            const diff = activeIndex + settings.slidesToShow - childrenCount;
            newActiveIndex = diff - settings.slidesToShow;
        }
        if (newActiveIndex !== activeIndex) {
            setWithoutAnimation(true);
            setActiveSlide(newActiveIndex);
            setTimeout(() => {
                setWithoutAnimation(false);
                busy = false;
            }, 50)
        } else {
            busy = false;
        }
        afterChange(getVisibleElements(newActiveIndex));
    }

    const changeActiveFrame = (amount: number) => {
        if (busy) {
            return;
        }
        busy = true;
        const newActiveSlide = activeSlide + (settings.slidesToScroll * amount);
        console.log(activeSlide);
        beforeChange(getVisibleElements());
        setActiveSlide(newActiveSlide);
        if (settings.autoplay === true && !autoplay && !hover) {
            setAutoplay(settings.autoplaySpeed);
        }
        debounce(changeBoundaries, settings.speed)(newActiveSlide);
    }

    const prev = () => {
        console.log('prev');
        changeActiveFrame(-1);
    }

    const next = () => {
        console.log('next');
        changeActiveFrame(1);
    }

    const getWidthChild = () => {
        return 100 / settings.slidesToShow;
    }

    const getPosition = () => {
        return `${(-(activeSlide + shift) * getWidthChild())}%`;
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

    const getSlides = () => {
        const prevChildren = [...props.children].slice(0, shift);
        const nextChildren = [...props.children].slice(childrenCount - shift, childrenCount);
        const children = [
            ...nextChildren,
            ...props.children,
            ...prevChildren,
        ];
        const visibles = getVisibleElementsIndex();
        return children.map((child, i) => {
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
        // console.log(111);
    }

    const onTouchStart = (e: any) => {
        const touch = e.changedTouches[0];
        const current = parseInt(touch.screenX, 10);
        setOriginalX(current);
    }

    const onTouchEnd = (e: any) => {
        const touch = e.changedTouches[0];
        const delta = parseInt(touch.screenX, 10) - originalX;

        if (Math.abs(delta) > threshold) {
            if (delta > 0) prev();
            if (delta < 0) next();
        }

        setOriginalX(0);
    }

    // console.log(activeSlide);

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
                    className={[
                        `${CLASS_NAME_PREFIX}track`,
                        withoutAnimation ? `${CLASS_NAME_PREFIX}withoutAnimation` : null,
                    ].join(' ')}
                    style={{
                        left: getPosition(),
                        transitionDuration: `${settings.speed / 1000}s`,
                        transitionTimingFunction: `${settings.timingFunction}s`,
                    }}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {getSlides()}
                </div>
                <button onClick={next} className={[`${CLASS_NAME_PREFIX}control`, `${CLASS_NAME_PREFIX}controlNext`].join(' ')}>❯</button>
            </div>
        </div>
    );
};

export default Slider;
