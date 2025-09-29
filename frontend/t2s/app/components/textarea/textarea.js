import React from 'react'
import './textarea.css'
function Textsection() {
  return (
    <div className='textsection-container'>
        <h1 className='text-section-title'>Text to Speech</h1>
        <h4 className='text-section-subtitle'>Inserisci il testo da convertire in audio</h4>
        <textarea className='text-area' placeholder='Inserisci il testo qui...'></textarea>
        <button className='genera-button'>Genera</button>
    </div>
  )
}

export default Textsection