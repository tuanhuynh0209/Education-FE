import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, { forwardRef } from 'react';

// Tạo hiệu ứng chuyển động Slide cho Dialog
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SuccessDialog = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{
                style: {
                    backgroundColor: '#f4f8fa',
                    borderRadius: '12px',
                    padding: '10px'
                },
            }}
        >
            <DialogTitle sx={{ color: '#1976d2', fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' }}>
                <CheckCircleIcon sx={{ color: '#4caf50', fontSize: '2rem', marginRight: '8px' }} />
                Thành công
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" sx={{ color: '#555', fontSize: '1.2rem', textAlign: 'center', marginTop: '10px' }}>
                    Đã thêm thông tin thành công!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="contained" sx={{ fontWeight: 'bold' }}>
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SuccessDialog;
