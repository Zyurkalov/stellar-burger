export const enum  ScrollPosition {
	horizontal= 'horizontal',
	vertical = 'vertical',
	both = 'both'
}

export type ScrollBarProps = {
	children: React.ReactNode;
	position?: ScrollPosition;
	extraClass?: string;
	style?: React.CSSProperties;
};