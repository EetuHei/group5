import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Link,
  useRouteMatch,
  Switch,
  Route
} from 'react-router-dom';
import ListTeams from '../ListTeams';

const StyledText = styled.p`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin-bottom: 7px;
  height: 25px;
  background: #7de88c;
  border: none;
  color: #fff;
  font-family: Roboto, sans-serif;
  font-weight: 650;
  text-transform: uppercase;
  transition: 0.1s ease;
  cursor: pointer;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  text-align: center;
  margin-left: 1%;
  margin-right: 1%;
  margin-top: 1%;
  &:hover,
  &:focus {
    opacity: 0.8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    transition: 0.1s ease;
  }
  &:active {
    opacity: 1;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    transition: 0.1s ease;
  }
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 150px;
    height: auto;
    align-items: center;
  }
`;

const Styled = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    margin: 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Buttons = props => {
  const { teamStore } = props.rootStore;
  const { url } = useRouteMatch();

  const getTeamData = async () => {
    await teamStore.getTeamsDataByGameId();
  };

  return (
    <Styled>
      <StyledText>Play </StyledText>
      <StyledLink to={`${url}/teams`} onClick={getTeamData}>
        <StyledText>Search Teams</StyledText>
      </StyledLink>
    </Styled>
  );
};

export default inject('rootStore')(observer(Buttons));
