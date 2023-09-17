const routeGenerator = (path: string, routeObject: any) => {
  const prefixRoute = '/api/v1';
  console.log(`${prefixRoute}/${path}`);
  return [`${prefixRoute}/${path}`, routeObject];
};
export default routeGenerator;
