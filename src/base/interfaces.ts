export interface IBaseFilter {
  query?: string;
  searchTerm?: string | string[];
  page?: number;
  limit?: number;
  isActive?: boolean;
  user?: IdType;
  sortBy?: string;
}

export interface IUser extends IBaseEntity {
  roles: [
    IBaseEntity & {
      isAlreadyAdded: boolean;
      id: IdType;
      title: string;
      createdById: IdType;
      updatedById: IdType;
    },
  ];
  id: IdType;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;

  email: string;
  createdById: IdType;
  updatedById: IdType;
  note: string;
}

export interface IMetaResponse {
  total: number;
  page: number;
  limit: number;
  skip: number;
}
export interface IBaseResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  errorMessages: string[];
  meta: IMetaResponse;
  data: T;
}

export interface IBaseEntity {
  id: IdType;
  isActive: boolean;
  organization: string;
  createdBy: IUser;
  updatedBy: IUser;
  deletedBy: any;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string;
}

export type IdType = string | number;

export interface IBaseService<
  Entity = any,
  FilterOptions = any,
  CreatePayload = any,
  UpdatePayload = CreatePayload,
> {
  END_POINT: string;
  find(options: FilterOptions): Promise<IBaseResponse<Entity[]>>;
  findById(id: IdType): Promise<IBaseResponse<Entity>>;
  create(payload: CreatePayload): Promise<IBaseResponse<Entity>>;
  update(payload: {
    id: IdType;
    data: Partial<UpdatePayload>;
  }): Promise<IBaseResponse<Entity>>;
  delete(id: IdType): Promise<IBaseResponse<Entity>>;
}
