export type Book = {
    id: string;
    author: string;
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