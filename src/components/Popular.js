import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';


 const Popular = () => {

        const [popular, setPopular] = useState([]);

    const getPopular = async () => {

        {/* we will be storing what we fetch into a local storage*/}

        {/* first of all check if there is something in the local storage*/}

        const check = localStorage.getItem('popular');

        if (check) {

            {/* if the check is true, which means if there is something in our local storage,
            we don't want to fetch again, but just set our state to what is there
            
        */}

            setPopular(JSON.parse(check));

        }else{

              {/* if there is nothing there , then it fetch the api and store it in a local storage
                localStorage.setItem  -- this is to set the item in local storage
                ("popular", --- the popular is the state i want to save in the local storage
                JSON.stringify(data.recipes));
            */}
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`)
             const data = await api.json();

           
             localStorage.setItem("popular", JSON.stringify(data.recipes));
             setPopular(data.recipes);

        }

        

    }

    useEffect(() => {
        
        getPopular();

    }, []);

  return (
    <div>
        <Wrapper>
            <h3>Popuplar Picks</h3>

            <Splide options={{
                 perPage:4,
                 arrows:false,
                 pagination:false,
                 drag:"free",
                 gap: "3rem"

            
            }}>
            {popular.map((recipe) => {
                return(
                    <SplideSlide key={recipe.id}>
                    <Card>
                        <Link to={'/recipe/' + recipe.id}>
                        <p>{recipe.title}</p>
                        <img src={recipe.image} alt={recipe.title} />
                        <Gradient/>
                        </Link>
                    </Card>
                    </SplideSlide>
                );
            })}
            </Splide>
        </Wrapper>
        
    </div>
  )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`


const Card = styled.div`
    min-height:15rem;
    border-radius:2rem;
    overflow:hidden;
    position:relative;

    img{
        border-radius:2rem;
        position:absolute;
        width:100%;
        height:100%;
        object-fit:cover;

    }

    p{
        position:absolute;
        z-index:10;
        left:50%;
        bottom:0%;
        transform:translate(-50%, 0%);
        color:white;
        width:100%;
        text-align:center;
        font-weight:600;
        font-size:1rem;
        height:40%;
        display:flex;
        justify-content:center;
        align-items:center;

    }
`;

const Gradient = styled.div`
    position:absolute;
    z-index:10;
    width:100%;
    height:100%;
    background:linear-gradient(rgba(0, 0 , 0, 0), rgba(0, 0 , 0, 0.5));
`;
export default Popular;