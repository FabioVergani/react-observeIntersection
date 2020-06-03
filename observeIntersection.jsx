import React, { useState, useLayoutEffect } from 'react';

const { IntersectionObserver } = globalThis;

const observeIntersection = options => {
    const intersectionObserver = new IntersectionObserver(entries => {
        for (const entry of entries) {
            entry.target.setIntersect(entry.isIntersecting);
        }
    }, options);
    return [
        () => {
            const [intersect, setIntersect] = useState(false),
                [observedNode, setObservedNode] = useState(null);
            if (observedNode) {
                observedNode.setIntersect = setIntersect;
            }
            useLayoutEffect(() => {
                const node = observedNode;
                if (node) {
                    const observer = intersectionObserver;
                    observer.observe(node);
                    return () => {
                        observer.unobserve(node);
                    };
                }
            }, [observedNode]);
            return [intersect, setObservedNode];
        },
        intersectionObserver
    ];
};

export default observeIntersection;
