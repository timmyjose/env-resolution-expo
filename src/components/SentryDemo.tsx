import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../App'
import * as Sentry from '@sentry/react-native'

const SentryDemo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>()

  const [errMsg, setErrMsg] = useState<string>('default error message')

  return (
    <View style={styles.container}>
      <Button title='Go Back' onPress={() => navigation.goBack()} />
      <TextInput
        value={errMsg}
        onChangeText={text => setErrMsg(text)}
      />
      <Button title='Test Sentry (captureException)' onPress={() => Sentry.captureException(new Error({errMsg}))} />
      <Button title='Test Sentry (captureMessage)' onPress={() => Sentry.captureMessage({errMsg})} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SentryDemo