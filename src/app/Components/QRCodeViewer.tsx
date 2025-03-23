import React from 'react';
import QRCode from 'react-qr-code';
import Swal from 'sweetalert2';
import QrCodeIcon from '@mui/icons-material/QrCode';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const QRCodeViewer = ({ URL, Title }: { URL: string; Title: string }) => {
    const showQRCode = () => {
        MySwal.fire({
            title: Title,
            html: (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <QRCode value={URL} />
                </div>
            ),
            showCloseButton: true,
            showConfirmButton: false,
        });
    };

    return <QrCodeIcon style={{ cursor: 'pointer' }} onClick={showQRCode} />;
};

export default QRCodeViewer;
