import React from 'react';
import styled from 'styled-components';
import { color3, fontSize2, fontColorBlack } from '../Shared/Styles';

const HeadlineStyled = styled.div`
    display: flex;
    border: 1px solid ${color3};
    margin: 10px 0;
    border-radius: 10px;

    @media (max-width: 768px) {
        flex-direction: column;
      }
`;

const HeadlineTextStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const HeadlineTextItemStyled = styled.div`
    padding: 5px;
    margin-bottom: 10px;
`;

const HeadlineTitleStyled = styled(HeadlineTextItemStyled)`
    font-size: 1.3em;
`;

const ImageDivStyled = styled.div`
      display: flex;
      align-items: center;      
      margin-right: 10px;
      width: 250px;
`;

const ResponsiveImage = styled.img`
    width: 100%;
    max-width: 200px;    
    height: auto;
    padding: 5px;
    border-radius: 10px;
`;

const LinkStyled = styled.a`
      text-decoration: none;
     ${fontColorBlack}
     &:hover {
         text-decoration: underline
     }
`;

export default ({headline}) => (
    <HeadlineStyled> 
        <ImageDivStyled>
            <ResponsiveImage src={headline.urlToImage || "/images/no-image.jpg"} />
        </ImageDivStyled>    
        <HeadlineTextStyled>                  
            <HeadlineTitleStyled><LinkStyled href={headline.url}>{headline.title}</LinkStyled></HeadlineTitleStyled>
            <HeadlineTextItemStyled>{headline.description}</HeadlineTextItemStyled>
        </HeadlineTextStyled> 
       
    </HeadlineStyled>
);