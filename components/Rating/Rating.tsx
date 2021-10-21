import IRatingProps from './IRating.props';
import styles from "./Rating.module.css";
import cn from 'classnames';
import { KeyboardEvent, useEffect, useState } from 'react';
import StarIcon from './star.svg';

export function Rating({ isEditable = false, rating, setRating, className, ...props }: IRatingProps): JSX.Element {
  const AMOUNT_OF_STARS: number = 5;
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(AMOUNT_OF_STARS).fill(<></>));

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((_, index: number) => {
      return (
        <span
          className={cn(styles.star, {
            [styles.filled]: index < currentRating,
            [styles.editable]: isEditable,
          })}
          onClick={() => onClickHandler(index + 1)}
          tabIndex={isEditable ? 0 : -1}
          onKeyDown={(event: KeyboardEvent<HTMLSpanElement>) => isEditable && onSpaceHandler(index + 1, event)}
        >
          <StarIcon />
        </span>
      )
    });

    setRatingArray(updatedArray);
  }

  const onSpaceHandler = (rating: number, event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.code !== 'Space' || typeof setRating !== 'function') return;

    setRating(rating);
  }

  const onClickHandler = (rating: number) => {
    if (!isEditable || typeof setRating !== 'function') return;

    setRating(rating);
  }

  const changeRatingDisplay = (rating: number) => {
    if (!isEditable) return;
    constructRating(rating);
  }

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  return (
    <div
      className={cn(styles.rating, className)}
      {...props}
    >
      {ratingArray.map((ratingItem: JSX.Element, index: number) => <span key={index}>{ratingItem}</span>)}
    </div>
  );
}