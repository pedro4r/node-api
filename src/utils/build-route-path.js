// /users/:id

//Regex é uma expressão regular, uma forma de encontrar textos que seguem
//formatos específicos dentro de um texto que é muito maior
export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<id>[a-z0-9\-_]+)')
    const pathRegex = new RegExp(`^${pathWithParams}`)
    return pathRegex
}