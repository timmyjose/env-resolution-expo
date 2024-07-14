import { View, StyleSheet, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../App'
import * as Sentry from '@sentry/react-native'

const SentryDemo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>()

  const [errMsg, setErrMsg] = useState<string>('')

  return (
    <View style={styles.container}>
      <Button title='Go Back' onPress={() => navigation.goBack()} />
      <TextInput
        style={styles.input}
        placeholder='Enter error message'
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
  },
  input: {
    margin: 5,
    paddingLeft: 2,
    borderColor: 'orange',
    borderWidth: 1,
    height: 40,
    width: '70%'
  }
})

export default SentryDemo