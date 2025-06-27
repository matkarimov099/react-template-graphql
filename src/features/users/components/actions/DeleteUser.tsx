interface DeleteUserProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	resetSelection: () => void;
	userId?: string;
	userName?: string;
}

export const DeleteUser = ({ open, onOpenChange }: DeleteUserProps) => {
	// TODO: Implement delete user functionality with GraphQL
	if (open) {
		onOpenChange(false); // Close dialog for now
	}
	return null;
};
