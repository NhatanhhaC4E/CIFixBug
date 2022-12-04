import React from 'react';
import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import ProductData from './data';

//-----------Styled Component-----------//

const PageContainer = styled.div`
`;
const TitleInvert = styled.span`
  font-size: 55px;
  font-weight: bold;
  -webkit-text-stroke: 1px white;
  -webkit-text-fill-color:transparent;
`;
const TitleNormal = styled.span`
  font-size: 55px;
  font-weight: bold;
  color: white;
`;
const StoreContainer = styled.div`
  margin-left: -50px;
  min-width: 100vw;
  height: 100vh;
  padding: 20px;
  display: flex;
  background-color: gray;
`;
const PageName = styled.h3`
  margin-left: 50px;
`;
const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 200px;
  grid-gap: 20px;
  flex: 2;
  height: 100%;
  padding: 20px;
  justify-content: space-around;
  border: 2px solid #AED96D;
`;

const ProductBox = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 420px;
  height: 200px;
  padding: 10px;
  border: 1px solid white;
`;
const ProductWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const ImageContainer = styled.div`
  
`;
const Image = styled.img`
  border: 1px solid black;
  max-width: 120px;
  max-height: 120px;
  object-fit: cover;
`;
const Info = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 15px;
`;
const Title = styled.div`
  color: white;
  margin-bottom: 3px;
  font-size: 18px;
  font-weight: 500;
`;
const Flavor = styled.p`
  color: whitesmoke;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 400;
`;
const Price = styled.p`
  color:white;
  font-size: 18px;
  font-weight: 550;
`;
const ButtonWrap = styled.div`
  padding: 5px;
  margin-top: 10px;
  min-width: 380px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Button = styled.button`
  padding: 8px 25px;
  border: 1px solid #AED96D;
  color: white;
  background-color: #61615e;
  cursor: pointer;
  font-weight: 500;
  font-size:20px;
  &:hover {
    background-color: #AED96D;
    color: black}
`;
const CategoryContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:flex-start;
  
`;
const CategoryBox = styled.div`
  padding: 8px 25px;
  border: 1px solid #AED96D;
  color: white;
  background-color: #61615e;
  cursor: pointer;
  font-weight: 500;
  font-size:20px;
  margin-top: 10px;
`;
const ProductCount = styled.p`
  font-weight: 600;
  color: white;
`;
const CategorySelectBox = styled.div`
  padding: 8px 14px;
  border: 1px solid #AED96D;
  color: white;
  background-color: #61615e;
  font-weight: 500;
  font-size:20px;
  margin-top: 20px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const Check = styled.div``;

const ProductContainer2 = styled.ul``;

const NumberOfItem = ProductData.length
const ProductsData = ProductData
const ProductCategories = [
  "Amino Acid",
  "Pre-Workout",
  "L Carnitine",
  "Electrolytes",
  "L Argines"
]
//--------------------------------------------//
function ProductFilters(props) {
  const {categories, onFilterChange} = props;
  return (
    <section className='filters' ria-labelledby="filters-header">
      <header id='filters-header'>{"Filters"}</header>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <label>
              <input
                onChange={onFilterChange}
                type="checkbox"
                value={category}
              />
              {category}
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
function Product(props) {
  const {product} = props;
  return (
    <ProductBox key={product.id}>
      <ProductWrap>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <Info>
          <Title>{product.name}</Title>
          <Flavor>{product.flavor}</Flavor>
          <Price>${product.price}</Price>
        </Info>
      </ProductWrap>
      <ButtonWrap>
        <Button>Shop now</Button>
        <Button>Add to Cart</Button>
      </ButtonWrap>
    </ProductBox>
    
  );
}

function ProductsList(props) {
  const {products} = props;
  return (
    <ProductContainer2 className='products'>
      {products.map((product) => (
        <Product product={product} />
      ))}
    </ProductContainer2>
  );
}

//--------------------------------------------//
const IndexStore = () => {
  const [state, setState] = useState({
    products: ProductData,
    filters: new Set()
  });
  const handleFilterChange = useCallback(
    (event) => {
      setState((previousState) => {
        let filters = new Set(previousState.filters);
        let products = ProductsData;

        if (event.target.checked) {
          filters.add(event.target.value);
        } else {
          filters.delete(event.target.value);
        }
        if (filters.size) {
          products = products.filter((product) => {
            return filters.has(product.category);
          });
        }
        return {
          filters,
          products
        };
      });
    },
    [setState]
  )

    return (
      <PageContainer>
        <PageName>
          <TitleInvert>THE FIT </TitleInvert> 
          <TitleNormal>STORE</TitleNormal>
        </PageName>
        <StoreContainer>
            <CategoryContainer>
                <ProductCount>{NumberOfItem} PRODUCTS</ProductCount>
                <CategoryBox>CATEGORIES</CategoryBox>
                <CategorySelectBox>
                  <Check><ProductFilters categories={ProductCategories} onFilterChange={handleFilterChange}/></Check>
                </CategorySelectBox>
            </CategoryContainer>
            <ProductContainer>
                <ProductsList product={state.products}/>
            </ProductContainer>
        </StoreContainer>
      </PageContainer>
    )
}

export default IndexStore