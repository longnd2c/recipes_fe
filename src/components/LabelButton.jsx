import React from 'react'
import './styles/LabelButton.css';

export default function LabelButton({name, isSelected, onClick}) {
  return (
    <div onClick={onClick} className={isSelected? "cursor-pointer bn39-selected" : "cursor-pointer bn39"} href="/"><span class={isSelected? 'bn39span-selected' : 'bn39span' }>{name}</span></div>
  )
}
