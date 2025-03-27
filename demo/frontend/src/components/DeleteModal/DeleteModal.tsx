import { Button, Modal as BootstrapModal } from 'react-bootstrap';
import { IoWarning } from 'react-icons/io5';

interface DeleteModalProps<T> {
    show: boolean;
    onHide: () => void;
    // userToDelete: string | null;
    // roleToDelete: string | null;
    data: T[];  // This can be a user or role, depending 
    onDelete: () => void;  // Function to handle deletion
    type: 'user' | 'role' | 'userRole';  // To differentiate between user and role deletion
}

const getTitle = (type: 'user' | 'role' | 'userRole') => {
    if (type === 'user') {
        return 'Confirm User Deletion';
    } else if (type === 'role') {
        return 'Confirm Role Deletion';
    } else {
        return 'Confirm User Role Deletion';
    }
};

const getContent = (type: 'user' | 'role' | 'userRole', data: any[]) => {
    if (!data || data.length === 0) return null;
    console.log("rendering ")
    if (type === 'user') {
        return (
            <div>
                <p>Are you sure you want to delete the following users?</p>
                <ul>
                    {data.map((user: any) => (
                        <li key={user._id}>
                            {user.firstName} {user.lastName} ({user.email})
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else if (type === 'role') {
        return (
            <div>
                <p>Are you sure you want to delete the following roles?</p>
                <ul>
                    {data.map((role: any) => (
                        <li key={role._id}>
                            {role.roleName}
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else {
        return (
            <p>Are you sure you want to delete UserRole?</p>
        );
    }

};


const DeleteModal = <T,>({ show, onHide, data, onDelete, type }: DeleteModalProps<T>) => {
    return (
        <BootstrapModal
            show={show}
            onHide={onHide}
            centered
            backdrop="static"
        >
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>
                    <IoWarning style={{ color: 'red' }} /> {getTitle(type)}
                </BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>
                {getContent(type, data)}

                <div className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={onHide} className="m-2">
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={onDelete} // Using the dynamic type's id
                        className="m-2"
                    >
                        Delete
                    </Button>
                </div>
            </BootstrapModal.Body>
        </BootstrapModal>
    );
};

export default DeleteModal;
