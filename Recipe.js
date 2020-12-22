import React,{useState,useEffect} from 'react'
import './Recipe.css'
import Dishes from './dishes';

const Recipe=()=>{
    const App_Id='9d0324f5';
    const App_Key='beaad9aca9f6f46bc661be5991004523';
    const [recipes,setRecipes]=useState([]);

    const [search,setSearch]=useState('');

    const [query,setQuery]=useState('chicken');

    useEffect(()=>{
        getRecipe();

    },[query]);

    const getRecipe=async ()=>{
        const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_Id}&app_key=${App_Key}`);
        const data= await response.json();
        setRecipes(data.hits);
        console.log(data.hits);
    };

    const handleChange=e=>{
        setSearch(e.target.value);
        console.log(search);
    }

    const getSearch=e=>{
        e.preventDefault();
        setQuery(search);
        setSearch('');
    }
    return(
        <div className='first'>
            <form className='second' onSubmit={getSearch}>
                <input className='third' type='text' onChange={handleChange}/>
                <button className='fourth' type='submit'>Search</button>
            </form>
            <div className='alanOP'>
            {recipes.map(recipe=>(
                <Dishes
                key={recipe.recipe.label}
                title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
                />
            ))}
            </div>
            </div>
    )
}
export default Recipe