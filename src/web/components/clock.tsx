import React from 'react';

export const Clock: React.FC = () => {
    const range = (start: number, end: number) => [...Array((end - start) + 1)].map((_, i) => start + i);

    return (
        <div id="clock">
            {
                range(0, 59).map((num) => {
                    let angle = Math.PI / 30;
                    let x: number = Math.sin(angle * num);
                    let y: number = Math.cos(angle * num);
                    let left: string = `calc(50% + calc(47% * ${x}))`;
                    let top:  string = `calc(50% + calc(47% * ${y}))`;

                    return (
                        <div
                            className="dot"
                            style={{left: left, top: top}}>
                        </div>
                    )
                })
            }
        </div>
    );
}
