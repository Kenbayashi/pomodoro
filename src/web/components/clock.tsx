import React, { useEffect, useRef, useState } from 'react';

import { work_icon, rest_icon } from './icon'

type Pomo = "work" | "rest";

type State = {
    pomo: Pomo;
    remain: number;
};

export const Clock: React.FC = () => {
    const work_interval: number = 25;
    const work_color: string = "#ff4d2d";

    const rest_interval: number = 5;
    const rest_color: string = "#11ad11";

    const [state, setState] = useState<State>({ pomo: "work", remain: 60 * work_interval });

    useEffect(() => {
        const move_forward = () => {
            setState(({ pomo, remain }) => {
                if (remain <= 0) {
                    let new_pomo: Pomo = pomo === "work" ? "rest" : "work";
                    let new_remain: number = pomo === "work" ? 60 * rest_interval : 60 * rest_interval;
                    return { pomo: new_pomo, remain: new_remain };
                } else {
                    return { pomo: pomo, remain: remain - 1 };
                }
            });
        };

        const interval = setInterval(() => {
            move_forward();
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    const dots = () => {
        const range = (start: number, end: number) => [...Array((end - start) + 1)].map((_, i) => start + i);
        let gauge = Math.floor(state.remain / (state.pomo === "work" ? work_interval : rest_interval));

        return (
            <>
                {
                    range(0, 59).map((num) => {
                        let angle = Math.PI / 30;
                        let x: number = Math.sin(angle * num);
                        let y: number = -Math.cos(angle * num);
                        let left: string = `calc(50% + calc(45% * ${x}))`;
                        let top: string = `calc(50% + calc(45% * ${y}))`;

                        let light: boolean = num <= gauge;
                        let color: string = state.pomo === "work" ? work_color : rest_color;

                        if (light) {
                            return (
                                <div
                                    key={`dot_${num}`}
                                    className={num % 5 == 0 ? "dot big" : "dot"}
                                    style={{ left: left, top: top, backgroundColor: color }}>
                                </div>
                            )
                        } else {
                            return (
                                <div
                                    key={`dot_${num}`}
                                    className={num % 5 == 0 ? "dot big" : "dot"}
                                    style={{ left: left, top: top }}>
                                </div>
                            )
                        }
                    })
                }
            </>
        )
    }

    const information_area = () => {
        let minute: string = `0${Math.floor(state.remain / 60)}`.slice(-2);
        let second: string = `0${state.remain % 60}`.slice(-2);

        let work_icon_color: string = state.pomo === "work" ? work_color : "#c0c0c0";
        let rest_icon_color: string = state.pomo === "rest" ? rest_color : "#c0c0c0";

        return (
            <div className="information-area">
                <p className="remain-text">{`${minute}:${second}`}</p>
                <hr />
                <div className="icon-box">
                    {work_icon({ fill: work_icon_color })}
                    {rest_icon({ fill: rest_icon_color })}
                </div>
            </div>
        );
    }

    return (
        <div id="clock">
            {dots()}
            {information_area()}
        </div>
    );
}
