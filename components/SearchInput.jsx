import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'

const SearchInput = ({ placeholder, value, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isFocused, setIsFocused] = useState(false)

  return (
      <View
        className='focus:border-secondary border-black w-full px-2 bg-black-100 flex-row items-center space-x-4'
        style={{
          height: 56,
          backgroundColor: '#1e1b2e',
          borderRadius: 8,
          borderWidth: 2,
          borderColor: isFocused ? '#FF9001' : '#322D4D',
        }}
			>
        <TextInput 
          className='text-base text-white font-pregular mt-1 flex-1' 
          value={value}
          placeholder={placeholder}
          placeholderTextColor={'#7b7b8b'}
          onChangeText={handleChangeText}
          secureTextEntry={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
		/>
		<TouchableOpacity>
			<Image 
				source={icons.search}
				className='w-5 h-5 me-2'
				resizeMode='contain'
			/>
		</TouchableOpacity>
        </View>
  )
}

export default SearchInput
