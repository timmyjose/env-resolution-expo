import { StyleSheet, View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../App'
import { ENV_NAME, PROP_ONE, PROP_THREE, PROP_TWO } from '../config/constants'

const EnvDemo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>()

  return (
    <View style={styles.container}>
      <Button title='Go Back' onPress={() => navigation.goBack()} />
      <Text>ENV_NAME: {ENV_NAME}</Text>
      <Text>PROP_ONE: {PROP_ONE}</Text>
      <Text>PROP_TWO: {PROP_TWO}</Text>
      <Text>PROP_THREE: {PROP_THREE}</Text>
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

export default EnvDemo
