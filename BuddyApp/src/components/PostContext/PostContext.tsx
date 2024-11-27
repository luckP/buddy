import React, { createContext, useState, useContext, ReactNode } from 'react';

type Post = {
    id: string;
    username: string;
    content: string;
    userImage: string;
    postImage: string | null;
};

type PostContextType = {
    posts: Post[];
    addPost: (newPost: Post) => void;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
    const [posts, setPosts] = useState<Post[]>([]);

    const addPost = (newPost: Post) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    return (
        <PostContext.Provider value={{ posts, addPost }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePostContext = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePostContext must be used within a PostProvider');
    }
    return context;
};
