export class WebObject
{
    #_disposed;
    /**
     * 
     * @param {string} name 
     */
    constructor(name)
    {
        this.name = name;
    }
    IsDisposed()
    {
        return this.#_disposed;
    }
    Dispose()
    {
        this.#_disposed = true;
    }
}