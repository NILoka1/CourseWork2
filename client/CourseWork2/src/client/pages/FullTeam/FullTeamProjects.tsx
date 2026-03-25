import { Flex, Grid, Group, Paper, Stack, Text } from '@mantine/core';
import { AddProjectsModal } from '../../components/modal/AddProjects';

export const FullTeamProjects = ({ team, handleAddProjects }) => {
  return (
    <Grid.Col span={6}>
      <Paper bg={'gray.5'} p={'md'}>
        <Stack>
          <Group justify="space-between">
            <Text>Проекты:</Text>
            <AddProjectsModal
              onProjectsAdd={handleAddProjects}
              existingProjects={team?.projects.map((project) => project.id) || []}
            />
          </Group>
          <Flex gap={'3px'} wrap={'wrap'}>
            {team?.projects.map((project) => (
              <Paper key={project.id} p={'3px'} bg={'gray.3'}>
                <Text>{project.name}</Text>
                <Text>{project.description}</Text>
              </Paper>
            ))}
          </Flex>
        </Stack>
      </Paper>
    </Grid.Col>
  );
};
