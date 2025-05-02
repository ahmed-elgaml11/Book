import { Prisma } from "../../generated/prisma";

export type BookFeatures = {
  where?: Prisma.BookWhereInput;
  orderBy?: Prisma.BookOrderByWithRelationInput[];
  skip?: number;
  take?: number;
  cursor?: Prisma.BookWhereUniqueInput;
  distinct?: Prisma.BookScalarFieldEnum[];
  select?: Prisma.BookSelect;
};


export type QueryParams = {
    search?: string;
    page?: string;
    limit?: string;
    sort?: string
    offset?: string
    select?: string
}; 