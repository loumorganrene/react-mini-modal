import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ModalProps } from './Modal.types'
import './Modal.css'

function Modal({
    title,
    content,
    height,
    width,
    color,
    backgroundColor,
    open,
    onClose
}: ModalProps) {

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" || event.keyCode === 27 && open) {
            onClose();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, false)
        return () => {
            document.removeEventListener('keydown', onKeyDown, false)
        }

    }, [open]) //eslint-disable-line

    return open ? createPortal(
        <div
            className='modal_container'
            role='dialog'
            tabIndex={-1}
            aria-modal
            aria-labelledby={title}
            aria-describedby={content}
            style={{ backgroundColor }}
        >
            <div
                // onKeyDown={keyDownHandler}
                className='modal'
                style={{ width, height, color }}
            >
                <button
                    className='modal_close-btn'
                    type='button'
                    onClick={onClose}
                >
                    x
                </button>
                <div className="modal_header">
                    <h2 className="modal_title">{title}</h2>
                </div>
                <div className="modal_body">
                    <p className="modal_content">{content}</p>
                </div>
            </div>
        </div>, document.body
    ) : null
}

Modal.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    height: PropTypes.string,
    width: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func
}

export default Modal

//réordonner mes idées,
//trap focus dans la modale
