export class Randomizer
{
    static GetInt(min, max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static GetFloat(min, max)
    {
        return Math.random() * (max - min) + min;
    }

    static PickElement(array)
    {
        if (!Array.isArray(array) || array.length === 0)
        {
            throw new Error("Array must be a non-empty array.");
        }
        return array[getRandomInt(0, array.length)];
    }

    static GetColor()
    {
        return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    }

    static GetBool()
    {
        return Math.random() < 0.5;
    }
}