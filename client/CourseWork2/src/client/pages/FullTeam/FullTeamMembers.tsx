import { Flex, Grid, Group, Paper, Stack, Text } from '@mantine/core';

import { AddMembers } from '../../components/modal/AddMembers';

export const FullTeamMembers = ({ team, handleAddMembers }) => {
  return (
    <Grid.Col span={6}>
      <Paper bg={'gray.5'} p={'md'}>
        <Stack>
          <Group>
            <Text>Участники:</Text>
            <AddMembers
              onMembersAdd={handleAddMembers}
              existingMembers={team?.members.map((member) => member.id) || []}
            />
          </Group>
          <Flex gap={'3px'} wrap={'wrap'}>
            {team?.members.map((member) => (
              <Paper key={member.id} p={'3px'} bg={'gray.3'}>
                <Text>{member.name}</Text>
                <Text>{member.email}</Text>
              </Paper>
            ))}
          </Flex>
        </Stack>
      </Paper>
    </Grid.Col>
  );
};
