import React, { useState } from 'react';
import './textarea.css';
import axios from 'axios';

function Textsection({ voiceName }) {
  const [text, setText] = useState('');
  const [audioSrc, setAudioSrc] = useState(null);

  async function handleSynthesize() {
    try {
      const response = await axios.post('http://localhost:3001/synthesize', {
        text,
        voiceName,
      });

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

      <h4 className='text-section-subtitle'>Aggiungi pronunce personalizzate utilizzando rappresentazioni fonetiche IPA o X-SAMPA</h4>

      <div className='parole-custom-container'>

      </div>

      <button className={voiceName ? "genera-button" : "genera-button-non-disponibile"} onClick={handleSynthesize}>
        {voiceName ? "Genera con voce " + voiceName : "Seleziona Una Voce"}
      </button>

      {<audio className='player-audio-generato' controls src={audioSrc} />}
    </div>
  );
}

export default Textsection;
