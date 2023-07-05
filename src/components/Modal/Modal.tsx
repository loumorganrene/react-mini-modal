import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ModalProps } from './Modal.types'
import './Modal.css'

//kanban orga etap
//renommer class
//scoper sur npm
//change version pour (re)deployer

//fournir doc class
//example readme pour dif type
//vérifier +vieil version dépendance
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
        open ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'none') 
        function keyListener(e: KeyboardEvent) {
            const listener = keyListenersMap.get(e.key)
            return listener && listener(e)
        }
        document.addEventListener("keydown", keyListener)

        return () => document.removeEventListener("keydown", keyListener)
    })

    return open ? createPortal(
        <div
            ref={modalRef}
            className='modal__wrapper'
            role='dialog'
            tabIndex={-1}
            aria-modal
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
