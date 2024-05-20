import { useMutation, useQueryClient } from '@tanstack/react-query'
import { balance } from '../'

export function useGetBalance() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: balance,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['balance'] })
            console.log("data", data)
        },
        onError: (error) => {
            console.log('Ops.. Error on transaction. Try again!', error);

        }
    })
}
