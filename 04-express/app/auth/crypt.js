import { hash as genHash, genSalt, compare as compareValue } from "bcrypt";

export const hash = async (plainText) =>
{
    const salt = await genSalt(10);
    return await genHash(plainText, salt);
}

export const compare = async (plainText, hashedText) =>
{
    return await compareValue(plainText, hashedText);
}