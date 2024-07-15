import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Sentry from '@sentry/react-native'
import { SENTRY_DSN } from './config/constants'
import Main from './components/Main'
import EnvDemo from './components/EnvDemo'
import SentryDemo from './components/SentryDemo'
import { getVersion, getBuildNumber} from 'react-native-device-info'

Sentry.init({
  dsn: SENTRY_DSN,
  debug: true,
  enabled: true,
  enableNativeCrashHandling: true,
  release: `${getVersion()} (${getBuildNumber()})}`,
  dist: getBuildNumber(),
  integrations: [
    new Sentry.ReactNativeTracing({
      enableAppStartTracking: false
    })
  ]
})

export type RootStackParamsList = {
  Main: undefined
  EnvDemo: undefined
  SentryDemo: undefined
}

const Stack = createNativeStackNavigator<RootStackParamsList>()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={Main} />
        <Stack.Screen name='EnvDemo' component={EnvDemo} />
        <Stack.Screen name='SentryDemo' component={SentryDemo} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Sentry.wrap(App)