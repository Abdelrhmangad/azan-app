import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomePrayerItem = ({ item, selected, pressHandler, playAudio, index }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                pressHandler();
                playAudio(item.audio)
            }}
            activeOpacity={0.6}
        >
            <View className={`flex-row items-center mb-2 p-4 ${selected ? 'bg-green-100/40 border border-green-200 rounded-lg' : 'bg-transparent'}`}>
                <MaterialCommunityIcons
                    name={item.icon}
                    size={24}
                    color="#A8A8C7"
                />
                <View className="ml-4 flex-row items-center justify-between flex-1">
                    <Text className="text-lg font-psemibold text-[#E6E6EF]">{item.name}</Text>
                    <MaterialCommunityIcons
                        name={item.audioDisabled ? 'volume-low' : 'volume-high'}
                        size={18}
                        color={item.audioDisabled ? 'gray' : `#59D98E`}
                        className='me-auto ms-2'
                    />
                    <Text className="text-lg font-pmedium text-[#E6E6EF]">{item.time}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default HomePrayerItem