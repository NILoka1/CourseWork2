import { Flex, Grid, Paper, Stack, Text } from '@mantine/core';
import { JSX } from 'react';

export const FullProjectTeams = ({ project }): JSX.Element => {
  return (
    <Grid.Col span={6}>
      <Paper bg={'gray.5'} p={'md'}>
        <Stack>
          <Text fw={500}>Команды:</Text>
          <Flex wrap={'wrap'} gap="sm">
            {project?.teams?.map((team) => (
              <Paper key={team.id} p={'sm'} bg={'gray.3'}>
                <Text fw={500}>{team.name}</Text>
                <Text size="sm">{team.description}</Text>
              </Paper>
            ))}
          </Flex>
        </Stack>
      </Paper>
    </Grid.Col>
  );
};
