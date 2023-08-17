import React from 'react'
import './styles/CardInfo.css';
import { AiOutlineClockCircle, AiOutlineEye, AiOutlineStar } from "react-icons/ai";
import { Link } from 'react-router-dom';

export default function CardInfo({recipeInfo}) {
  const totalTimeRep = recipeInfo.totalTime.replace(" hr ", "h").replace(" min", "m")
  return (
    <Link to={`/recipe/${recipeInfo.slug}`} className="card">
        <div className="card-image" style={{background: `url("${recipeInfo.img}")`}}></div>
        <div className="card-text">
        <h2>{recipeInfo.title}</h2>
        </div>
        <div className="card-stats">
        <div className="stat">
            <AiOutlineClockCircle className="icon-des"/>
            <div className="value">{totalTimeRep}</div>
        </div>
        <div className="stat stat-border">
            <AiOutlineEye className="icon-des"/>
            <div className="value">{recipeInfo.review}</div>
        </div>
        <div className="stat">
            <AiOutlineStar className="icon-des"/>
            <div className="value">{recipeInfo.star}</div>
        </div>
        </div>
    </Link>
  )
}
