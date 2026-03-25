import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FullTeam, FullTeamUpdated } from '../../types';
import { TeamsAPI } from '../../services/api';
import { useDisclosure } from '@mantine/hooks';

interface useFullTeamReturn {
  team: FullTeam;
  isUpdate: boolean;
  open: () => void;
  updatedTeam: FullTeamUpdated;
  setUpdatedTeam: React.Dispatch<React.SetStateAction<FullTeamUpdated>>;
  error: String;
  handleSave: () => Promise<void>;
  handleAddMembers: (userIds: string[]) => Promise<void>;
  handleAddProjects: (projectIds: string[]) => Promise<void>;
}

export const useFullTeam = (): useFullTeamReturn => {
  const { teamId } = useParams<{ teamId: string }>();
  const [team, setTeam] = useState<FullTeam>();
  const [isUpdate, { open, close }] = useDisclosure(false);
  const [updatedTeam, setUpdatedTeam] = useState<FullTeamUpdated>();
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    const getTeam = async (): Promise<void> => {
      const teamData = (await TeamsAPI.getTeam(teamId)).data;
      setTeam(teamData);
      setUpdatedTeam({ name: teamData.name, description: teamData.description });
    };

    getTeam();
  }, [teamId]);

  // Обработчик сохранения
  const handleSave = async (): Promise<void> => {
    try {
      await TeamsAPI.updateTeam(teamId, updatedTeam);

      // Обновляем локальное состояние
      if (team) {
        setTeam({
          ...team,
          name: updatedTeam.name,
          description: updatedTeam.description,
        });
      }

      close(); // Закрываем режим редактирования
    } catch (error) {
      setError('Ошибка при обновлении:' + String(error));
    }
  };

  const handleAddMembers = async (userIds: string[]): Promise<void> => {
    try {
      const response = await TeamsAPI.addMembers(teamId, userIds);
      const members = response.data.members;

      if (team) {
        setTeam({
          ...team,
          members: members,
        });
      }
    } catch (error) {
      setError('Ошибка при добавлении участников:' + String(error));
    }
  };

  const handleAddProjects = async (projectIds: string[]): Promise<void> => {
    try {
      if (!team) return;

      // Вызов API для добавления проектов в команду
      const response = await TeamsAPI.addProjects(teamId, projectIds);

      // Обновляем локальное состояние
      setTeam({
        ...team,
        projects: response.data.projects,
      });
    } catch (error) {
      setError('Ошибка при добавлении проектов:' + String(error));
    }
  };

  return {
    team,
    isUpdate,
    open,
    updatedTeam,
    setUpdatedTeam,
    error,
    handleSave,
    handleAddMembers,
    handleAddProjects,
  };
};
