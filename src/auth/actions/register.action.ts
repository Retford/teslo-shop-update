import { tesloAPI } from '@/api/tesloApi';
import type { AuthResponse } from '../interfaces/auth.response';

interface Props {
  fullName: string;
  email: string;
  password: string;
}

export const registerAction = async ({
  email,
  fullName,
  password,
}: Props): Promise<AuthResponse> => {
  try {
    const { data } = await tesloAPI.post<AuthResponse>('/auth/register', {
      fullName,
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
