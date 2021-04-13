import React, { Component,useState,useContext } from 'react';
import { fooddata }  from '../nutritions'
import Select from 'react-select';
import { UserContext } from './UserContext';
import { MenuContext } from './MenuContext';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GetAppIcon from '@material-ui/icons/GetApp';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

export default function SearchInput(props){
    var foodContext = useContext(UserContext)
    var ClientMenuContext = useContext(MenuContext)
    const [gramsZero,setGramsZero] = useState(false)
  
    const promiseOptions = (inputValue) => 
      new Promise(resolve => {
          setTimeout(() => {
            resolve(filterfoods(inputValue));
          }, 1000);
    });

    const filterfoods = (inputValue) =>
    {
    try{
      var names = fooddata.filter((each) => each.label.startsWith(inputValue))
    }catch(e){
      console.log(e)
    }
    return names;
    }



  const [food,Setfood] = useState({
    value : 15,
    label : 'none'
  })

  const { push } = useHistory();

  function handleChange(e){
    props.ShowValuesToFalse();
    try{
      if(e.val != null){
        foodContext[1]((prev) => {
          console.log("Value Food IS:" ,foodContext[0])
          return {...prev,value : e.val,Foodname : e.label}
        })
        props.GetRequest(e.val,e.label)
      }
    }catch(e){
      console.log(e)
      }
    }

    
      return ( <div><Select
      className="basic-single"
      classNamePrefix="select"
      isClearable={true}
      name="select"
      onChange={handleChange}
      options={fooddata}
      />
    
      <div className="Searchinput-Buttons">
        {props.ShowValues ? <Button variant="contained" style={{background: '#BE7052' ,color : 'white'}} onClick={() => props.AddFood(foodContext[0].Foodname)}>
          <AddCircleIcon/>הוסף לתפריט
        </Button> : ""}&nbsp;&nbsp;        
      
        {gramsZero ? <h3>לא ניתן למצוא מוצר לפי 0 גרם</h3> : null}
        <Button style={{background: '#BE7052' ,color : 'white'}} variant="contained" onClick={() => {
            if(!foodContext[0].Grams || foodContext[0].Grams == 0){
              setGramsZero(true)
            }
            else{
              props.CalculatePerGrams()
              setGramsZero(false)
            }
            console.log(ClientMenuContext[0])
            }}>
              <GetAppIcon/>הצג את הערכים התזונתיים
        </Button>&nbsp;&nbsp;
        
        <Button variant="contained" color="primary" onClick={() => push("/Check")}>
          <PictureAsPdfIcon/>שמור כקובץ PDF
        </Button>
        </div>
      
    </div>

    );
    }

