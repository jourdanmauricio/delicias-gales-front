import { useState } from 'react';

export const useModal = (initialState: boolean = false): [boolean, () => void, () => void] => {

	const [isOpen, setIsOpen] = useState<boolean>(initialState);
	const openModal = () => {
		setIsOpen(true);
	};
	const closeModal = () => setIsOpen(false);

	return [isOpen, openModal, closeModal];
};
