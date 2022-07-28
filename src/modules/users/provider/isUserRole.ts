import { UserRole } from '../domain/models/IUser';

export function isUserRole(role: string): role is UserRole {
    return ['admin', 'manager', 'standard'].indexOf(role) !== -1;
}
