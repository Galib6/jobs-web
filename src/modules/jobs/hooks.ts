import {
  MutationConfig,
  queryClient,
  QueryConfig,
} from "@/configs/react-query/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IJobFilter } from "./interface";
import { JobService } from "./services";

//---------------- useJobs hook ------------------------------------
type IUseJobs = {
  options: IJobFilter;
  config?: QueryConfig<typeof JobService.find>;
};
export const useJobs = ({ options, config }: IUseJobs) => {
  return useQuery({
    ...config,
    queryKey: [JobService.NAME, options],
    queryFn: () => JobService.find(options),
  });
};

//----------------------- useJob hook --------------------------------------
type IUseJob = {
  id: string;
  config?: QueryConfig<typeof JobService.findById>;
};

export const useJob = ({ id, config }: IUseJob) => {
  return useQuery({
    ...config,
    queryKey: [JobService.NAME, id], // Ensure queryKey is always defined
    queryFn: () => JobService.findById(id),
  });
};

//------------------ useCreateJob hook ---------------------------------
type IUseCreateJob = {
  config?: MutationConfig<typeof JobService.create>;
};

export const useCreateJob = ({ config }: IUseCreateJob) => {
  return useMutation({
    ...config,
    mutationFn: (payload) => JobService.create(payload),
    onSettled: (data) => {
      if (!data?.success) return;
      queryClient.invalidateQueries({ queryKey: [JobService.NAME] });
    },
  });
};

//------------------ useUpdateJob hook ----------------------------------
type IUseUpdateJob = {
  config?: MutationConfig<typeof JobService.update>;
};

export const useUpdateJob = ({ config }: IUseUpdateJob) => {
  return useMutation({
    ...config,
    mutationFn: (payload) => JobService.update(payload),
    onSettled: (data) => {
      if (!data?.success) return;
      queryClient.invalidateQueries({ queryKey: [JobService.NAME] });
      toast.success(data?.message);
    },
  });
};

//------------------ useDeleteJob hook ----------------------------------
type IUseDeleteJob = {
  config?: MutationConfig<typeof JobService.delete>;
};

export const useDeleteJob = ({ config }: IUseDeleteJob) => {
  return useMutation({
    ...config,
    mutationFn: (payload) => JobService.delete(payload),
    onSettled: (data) => {
      if (!data?.success) return;
      queryClient.invalidateQueries({ queryKey: [JobService.NAME] });
      toast.success("Successfully deleted");
    },
  });
};
