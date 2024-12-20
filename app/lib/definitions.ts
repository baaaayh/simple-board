export interface User {
    id: string;
    username: string;
    password: string;
}

export interface SessionProps {
    user: {
        name?: string;
        email?: string;
        [key: string]: string | undefined;
    } | null;
}

export interface EditorContentsType {
    postId: string | null;
    projectName: string;
    contents: string;
    writer: string | null | undefined;
    title: string;
    date: number;
}

export interface boardDataType {
    id: string;
    title: string;
    date: number;
    writer: string;
    contents: string;
}

export interface contentType {
    title: string;
    writer: string;
    date: string;
    contents: string;
}
