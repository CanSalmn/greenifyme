import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from '../'
import { useNavigation } from '@react-navigation/native'
import { useToast } from "react-native-toast-notifications";

export function useLogin() {
    const queryClient = useQueryClient()
    const navigation = useNavigation()
    const toast = useToast();
    return useMutation({
        mutationFn: login,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['login'] })
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
                        { name: 'Login' as never },

                    ],
                })
                navigation.navigate('DashBoard' as never)

            } else {
                toast.show("Login Failed",
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
            toast.show("Login Failed",
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
