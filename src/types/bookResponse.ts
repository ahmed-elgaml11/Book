export type Book = {
    id: string;
    author: string;
    name: string
    year: number
    pages?: number | null;
    language: 'arabic' | 'english' | 'french';
};

export interface bookResponse {
    status: string,
    data?:{
        books?: Book[]
        book?: Book    
    }
}