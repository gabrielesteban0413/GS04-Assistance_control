
import { v4, validate } from 'uuid';

export class Uuid {
    create = (): string => v4();
    validate = (id: string): boolean => validate(id);
}

export const uuidTool = new Uuid();