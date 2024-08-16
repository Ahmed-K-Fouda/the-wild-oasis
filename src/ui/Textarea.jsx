import styled from "styled-components";

const Textarea = styled.textarea`
  width: auto;
  height: auto;
  resize: none;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  font-family: Arial, sans-serif;
  height: ${(props) => (props.rows ? `${props.rows}` : "100px")};
  width: ${(props) => (props.cols ? `${props.cols}` : "100px")};
`;

export default Textarea;
