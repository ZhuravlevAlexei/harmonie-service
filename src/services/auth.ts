import bcrypt from 'bcrypt';

import { UsersCollection } from 'db/models/user';

interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (payload: RegisterUserPayload) => {
  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};
