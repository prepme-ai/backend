const routeGenerator = (path: string, routeObject: any) => {
  const prefixRoute = "api/v1";

  return [`${prefixRoute}/${path}`, routeObject];
};
export default routeGenerator;
