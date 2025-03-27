import { Button, Modal as BootstrapModal } from 'react-bootstrap';
import { IoWarning } from 'react-icons/io5';

interface DeleteModalProps<T> {
    show: boolean;
    onHide: () => void;
    // userToDelete: string | null;
    // roleToDelete: string | null;
    data: T;  // This can be a user or role, depending 
    onDelete: (id: string) => void;  // Function to handle deletion
    type: 'user' | 'role' | 'userRole';  // To differentiate between user and role deletion
}

// interface DeleteUserModalProps {
//   show: boolean;
//   onHide: () => void;
//   userToDelete: string | null;
//   onDelete: (id: string) => void;
//   data : IUser;
// }

const DeleteModal = <T,>({ show, onHide, data, onDelete, type }: DeleteModalProps<T>) => {
    const getTitle = () => {
        if (type === 'user') {
            return 'Confirm User Deletion';
        } else if(type === 'role') {
            return 'Confirm Role Deletion';
        }else{
            return 'Confirm User Role Deletion';
        }
    };

    const getContent = () => {
        if (!data) return null;
        console.log("rendering ")
        if (type === 'user') {
            return (
                <p>
                    Are you sure you want to delete <b>{data && (data as any).firstName} {data && (data as any).lastName}</b> ?
                </p>
            );
        } else if(type === 'role'){
            return (
                <p>
                    Are you sure you want to delete <b>{data && (data as any).roleName}</b> role?
                </p>
            );
        }else{
            return (
                <p>Are you sure you want to delete UserRole?</p>
            );
        }
        
    };


    return (
        <BootstrapModal
            show={show}
            onHide={onHide}
            centered
            backdrop="static"
        >
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>
                    <IoWarning style={{ color: 'red' }} /> {getTitle()}
                </BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>
                {getContent()}

                <div className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={onHide} className="m-2">
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => (data as any).id && onDelete((data as any).id)} // Using the dynamic type's id
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
