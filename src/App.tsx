import { useState } from 'react'
import Modal from './components/Modal/Modal'
import './App.css'
import Button from './components/Button/Button'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="App">
        <h1>Usage example</h1>
        <button
          className='modal__btn'
          type='button'
          onClick={() => setOpen(!open)}
        >
          Open Modal
        </button>
        <Modal
          title="Modal open"
          content="You've successfully opened this modal !"
          color='grey'
          footerButton={<Button onClick={() => setOpen(false)} content="Super !" />}
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </>
  )
}

export default App
