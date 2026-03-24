import { Flex, Grid, Paper, Stack, Text } from '@mantine/core';
import { JSX } from 'react';

export const FullProjectTasks = ({ project }): JSX.Element => {
  return (
    <Grid.Col span={6}>
      <Paper bg={'gray.5'} p={'md'}>
        <Stack>
          <Text fw={500}>Задачи:</Text>
          <Flex gap={'sm'} wrap={'wrap'}>
            {project?.tasks?.map((task) => (
              <Paper key={task.id} p={'sm'} bg={'gray.3'}>
                <Text fw={500}>{task.title}</Text>
                <Text size="sm">Статус: {task.status}</Text>
                <Text size="sm">Приоритет: {task.priority}</Text>
              </Paper>
            ))}
          </Flex>
        </Stack>
      </Paper>
    </Grid.Col>
  );
};
