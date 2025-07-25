import {
  MutationConfig,
  queryClient,
  QueryConfig,
} from "@/configs/react-query/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IApplicationFilter } from "./interface";
import { ApplicationService } from "./services";

//---------------- useApplications hook ------------------------------------
type IUseApplications = {
  options: IApplicationFilter;
  config?: QueryConfig<typeof ApplicationService.find>;
};
export const useApplications = ({ options, config }: IUseApplications) => {
  return useQuery({
    ...config,
    queryKey: [ApplicationService.NAME, options],
    queryFn: () => ApplicationService.find(options),
  });
};

//----------------------- useApplication hook --------------------------------------
type IUseApplication = {
  id: string;
  config?: QueryConfig<typeof ApplicationService.findById>;
};

export const useApplication = ({ id, config }: IUseApplication) => {
  return useQuery({
    ...config,
    queryKey: [ApplicationService.NAME, id], // Ensure queryKey is always defined
    queryFn: () => ApplicationService.findById(id),
  });
};

//------------------ useCreateApplication hook ---------------------------------
type IUseCreateApplication = {
  config?: MutationConfig<typeof ApplicationService.create>;
};

export const useCreateApplication = ({ config }: IUseCreateApplication) => {
  return useMutation({
    ...config,
    mutationFn: (payload) => ApplicationService.create(payload),
    onSettled: (data) => {
      if (!data?.success) return;
      queryClient.invalidateQueries({ queryKey: [ApplicationService.NAME] });
    },
  });
};

//------------------ useUpdateApplication hook ----------------------------------
type IUseUpdateApplication = {
  config?: MutationConfig<typeof ApplicationService.update>;
};

export const useUpdateApplication = ({ config }: IUseUpdateApplication) => {
  return useMutation({
    ...config,
    mutationFn: (payload) => ApplicationService.update(payload),
    onSettled: (data) => {
      if (!data?.success) return;
      queryClient.invalidateQueries({ queryKey: [ApplicationService.NAME] });
      toast.success(data?.message);
    },
  });
};

//------------------ useDeleteApplication hook ----------------------------------
type IUseDeleteApplication = {
  config?: MutationConfig<typeof ApplicationService.delete>;
};

export const useDeleteApplication = ({ config }: IUseDeleteApplication) => {
  return useMutation({
    ...config,
    mutationFn: (payload) => ApplicationService.delete(payload),
    onSettled: (data) => {
      if (!data?.success) return;
      queryClient.invalidateQueries({ queryKey: [ApplicationService.NAME] });
      toast.success("Successfully deleted");
    },
  });
};
