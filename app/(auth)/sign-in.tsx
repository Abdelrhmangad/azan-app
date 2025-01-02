import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { signIn, signOut } from '@/lib/appWrite'

const SignIn = () => {
    const [form, setForm] = React.useState({
        email: '',
        password: '',
    })

    const [isSubmitting, setIsSubmitting] = React.useState(false)

    async function submit() {
        setIsSubmitting(true)
        if (!form.email || !form.password) {
            setIsSubmitting(false)
            Alert.alert('Error', 'Please fill all fields')
            return
        }
        try {
            const result = await signIn(form.email, form.password)
            // set to global store
            router.replace('/home')
        } catch (error: any) {
            setIsSubmitting(false)
            Alert.alert('Error', error.message)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full flex justify-center h-[95vh] px-5 my-6">
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        className="w-[115px] h-[34px]"
                    />
                    <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
                        Log in to Aora!
                    </Text>
                    <FormField
                        title='Email'
                        value={form.email}
                        handleChangeText={(text: string) => setForm({ ...form, email: text })}
                        otherStyles='mt-7'
                        keyboardType='email-address'
                        placeholder={"Enter your email"}
                    />

                    <FormField
                        title='Password'
                        value={form.password}
                        handleChangeText={(text: string) => setForm({ ...form, password: text })}
                        otherStyles='mt-7'
                        placeholder={"Enter your password"}
                    />
                    <CustomButton
                        title='Sign in'
                        containerStyles='mt-7 w-full ms-0'
                        handlePress={submit}
                        textStyles='text-primary'
                        isLoading={isSubmitting}
                    />
                    {/* <CustomButton
                        title='Log out'
                        containerStyles='mt-7 w-full ms-0'
                        handlePress={signOut}
                        textStyles='text-primary'
                        isLoading={isSubmitting}
                    /> */}
                    <View className='justify-center items-center pt-6 flex-row gap-2'>
                        <Text className="text-gray-100 font-pregular text-lg text-center">
                            Don't have an account?{' '}
                        </Text>
                        <Link href={"/sign-up"} className="font-psemibold text-lg text-secondary">Sign up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn

const styles = StyleSheet.create({})