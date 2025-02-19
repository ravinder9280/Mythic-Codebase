import { useQueryClient } from "@tanstack/react-query"


const useRefatch=()=>{
    const queryClient=useQueryClient()
    return async ()=>{
        await queryClient.refetchQueries({
            type:'active'
        })
    }
}
export default useRefatch