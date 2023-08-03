import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ModalProps } from './Modal.types'
import './Modal.css'

/**
 * Modal component to display a dialog window with customizable content.
 *
 * @typedef {Object} ModalProps
 * @property {string} [title] - The title of the modal dialog.
 * @property {string} [content] - The main content of the modal dialog.
 * @property {string} [height] - The height of the modal dialog (e.g., "300px", "50%").
 * @property {string} [width] - The width of the modal dialog (e.g., "400px", "80%").
 * @property {string} [color] - The text color of the modal dialog.
 * @property {string} [backgroundColor] - The background color of the modal dialog.
 * @property {React.ReactNode} [footerButton] - The React node to render in the footer of the modal.
 * @property {boolean} [open] - Flag to indicate whether the modal should be open or not.
 * @property {Function} [onClose] - Callback function to handle the modal close event.
 * @returns {JSX.Element|null} The Modal component or nothing if not open.
 * @example
 * const [open, setOpen] = useState(false)
 * <Modal
 *    title="Modal open"
 *    content="You've successfully opened this modal !"
 *    height="400px"
 *    width="600px"
 *    color="grey"
 *    backgroundColor="white"
 *    footerButton={<Button onClick={() => setOpen(false)} content="Super !" />}
 *    open={open}
 *    onClose={() => setOpen(false)}
 * />
 */
function Modal({
    title,
    content,
    height,
    width,
    color,
    backgroundColor,
    footerButton,
    open,
    onClose
}: ModalProps) {

    const modalRef: any = useRef()
    /**
     * Handles the tab key press within the modal 
     * to manage focus navigation for accessibility purpose.
     *
     * @param {KeyboardEvent} e - The keyboard event.
     * @returns {void}
     */
    const handleTabKey = (e: KeyboardEvent) => {
        const focusableModalElements = modalRef.current.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        )
        const firstElement = focusableModalElements[0]
        const lastElement = focusableModalElements[focusableModalElements.length - 1]

        const isTabPressed = e.key === "Tab" || e.keyCode === 9;
        // if any other key is pressed
        if (!isTabPressed) {
            return
        }

        if (e.shiftKey) { // if shift+tab is pressed together
            if (document.activeElement === firstElement) {
                lastElement.focus() // focus on last focusable element
                e.preventDefault()
            }
        } else { // if focus on the last focusable element
            if (document.activeElement === lastElement) {
                firstElement.focus() // add focus on first focusable element
                e.preventDefault()
            }
        }
    
        if (modalRef.current && !modalRef.current.contains(e.target)) { // if focus is outside the modal
            firstElement.focus() // bring it back to the first focusable element
            e.preventDefault()
        }
    }

    const keyListenersMap = new Map([["Escape", onClose], ["Tab", handleTabKey]])

    useEffect(() => {
        document.body.style.overflow = open === false ? "unset" : "hidden"

        /**
         * Handles the keydown event and calls the appropriate key listener.
         *
         * @param {KeyboardEvent} e - The keyboard event.
         * @returns {void}
         */
        function keyListener(e: KeyboardEvent) {
            const listener = keyListenersMap.get(e.key)
            return listener && listener(e)
        }
        window.addEventListener("keydown", keyListener)
        return () => window.removeEventListener("keydown", keyListener)

    }, [open])

    // Render the modal portal if open is set to true in the designated container.
    // Here document.body
    return open ? createPortal(
        <div className='modal__background'>
            <div
            ref={modalRef}
            className='modal__wrapper'
            role='alertdialog'
            tabIndex={-1}
            aria-modal={true}
            aria-labelledby={title}
            aria-describedby={content}
            style={{ backgroundColor }}
        >
            <div
                className='modal'
                style={{ width, height, color }}
            >
                <button
                    className='modal__btn modal__btn--close'
                    type='button'
                    onClick={onClose}
                >
                    x
                </button>
                <div className="modal__header">
                    <h2 className="modal__title">{title}</h2>
                </div>
                <div className="modal__body">
                    <p className="modal__content">{content}</p>
                </div>
                <div className="modal__footer">{footerButton}</div>
            </div>
        </div>
    </div>, document.body
    ) : null
}

Modal.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string
    ]),
    content: PropTypes.oneOfType([
        PropTypes.string
    ]),
    footerButton: PropTypes.element,
    height: PropTypes.string,
    width: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func
}

export default Modal
