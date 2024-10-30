import { ScrollPosition, ScrollBarProps } from "./types";
import clsx from "clsx";
import styles from './style.module.scss';

export function ScrollBar ({children, position=ScrollPosition.vertical, extraClass='', style={} }: ScrollBarProps) {

    let positionClass;

	switch (position) {
		case ScrollPosition.horizontal:
			positionClass = styles.scroll_overflowX;
			break;
		case ScrollPosition.both:
			positionClass = styles.scroll_overflowBoth;
			break;
		default:
			positionClass = styles.scroll_overflowY;
	}

    return (
			<ul
				className={clsx(styles.scroll, positionClass, extraClass)}
				style={style}
			>
				{children}
			</ul>
		);
}