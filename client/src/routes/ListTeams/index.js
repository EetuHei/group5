import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Section = styled.div`
  width: 100%;
  height: 100%;
  background: #20242e;
  position: absolute;
  background-size: cover;
  background-position: top center;
  background-repeat: repeat;
  // height: 100vh;
  overflow: auto:
  font-family: Roboto, sans-serif;
`;

const MainTitle = styled.h1`
  width: 100%;
  heigth: 37px;
  cursor: pointer;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;
  text-align: center;
  color: #fff;
  display: inline-block !important;
  align-items: center;
  &:hover {
    opacity: 0.8;
    transition: 0.1s ease;
  }
  @media (max-width: 700px) {
    display: block;
    width: 100%;
    align-items: center;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 300;
  font-size: 28px;
  color: #fff;
  text-align: left;
  margin-bottom: 10px;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  font-family: Roboto, sans-serif;
  margin-top: 20px;
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-bottom: 10px;
    font-size 24px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const BlockDiv = styled.div`
  margin-bottom: 5px;
`;

const Tbody = styled.div`
  width: 30%;
  background: #32353d;
  margin-top: 10px;
  padding: 40px;
  margin-bottom: 30px;
  @media (max-width: 700px) {
    display: flex;
    font-size: 14px;
    flex-direction: column;
    align-items: left;
    padding: 15px;
    width: 80%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  widht: 100%;
  border: none;
  color: #fff;
  font-family: Roboto, sans-serif;
  font-weight: 300;
  cursor: pointer;
  padding: 0;
  margin: 10px;
  margin-bottom: 0;
`;

const Table = styled.div`
  display: flex;
  justify-content: left;
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-weight: 200;
  padding-left: 10px;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  &:hover {
    opacity: 0.5;
    transition: 0.1s ease;
  }
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const TeamData = styled.div`
  color: #fff;
  height: 15px;
  border-bottom: 1px solid;
  padding: 10px;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  @media (max-width: 700px) {
  }
`;

const ListTeams = props => {
  const { appStore, teamStore, gamesStore } = props.rootStore;

  useEffect(() => {
    if (appStore.initialized) {
      const gameSlug = props.location.pathname.split('/')[1];

      if (!gamesStore.selectedGame) {
        const game = gamesStore.games.find(game => game.name === gameSlug);
        gamesStore.selectGame(game.id);
        teamStore.getTeamsDataByGameId();
      }
    }
  }, [appStore.initialized]);

  return (
    <>
      {gamesStore.selectedGame && gamesStore.selectedGame.name ? (
        <Section>
          <MainTitle
            onClick={() => {
              props.history.push('/');
            }}
          >
            Global E-sports
          </MainTitle>
          <Container>
            <Tbody>
              <Title>
                Teams for{' '}
                {gamesStore.selectedGame && gamesStore.selectedGame.name}
              </Title>
              {teamStore.teams.map(team => (
                <StyledLink
                  to={`/${gamesStore.selectedGame.name}/teams/${team.id}`}
                >
                  <BlockDiv>
                    <Table>{team.name}</Table>
                    <TeamData>
                      Recruiting: {team.recruiting ? 'Yes' : 'No'}
                    </TeamData>
                  </BlockDiv>
                </StyledLink>
              ))}
            </Tbody>
          </Container>
        </Section>
      ) : (
        ''
      )}
    </>
  );
};

export default inject('rootStore')(observer(ListTeams));
