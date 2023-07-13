import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
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
    footerButton,
    open,
    onClose
}: ModalProps) {

    const modalRef: any = useRef()

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
    }

    const keyListenersMap = new Map([["Escape", onClose], ["Tab", handleTabKey]])

    useEffect(() => {
        document.body.style.overflow = open === false ? "unset" : "hidden"
        
        open === true 
        ? document.body.firstElementChild?.setAttribute("inert", "")
        : document.body.firstElementChild?.removeAttribute("inert")

        function keyListener(e: KeyboardEvent) {
            const listener = keyListenersMap.get(e.key)
            return listener && listener(e)
        }
        window.addEventListener("keydown", keyListener)
        return () => window.removeEventListener("keydown", keyListener)
    }, [open])

    return open ? createPortal(
        <div className='modal__background--blurry'>
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
                    <h2 className="modal_title">{title}</h2>
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
