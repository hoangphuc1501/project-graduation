
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ContactForm from './contactForm';

const ContactModal = (props) => {
    const {showContactForm, setShowContactForm} = props;

    const handleClose = () => setShowContactForm(false);
    return (
        <>
            <Modal 
            show={showContactForm}
            size="lg" 
            onHide={handleClose}>
                <Modal.Header closeButton>
                    <h3 className='text-[24px] font-[400] text-main'>Gửi yêu cầu tư vấn miễn phí</h3>
                </Modal.Header>
                <Modal.Body>
                    <ContactForm/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ContactModal;