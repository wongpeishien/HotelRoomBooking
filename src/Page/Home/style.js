import Styled from "styled-components";

const homeStyled = Styled.div`
    .hotel-booking{
        border:1px solid #e6e6e6;
        padding: 1rem;
        .row{
            border-bottom: 1px solid #e6e6e6;
            margin-bottom: 10px;
            :last-child{
                border-bottom: 0;
            }
        }
        .bedType{
            width:20%;
        }
        .breakfast{
            width: 60%;
        }
        .price{
            width: 20%;
        }
    }
`
export default homeStyled