import type { User } from "./User";

export type RegisterDTO = Omit<User, "id" | "role"> & {
    confirmPassword: string;
};
