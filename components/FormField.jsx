import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'

const FormField = ({ title, placeholder, value, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View className={`gap-2 ${otherStyles}`} {...props}>
      <Text className='text-base text-gray-100 font-pmedium'>
        {title}
      </Text>
      <View
        className='focus:border-secondary border-black w-full px-2 bg-black-100 flex-row items-center'
        style={{
          height: 56,
          backgroundColor: '#1e1b2e',
          borderRadius: 8,
          borderWidth: 2,
          borderColor: isFocused ? '#FF9001' : '#322D4D',
        }}
			>
        <TextInput 
          className='text-white focus:text-white flex-1 font-psemibold pt-3 pb-2' 
          value={value}
          placeholder={placeholder}
          placeholderTextColor={'#7b7b8b'}
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword ? true : false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          />
        {title === 'Password' && (
          <TouchableOpacity
            className='text-white font-psemibold mr-2'
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              resizeMode='contain'
              className='w-6 h-6'
            />
          </TouchableOpacity>
        )}
        </View>
    </View>
  )
}

export default FormField
