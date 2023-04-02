import { useState } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";
import styled from "styled-components";

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

const App = (props) => {
  const [query, setQuery] = useState("");

  const onSubmit = (newQuery) => {
    setQuery(newQuery);
  };

  return (
    <StyledApp>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery query={query} />
    </StyledApp>
  );
};

export default App;
