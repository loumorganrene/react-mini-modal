import { useState } from 'react'
import Modal from './components/Modal/Modal'
import './App.css'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="App">
        <button
          className='modal_btn'
          type='button'
          onClick={() => setOpen(!open)}
        >
          Open Modal
        </button>
        <Modal
          title="Test"
          content="Employee successfully added !"
          color='grey'
          backgroundColor=''
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </>
  )
}

export default App
