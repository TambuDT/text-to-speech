import React, { useState, useRef } from 'react';
import './voiceselector.css';
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";

const arrayVoci = [
  "Achernar", "Achird", "Algenib", "Algieba", "Alnilam", "Aoede", "Autonoe",
  "Callirrhoe", "Charon", "Despina", "Enceladus", "Erinome", "Fenrir", "Gacrux",
  "Iapetus", "Kore", "Laomedeia", "Leda", "Orus", "Puck", "Pulcherrima",
  "Rasalgethi", "Sadachbia", "Sadaltager", "Schedar", "Sulafat", "Umbriel",
  "Vindemiatrix", "Zephyr", "Zubenelgenubi"
];

export function VoiceSelector({ onVoiceChange }) {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [playingVoice, setPlayingVoice] = useState(null); // quale voce sta suonando
  const audioRefs = useRef({}); // ref per ogni audio

  const handleSelect = (voce) => {
    setSelectedVoice(voce);
    onVoiceChange?.(voce);
  };

  const handlePlayPause = (voce) => {
    const audio = audioRefs.current[voce];
    if (!audio) return;

    // ferma eventuali audio in riproduzione diversi da quello cliccato
    Object.keys(audioRefs.current).forEach((v) => {
      if (v !== voce && audioRefs.current[v]) {
        audioRefs.current[v].pause();
      }
    });

    if (playingVoice === voce) {
      audio.pause();
      setPlayingVoice(null);
    } else {
      audio.play();
      setPlayingVoice(voce);
    }
  };

  // gestisci cambio stato quando l'audio finisce
  const handleEnded = (voce) => {
    if (playingVoice === voce) {
      setPlayingVoice(null);
    }
  };

  return (
    <div className='musicpicker-container'>
      <h2 className='music-section-title'>Selezione voci</h2>
      <h4 className='music-section-subtitle'>Clicca su una voce per selezionarla</h4>
      <div className='music-list-container'>
        {arrayVoci.map((voce) => (
          <div
            key={voce}
            className={`music-item ${selectedVoice === voce ? 'selected' : ''}`}
            onClick={() => handleSelect(voce)}
          >
            <p className='music-name'>{voce}</p>

            {/* audio invisibile */}
            <audio
              ref={(el) => (audioRefs.current[voce] = el)}
              src={`https://cloud.google.com/text-to-speech/docs/audio/it-IT-Chirp3-HD-${voce}.wav`}
              onEnded={() => handleEnded(voce)}
            />

            {/* pulsante play/pause con icona */}
            <div
              className='play-pause-btn'
              onClick={(e) => {
                e.stopPropagation(); // evita di selezionare la voce quando clicchi sul pulsante
                handlePlayPause(voce);
              }}
            >
              {playingVoice === voce ? <FaPause /> : <FaPlay />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
