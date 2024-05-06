import { useMutation, useQueryClient } from '@tanstack/react-query'
import { register } from '../'
import { useNavigation } from '@react-navigation/native'
import { useToast } from "react-native-toast-notifications";
export function useRegister() {
    const queryClient = useQueryClient()
    const navigation = useNavigation()
    const toast = useToast();
    return useMutation({
        mutationFn: register,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['register'] })
            if (data) {

                toast.show("Login Successful",
                    {
                        type: "success",
                        placement: "top",
                        duration: 4000,
                        animationType: "slide-in",
                    }
                );
                navigation.reset({
                    index: 1,
                    routes: [
                        { name: 'Register' as never },

                    ],
                })
                navigation.navigate('Login' as never)

            } else {
                toast.show("Register Failed",
                    {
                        type: "danger",
                        placement: "top",
                        duration: 4000,
                        animationType: "slide-in",
                    }
                );
            }
        },
        onError: (error) => {
            console.log('Ops.. Error on sign in. Try again!', error);
            toast.show("Register Failed",
                {
                    type: "danger",
                    placement: "top",
                    duration: 4000,
                    animationType: "slide-in",
                }
            );
        }
    })
}
