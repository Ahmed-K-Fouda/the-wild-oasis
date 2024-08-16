import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
       {
        font-size: 30px;
        font-weight: 600;
      }
    `};

  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: 24px;
    `}

  ${(props) =>
    props.type === "h3" &&
    css`
      font-size: 16px;
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      text-align: center;
    `}
`;

export default Heading;
