const routeGenerator = (path:string, RouteClass: any) => {
    const prefixRoute = 'api/v1';
    const routeObject = new RouteClass();

    return [
        `${prefixRoute}/${path}`,
        routeObject
    ]
}