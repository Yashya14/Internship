// DeleteUserModal.tsx
import React from 'react';
import { Button, Modal as BootstrapModal } from 'react-bootstrap';
import { IUser } from './User.interface';
import { IoWarning } from 'react-icons/io5';

interface DeleteUserModalProps {
  show: boolean;
  onHide: () => void;
  userToDelete: string | null;
  onDelete: (id: string) => void;
  data : IUser;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ show, onHide, userToDelete, onDelete,data }) => {
  return (
    <BootstrapModal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
    >
      <BootstrapModal.Header>
        <BootstrapModal.Title> <IoWarning style={{color :"red"}} /> Confirm Deletion</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <p>Are you sure you want to delete <b>{data && data.firstName} {data && data.lastName}</b> ?</p>
        
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onHide} className="m-2">
            Cancel
          </Button>
          <Button variant="danger" onClick={() => userToDelete && onDelete(userToDelete)} className="m-2">
             Delete
          </Button>
        </div>
      </BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default DeleteUserModal;
