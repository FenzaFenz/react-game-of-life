import {ChangeEvent, useState} from 'react';
import css from './game-of-life.module.css';

interface IControlsProps {
    isStarted: boolean;
    onStart: () => void;
    onStop: () => void;
    onRandomize: (probability: number) => void;
}

const Controls = ({isStarted, onRandomize, onStart, onStop}: IControlsProps) => {
    const [probability, setProbability] = useState<number>(50);

    const changeProbability = (evt: ChangeEvent<HTMLInputElement>) => {
        const val = Math.min(Math.max(parseInt(evt.target.value), 0), 100) || 0;
        setProbability(val);
    }

    return (<div className={css.form}>
        <fieldset>
            <button disabled={isStarted} onClick={onStart}>Run</button>
            <button disabled={!isStarted} onClick={onStop}>Stop</button>
        </fieldset>
        <fieldset>
            <label htmlFor="probability">Probability of non-empty field</label>
            <input id="probability" value={probability} onChange={changeProbability} />
            <button disabled={isStarted} onClick={() => onRandomize(probability)}>Randomize field</button>
        </fieldset>

    </div>);
}

export default Controls;