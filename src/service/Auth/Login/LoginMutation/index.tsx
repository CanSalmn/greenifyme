import { useMutation, useQueryClient } from '@tanstack/react-query'

import { login } from '../'
import { useNavigation } from '@react-navigation/native'

export function useLogin() {
    const queryClient = useQueryClient()
    const navigation = useNavigation()
    return useMutation({
        mutationFn: login,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['login'] })
            if (data) {
                navigation.reset({
                    index: 1,
                    routes: [
                        { name: 'Login' as never },

                    ],
                })
                navigation.navigate('DashBoard' as never)

            } else {
            }
        },
        onError: (error) => {
            console.log('Ops.. Error on sign in. Try again!', error);
        }
    })
}
