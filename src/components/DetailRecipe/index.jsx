import React, { useState, useEffect } from 'react'
import '../styles/DetailRecipe.css';
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlineMinusCircle } from 'react-icons/ai';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import LabelButton from '../LabelButton';
import RecipeModel from '../../models/Recipe'
import { Tooltip } from 'react-tooltip'

export default function DetailRecipe({isMobile, isTablet}) {
  const [recipeInfo, setRecipeInfo] = useState({})
  const [starList, setStarList] = useState([0,0,0,0])
  const slug = window.location.pathname.split("/").pop()

  const getDetailRecipe = async() => {
    const res = await RecipeModel.getReceipeDetail(slug)
    setRecipeInfo(res.data)
    //set StarList
    let starTemp = [0,0,0,0,0]
    const star = Math.round(res.data.star*2)/2
    const starInt = Math.round(star-0.1)
    const starDec = star - starInt
    if(star===0.5) setStarList([0.5,0,0,0])
    else{
      for (let i = 0; i < starInt; i++) {
        starTemp[i] = 1
      }
      if(starDec===0.5) starTemp[starTemp.lastIndexOf(1)+1] = 0.5
      setStarList(starTemp)
    }
  }
  useEffect(() => {
    getDetailRecipe()
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <div className='flex flex-row items-center cursor-pointer back-button' onClick={() => navigate(-1)}><AiOutlineLeft />Back Home</div>
      <div className="card-image-detail" style={{background: `url("${recipeInfo.img}")`, 
        height: `${isMobile? '220px' : isTablet? '450px' : '550px'}`}}></div>
      <div className='flex justify-center recipe-title'>{recipeInfo.title}</div>
      <div data-tooltip-id="star-wrapper" className='flex justify-center recipe-review items-baseline'>
        {starList.map((item) => {
          if(item===0) return (<FaRegStar className="recipe-star" />)
          else if(item===0.5) return (<FaStarHalfAlt className="recipe-star"/>)
          else return (<FaStar className="recipe-star" />)
        })}
        <span className='ml-2'>{recipeInfo.review} Reviews</span>
      </div>
      <Tooltip
        id="star-wrapper"
        place="bottom"
        content={`${recipeInfo.star} of 5 stars`}
      />
      <div className={`grid ${isMobile? 'grid-rows-3' : 'grid-cols-3'} gap-7 mt-5 mb-7`}>
          <div className='flex flex-col text-lg p-5 wrap-content'>
            <span>Level: <span className='font-semibold'>{recipeInfo.level}</span></span>
            <span>Total: <span className='font-semibold'>{recipeInfo.totalTime}</span></span>
          </div>
          <div className='flex flex-col text-lg p-5 wrap-content'>
            <span>Prep: <span className='font-semibold'>{recipeInfo.prepTime}</span></span>
            {recipeInfo.cookTime && (<span>Cook: <span className='font-semibold'>{recipeInfo.cookTime}</span></span>)}
          </div>
          <div className='flex flex-col text-lg p-5 wrap-content'>
            <span>Yield: <span className='font-semibold'>{recipeInfo.yield}</span></span>
            {/* <span>Total: <span className='font-semibold'>40min</span></span> */}
          </div>
      </div>
      <div className={`${isTablet? 'flex flex-col' : 'grid grid-cols-2'} gap-7 mt-5 mb-5`}>
          <div className='flex flex-col text-lg p-7 wrap-info'>
              <span className='text-2xl font-bold mb-3'>Ingredients</span>
              <div className='text-base'>
                  {recipeInfo?.ingredients?.map((item) => (
                    <div className='flex mt-4 mb-4 items-center'>
                        <AiOutlineMinusCircle className='mr-3 text-2xl' style={{minWidth: "24px", color: "tomato"}}/>
                        <span>{item}</span>
                    </div>
                  ))}
              </div>
          </div>
          <div className='flex flex-col text-lg p-7 wrap-info'>
            <span className='text-2xl font-bold mb-3'>Directions</span>
            <div className='text-base'>
                  {recipeInfo?.directions?.map((item) => (
                    <div className='mt-7 mb-7'>
                        <span className='direct-content'>{item}</span>
                    </div>
                  ))}
              </div>
          </div>
      </div>
      <div className={`${isTablet? 'flex flex-col' : 'grid grid-cols-2'} gap-7 mt-5 mb-11`}>
          <div></div>
          <div className='flex items-center flex-wrap'>
            <span className='font-medium'>Categories:</span>
            {recipeInfo?.categories?.map((item) => (
              <Link to={`/?c=${item.name}`}>
                <LabelButton name={item.name} isSelected={true}/>
              </Link>
            ))}
          </div>
      </div>
    </div>
  )
}
