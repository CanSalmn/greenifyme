import { useMutation, useQueryClient } from '@tanstack/react-query'

import { register } from '../'
import { useNavigation } from '@react-navigation/native'

export function useRegister() {
    const queryClient = useQueryClient()
    const navigation = useNavigation()
    return useMutation({
        mutationFn: register,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['register'] })
            if (data) {
                navigation.reset({
                    index: 1,
                    routes: [
                        { name: 'Register' as never },

                    ],
                })
                navigation.navigate('Login' as never)

            } else {
            }
        },
        onError: (error) => {
            console.log('Ops.. Error on sign in. Try again!', error);
        }
    })
}
