import React, { useEffect, useState } from "react";

const Meal = () => {
    const [input, setinput] = useState("")
    const btn =["Indian","American","chinese","canadian","British","russian"]
    const [mealData, setMealData] = useState([])   
    const [area, setarea] = useState("indian") 
  useEffect(() => {
    async function fetchData() {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      );
      const data = await api.json()
      setMealData(data.meals)
      console.log(data)
    };
    fetchData();
  }, [area]);


   const changInput = async (e)=>{
    e.preventDefault();
    const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
      );
      const data = await api.json()
      setMealData(data.meals)
   }

  return(
    <>
    <div className="btn_container">
        {
            btn.map((e,idx)=>(
                <button key={idx} onClick={()=>setarea(e)}>{e}</button>
            ))
        }
    </div>
    <div className="input_con">
        <form onSubmit={changInput}>
        <input onChange={(ev)=>{setinput(ev.target.value)}}  type="search" placeholder="Search Meal"/>
    
        </form>
    </div>
     <div style={{display:"flex",flexWrap:"wrap",gap:"30px"}} className="content">
        {
            mealData.map((data)=>(
                <div key={data.idMeal} style={{textAlign:"center",}}>
                   <div>
                    <img src={data.strMealThumb} alt="atul" style={{width:"240px" , border:"2px solid yellow",borderRadius:"8px"}}/>
                   </div>
                   <h4 style={{width:"90%"}}>{data.strMeal}</h4>
                </div>
        ))
        }
     </div>
    </>
  );
  };

export default Meal;
