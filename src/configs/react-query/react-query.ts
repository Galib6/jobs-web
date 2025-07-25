import {
  InfiniteData,
  QueryClient,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PromiseValue } from "type-fest";
import { $$ } from "../functions";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const makeUniqueQueryKey = (
  nameSpace: string,
  key?: string,
  ...rest: number[]
) => {
  if (key === nameSpace) return nameSpace;
  const keyArray = $$.toCleanArray([nameSpace, key, ...rest]);
  return keyArray?.join("-");
};

export type QueryConfig<FetcherFnType extends (...args: any) => any> =
  UseQueryOptions<PromiseValue<ReturnType<FetcherFnType>>>;

export type InfiniteQueryConfig<FetcherFnType extends (...args: any) => any> =
  Omit<
    UseInfiniteQueryOptions<
      PromiseValue<ReturnType<FetcherFnType>>, // TQueryFnData
      Error, // TError
      InfiniteData<PromiseValue<ReturnType<FetcherFnType>>>, // TData
      any[], // TQueryKey
      any // TPageParam
    >,
    "initialPageParam" | "getNextPageParam"
  > & {
    initialPageParam?: any;
    getNextPageParam?: (
      lastPage: PromiseValue<ReturnType<FetcherFnType>>,
      allPages: PromiseValue<ReturnType<FetcherFnType>>[],
    ) => any;
  };

export type MutationConfig<FetcherFnType extends (...args: any) => any> =
  UseMutationOptions<
    PromiseValue<ReturnType<FetcherFnType>>,
    AxiosError,
    Parameters<FetcherFnType>[0]
  >;
