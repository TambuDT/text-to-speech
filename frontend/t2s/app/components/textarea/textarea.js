import React, { useState } from 'react';
import './textarea.css';
import axios from 'axios';

function Textsection() {
  const [text, setText] = useState('');
  const [audioSrc, setAudioSrc] = useState(null);
  const pitch = 0;
  const voiceName = "Gacrux";

  async function handleSynthesize() {
    try {
      const response = await axios.post('http://localhost:3001/synthesize', { text, pitch, voiceName});

      if (response.data && response.data.audioContent) {
        const audioBase64 = response.data.audioContent;
        const audioSrc = `data:audio/mp3;base64,${audioBase64}`;
        setAudioSrc(audioSrc);
      } else {
        console.error("Risposta senza audioContent:", response.data);
      }
    } catch (err) {
      console.error("Errore richiesta:", err);
    }
  }

  return (
    <div className='textsection-container'>
      <h1 className='text-section-title'>Text to Speech</h1>
      <h4 className='text-section-subtitle'>Inserisci il testo da convertire in audio</h4>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className='text-area'
        placeholder='Inserisci il testo qui...'
      />
      <button className='genera-button' onClick={handleSynthesize}>Genera</button>
      {audioSrc && <audio controls src={audioSrc} />}
    </div>
  );
}

export default Textsection;
