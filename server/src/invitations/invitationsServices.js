const authQueries = require('../auth/authQueries');
const invitationsQueries = require('./invitationsQueries');
const teamQueries = require('../team/teamQueries');
const { addPlayerToTeam } = require('../team/teamServices');

const invitePlayerToTeam = async (knex, { username, teamId }) => {
  const playerData = await authQueries.getUserByUsernameOrEmail(knex, username);

  if (!playerData) {
    const error = new Error('Player could not be found.');
    error.name = 'PlayerNotFound';
    throw error;
  }

  const playerIsInTeam = await teamQueries.getTeamRoster(knex, {
    teamId,
    playerId: playerData.id
  });

  if (playerIsInTeam) {
    const error = new Error(`${username} is already in the team.`);
    error.name = 'ExistingInvitation';
    throw error;
  }

  const existingInvitation = await invitationsQueries.getInvitationByPlayerAndTeam(
    knex,
    { playerId: playerData.id, teamId, state: 'pending' }
  );

  if (existingInvitation) {
    const error = new Error(
      `${username} has already been invited to the team.`
    );
    error.name = 'ExistingInvitation';
    throw error;
  }

  const invitationId = await invitationsQueries.insertInvitation(knex, {
    playerId: playerData.id,
    teamId,
    origin: 'team'
  });

  if (!invitationId) {
    throw new Error('Invitation failed.');
  }

  const invitationData = await invitationsQueries.getInvitationById(
    knex,
    invitationId
  );

  return invitationData;
};

const updateInvitationState = async (knex, { id, playerId, state }) => {
  const updatedInvitationData = await knex.transaction(async trx => {
    const invitationData = await invitationsQueries.getInvitationById(trx, id);

    if (invitationData.playerId !== playerId) {
      const error = new Error('The invitation does not belong to the user.');
      error.name = 'ForbiddenInvitation';
      throw error;
    }

    if (invitationData.state !== 'pending') {
      const error = new Error('The invitation has already been updated.');
      error.name = 'InvitationAlreadyUpdated';
      throw error;
    }

    await invitationsQueries.updateInvitationState(trx, {
      id,
      state
    });

    const updatedInvitationData = await invitationsQueries.getInvitationById(
      trx,
      id
    );

    if (updatedInvitationData.state === 'accepted') {
      await addPlayerToTeam(trx, {
        playerId: updatedInvitationData.playerId,
        teamId: updatedInvitationData.teamId
      });
    }

    return updatedInvitationData;
  });

  return updatedInvitationData;
};

module.exports = { invitePlayerToTeam, updateInvitationState };
