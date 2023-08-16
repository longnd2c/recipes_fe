import React, { useEffect, useState } from 'react'
import RecipeModel from '../../models/Recipe'
import SearchInput from '../SearchInput'
import LabelButton from '../LabelButton'
import CardInfo from '../CardInfo'
import Button from '../Button'
import {
  useSearchParams,
} from 'react-router-dom';
import { BeatLoader} from "react-spinners";
import noData from "../../no-data.png"

export default function Home({isMobile, isTablet}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [valueSearch, setValueSearch] = useState(searchParams.get('s'))
  const [categoriesSelected, setCategoriesSelected] = useState(searchParams.getAll("c") || []);
  const [page, setPage] = useState(1);
  const [listRecipes, setListRecipes] = useState([])
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [listCat, setListCat] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const cssLoading = {
    position: "absolute",
    textAlign: "center",
    left: "0",
    right: "0",
    marginLeft: "auto",
    marginRight: "auto",
    top: "50%"
  };

  const onSearch = (e) => {
    e.preventDefault();
    if(!valueSearch) setSearchParams({c: categoriesSelected})
    else setSearchParams({s: valueSearch, c: categoriesSelected});
    setPage(1)
  };

  const onChooseCat = (catName) => {
    if(categoriesSelected.includes(catName)){
      if(!valueSearch) setSearchParams({c: [...categoriesSelected.filter((e) => e!== catName)]})
      else setSearchParams({s: valueSearch, c: [...categoriesSelected.filter((e) => e!== catName)]});
      setCategoriesSelected([...categoriesSelected.filter((e) => e!= catName)])
    } 
    else {
      if(!valueSearch) setSearchParams({c: [...categoriesSelected, catName]});
      else setSearchParams({s: valueSearch, c: [...categoriesSelected, catName]});
      setCategoriesSelected([...categoriesSelected, catName])
    }
    setPage(1)
  }

  const getCategoryList = async() =>{
    const res = await RecipeModel.getAllCategory()
    setListCat(res.data)
  }

  const getRecipeList = async(fromLoadMore) =>{
    setIsLoading(true)
    let tempCat = []
    if(categoriesSelected){
      if(listCat.length==0){
        const res = await RecipeModel.getAllCategory()
        categoriesSelected.map((item) => {
          tempCat.push(res.data.filter((e) => e.name === item)[0]?.id)
        })
      }
      else{
        categoriesSelected.map((item) => {
          tempCat.push(listCat.filter((e) => e.name === item)[0]?.id)
        })
      }
    }
    const params = {
      s: searchParams.get('s'),
      c: tempCat,
      page: page
    }
    const res = await RecipeModel.getReceipeList(params)
    if(!fromLoadMore) setListRecipes(res.data)
    else setListRecipes([...listRecipes,...res.data])
    setIsLoadMore(res.isMore)
    setPage(page+1)
    setIsLoading(false)
  }

  useEffect(() => {
    getCategoryList()
  }, []);

  useEffect(() => {
    getRecipeList()
  }, [searchParams, categoriesSelected]);

  return ( 
    <>
      <div className='flex justify-center'>
          <SearchInput 
              placeHolder="What are you looking for?"
              value={valueSearch}
              onChange={(e) => setValueSearch(e.target.value)}
              onSearch={onSearch}
          />
      </div>
      <div className='flex justify-center flex-wrap' style={{marginTop: "-24px"}}>
        {listCat.map((item) => (
          <LabelButton name={item.name} onClick={() => onChooseCat(item.name)} isSelected={categoriesSelected.includes(item.name)}/>
        ))}
      </div>
      <div className={isMobile? 'place-items-center grid grid-cols-1': isTablet? 'place-items-center grid grid-cols-2' : 'place-items-center grid grid-cols-3'}>
        {
          listRecipes.map((item) => (
            <CardInfo recipeInfo={item} />
          ))
        }
      </div>
      {listRecipes.length === 0 && (
        <div className='flex flex-col items-center justify-center mt-11'>
          <img src={noData} style={{width: "500px"}}></img>
          <div style={{marginTop: "-50px", fontStyle: "italic"}}>No recipe found with search condition!</div>
        </div>
      )}
      <BeatLoader
        color={"#ff6347"}
        cssOverride={cssLoading}
        loading={isLoading}
        size={20}
      />
      {isLoadMore && (<div className='flex justify-center'><Button title="Show more" onClick={() => getRecipeList(true)}/></div>)}
      <div className='h-12'></div>
    </>
  )
}
