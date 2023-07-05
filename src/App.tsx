import { useState } from 'react'
import Modal from './components/Modal/Modal'
import './App.css'
import Button from './components/Button'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="App">
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
          backgroundColor=''
          footerButton={<Button onClick={() => setOpen(false)} content="Super !" />}
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </>
  )
}

export default App
