import React from 'react'
import './musicpicker.css'

const arrayVoci = ["Achernar", "Achird", "Algenib", "Algieba", "Alnilam", "Aoede", "Autonoe", "Callirrhoe", "Charon", "Despina", "Enceladus", "Erinome", "Fenrir", "Gacrux", "Iapetus", "Kore", "Laomedeia", "Leda", "Orus", "Puck", "Pulcherrima", "Rasalgethi", "Sadachbia", "Sadaltager", "Schedar", "Sulafat", "Umbriel", "Vindemiatrix", "Zephyr", "Zubenelgenubi",];

function MusicPicker() {
  return (
    <div className='musicpicker-container'>
      <h2 className='music-section-title'>Musica di sottofondo</h2>
      <div className='music-list-container'>

        {arrayVoci.map((voce) => (
          <div className='music-item' key={voce}>
             <p className='music-name'>{voce}</p>
            <audio className='voice-audio' controls src={`https://cloud.google.com/text-to-speech/docs/audio/it-IT-Chirp3-HD-${voce}.wav`}/>
          </div>
        ))}


      </div>
    </div>
  )
}

export default MusicPicker