import { MutationConfig } from "@/configs/react-query/react-query";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "./service";

//---------------- useLogin hook ------------------------------------
type IUseLogin = {
  config?: MutationConfig<typeof AuthService.login>;
};
export const useLogin = ({ config }: IUseLogin = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.login,
    onSettled: (res: any) => {
      if (!res?.success) return;
    },
  });
};
