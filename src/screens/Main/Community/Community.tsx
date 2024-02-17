import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Community() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
  }}>
      <Text>Community</Text>
    </View>
  )
}