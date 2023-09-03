import React from "react";

interface ISelectButton {
	isSelecting: boolean;
	isSelected: boolean;
	handleSelection: () => void;
}

function SelectButton({
	isSelecting,
	isSelected,
	handleSelection,
}: ISelectButton) {
	return isSelecting ? (
		<button
			onClick={handleSelection}
			className="absolute rounded-full h-8 w-8 bg-white flex items-center justify-center"
		>
			{isSelected && (
				<div className="relative inset-0 h-6 w-6 bg-blue-900 rounded-full"></div>
			)}
		</button>
	) : null;
}

export default SelectButton;
