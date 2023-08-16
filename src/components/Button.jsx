import React from 'react'
import './styles/Button.css';

export default function Button({title, onClick}) {
  return (
    <div><button class="bn632-hover bn28" onClick={onClick}>{title}</button></div>
  )
}
