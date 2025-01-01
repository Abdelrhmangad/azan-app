import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({ title, containerStyles, handlePress, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      className={`bg-secondary rounded-xl min-h-[62px] flex items-center justify-center mx-10 ${containerStyles} ${isLoading
				? 'opacity-50'
				: ''}`}
      onPress={handlePress}
      disabled={isLoading}
      activeOpacity={0.7}
		>
      <Text className={`text-primary font-semibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
