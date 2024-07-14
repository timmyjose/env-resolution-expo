import { StyleSheet, View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../App'

const Main = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>()

  return (
    <View style={styles.container}>
      <Button title='Env Demo' onPress={() => navigation.navigate('EnvDemo')} />
      <Button title='Sentry Demo' onPress={() => navigation.navigate('SentryDemo')} />
    </View>
  )
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Main
