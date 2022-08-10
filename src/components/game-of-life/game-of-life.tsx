import {useCallback, useEffect, useRef, useState} from 'react';
import cn from 'classnames';
import {copyField, createField, createRandomizedField} from '../../helpers/game-of-life.helper';
import css from './game-of-life.module.css';
import useInterval from 'use-interval';
import Controls from './controls';

interface IGameOfLifeProps {
    size: number;
}

interface ICellProps {
    isAlive: boolean;
    onClick: () => void;
}

const Cell = ({isAlive, onClick}: ICellProps) => {
    return (<div onClick={onClick} className={cn({[css.cell]: true, [css.aliveCell]: isAlive})}/>);
}

const GameOfLife = ({size}: IGameOfLifeProps) => {
    const [cells, setCells] = useState<boolean[][]>(createField(size));
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const startedRef = useRef(isStarted);
    startedRef.current = isStarted;

    const onCellClick = (x: number, y: number) => {
        if (!isStarted) {
            const newField = copyField(cells);
            newField[x][y] = true;
            setCells(newField);
        }
    }

    const onStop = () => {
        setIsStarted(false);
    }

    const onStart = () => {
        setIsStarted(true);
    }

    const randomizeField = (probability: number) => {
        setCells(createRandomizedField(size, probability));
    }

    const isCellAlive = (x: number, y: number) => {
        return cells[x] && cells[x][y]
    }

    useInterval(() => {
       if (!startedRef.current) {
           return;
       }

       makeStep();
    }, 1000);

    const makeStep = () => {
        const tempGrid = createField(size);

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                let isAlive: boolean = cells[x][y];
                let neighboursCount = 0;

                // TODO: одномерный массив; cell[x][y] = cells1D[x+y*size]
                if (isCellAlive(x, y - 1)) neighboursCount++;
                if (isCellAlive(x, y + 1)) neighboursCount++;

                if (isCellAlive(x - 1, y - 1)) neighboursCount++;
                if (isCellAlive(x - 1, y)) neighboursCount++;
                if (isCellAlive(x - 1, y + 1)) neighboursCount++;

                if (isCellAlive(x + 1, y - 1)) neighboursCount++;
                if (isCellAlive(x + 1, y)) neighboursCount++;
                if (isCellAlive(x + 1, y + 1)) neighboursCount++;

                if (isAlive) {
                    tempGrid[x][y] = neighboursCount === 2 || neighboursCount === 3;
                } else {
                    tempGrid[x][y] = neighboursCount === 3;
                }
            }
        }

        setCells(tempGrid);
    };

    return (<div className={css.wrapper}>
        <Controls isStarted={isStarted} onStart={onStart} onRandomize={randomizeField} onStop={onStop} />
        <div className={css.cellContainer}>
            {cells.map((row, x) => (<div className={css.row}>
                {row.map((cell, y) => <Cell onClick={() => onCellClick(x, y)} isAlive={cell}/>)}
            </div>))}
        </div>
    </div>);
}

export default GameOfLife;