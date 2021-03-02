import { ChangeProfileGroup } from './interfaces';
import { Profile } from '../../../interfaces/profile';

export const getProfile = (data: ChangeProfileGroup | undefined): Profile => {
  return {
    first_name: data?.userName.value || '',
    second_name: data?.surname.value || '',
    display_name: data?.nameInChat.value || '',
    login: data?.login.value || '',
    email: data?.mail.value || '',
    phone: data?.phone.value || ''
  };
};
