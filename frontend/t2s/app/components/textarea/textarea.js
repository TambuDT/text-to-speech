import React, { useState } from 'react';
import './textarea.css';
import axios from 'axios';
import { MdCancel } from "react-icons/md";

function Textsection({ voiceName }) {
  const [text, setText] = useState('');
  const [audioSrc, setAudioSrc] = useState(null);
  const [customPronunce, setCustomPronunce] = useState([]);

 function buildRequestBody() {
  const customPronunciationsArray = customPronunce
    .filter(item => item.parola && item.sostituzione && item.tipo)
    .map(item => ({
      phrase: item.parola,
      phoneticEncoding: item.tipo === "IPA" ? "PHONETIC_ENCODING_IPA" : "PHONETIC_ENCODING_X_SAMPA",
      pronunciation: item.sostituzione
    }));

  return {
    input: {
      text: text
    },
    voice: {
      name: `en-us-Chirp3-HD-${voiceName}`,
      languageCode: "en-US"
    },
    audioConfig: {
      audioEncoding: "LINEAR16"
    },
    customPronunciations: {
      pronunciations: customPronunciationsArray
    }
  };
}





  async function handleSynthesize() {
    try {
      const requestBody = buildRequestBody(); //chiamo la funzione per creare la richiesta da mandare al back, salvo la richiesta in una variabile che poi manderò al back e verrà inviata direttamente tramite el api di googel
      console.log("oggetto", requestBody);

      const response = await axios.post('http://localhost:3001/synthesize', requestBody); //invio della richiesat tramite metodo post al back js

      if (response.data && response.data.audioContent) {  //se c'è risposta allora setto l'audio nel front altrimenti ritorno l'errore 
        const audioBase64 = response.data.audioContent;
        setAudioSrc(`data:audio/mp3;base64,${audioBase64}`);
      } else {
        console.error("Risposta senza audioContent:", response.data);
      }
    } catch (err) {
      console.error("Errore richiesta:", err);
    }
  }

  function addRow() {
    setCustomPronunce(prev => [...prev, { parola: "", sostituzione: "", tipo: "" }]); //array delle pronunce custom con i parametri da specificare
  }

  //funzione per la gestione dell'aggiunta di una prouncia custom
  function updatePronunce(index, field, value) {
    setCustomPronunce(prev => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  }

  //funzione per aggiornare il tipo della pronuncia custom (funziona esattamente come la funzione precedente, va a cambiare il parametro tipo)
  function updateTipo(index, tipo) {
    setCustomPronunce(prev => {
      const copy = [...prev];
      copy[index].tipo = tipo;
      return copy;
    });
  }

  //funzione per rimuoivere la pronuncia custom
  function removeRow(index) {
    setCustomPronunce(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div className='textsection-container'>
      <h1 className='text-section-title'>Text to Speech</h1>
      <h4 className='text-section-subtitle'>
        Inserisci il testo da convertire in audio
      </h4>

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className='text-area'
        placeholder='Inserisci il testo qui...'
      />

      <div className='add-pronuncia-custom-title-container'>
        <h4 className='text-section-subtitle'>
          Aggiungi pronunce personalizzate utilizzando rappresentazioni fonetiche IPA o X-SAMPA
        </h4>
        <div className='add-pronuncia-button' onClick={addRow}><p>+</p></div>
      </div>

      <div className='parole-custom-container'>
        {customPronunce.map((item, idx) => (
          <div key={idx} className='custom-pronuncia-row'>
            <input
              value={item.parola}
              onChange={e => updatePronunce(idx, 'parola', e.target.value)}
              placeholder='Parola'
              className='custom-pronuncia-input'
            />
            <input
              value={item.sostituzione}
              onChange={e => updatePronunce(idx, 'sostituzione', e.target.value)}
              placeholder='Sostituzione'
              className='custom-pronuncia-input'
            />

            <div className='pronuncia-button-conteiner'>
              <div
                className={`type-pronuncia-button ${item.tipo === "IPA" ? "selected" : ""}`}
                onClick={() => updateTipo(idx, "IPA")}
              >
                <p>IPA</p>
              </div>

              <div
                className={`type-pronuncia-button ${item.tipo === "X-S" ? "selected" : ""}`}
                onClick={() => updateTipo(idx, "X-S")}
              >
                <p>X-S</p>
              </div>

              <div className='remove-pronuncia-button' onClick={() => removeRow(idx)}>
                <MdCancel />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className={voiceName ? "genera-button" : "genera-button-non-disponibile"}
        onClick={handleSynthesize}
      >
        {voiceName ? "Genera con voce " + voiceName : "Seleziona Una Voce"}
      </button>

      <audio className='player-audio-generato' controls src={audioSrc} />
    </div>
  );
}

export default Textsection;
