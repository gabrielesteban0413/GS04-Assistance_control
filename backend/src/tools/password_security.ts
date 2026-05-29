import argon2 from 'argon2';
import { zxcvbnAsync, zxcvbnOptions } from '@zxcvbn-ts/core';
import { dictionary, adjacencyGraphs } from '@zxcvbn-ts/language-common';

zxcvbnOptions.setOptions({
    dictionary: {
        ...dictionary,
    },
    graphs: adjacencyGraphs,
});
export class PasswordSecurity {
    isSecure = async (password: string): Promise<boolean> => {
        const { score } = await zxcvbnAsync(password);
        return score >= 3;
    };
    hash = async (password: string): Promise<string> => {
        return await argon2.hash(password, {
            type: argon2.argon2id,
            // 19MB
            memoryCost: 19_456,
            timeCost: 2,
            parallelism: 1,
        });
    };
    verify = async (password: string, hash: string): Promise<boolean> => {
        return await argon2.verify(hash, password);
    };
}

export const passwordSecurityTool = new PasswordSecurity();