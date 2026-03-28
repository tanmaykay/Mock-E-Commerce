import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", type = "alert" }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button onClick={onCancel} className="close-btn"><X size={20} /></button>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    {type === "confirm" && (
                        <button onClick={onCancel} className="cancel-btn">{cancelText}</button>
                    )}
                    <button onClick={onConfirm} className="confirm-btn">{confirmText}</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
