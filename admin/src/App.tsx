import useRouteElements from './routes/useRouteElements'

const App = () => {
  const routeElements = useRouteElements()
  return <>{routeElements}</>
}

export default App
