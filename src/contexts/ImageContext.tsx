import React, { createContext, useContext, ReactNode } from 'react';
import { useSupabaseImages } from '@/hooks/useSupabaseImages';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  description?: string;
}

interface ImageContextType {
  images: GalleryImage[];
  categories: string[];
  loading: boolean;
  addImage: (image: Omit<GalleryImage, 'id'>) => void;
  removeImage: (id: string) => void;
  addCategory: (category: string) => void;
  uploadImageFile: (file: File) => Promise<string>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
  const supabaseHook = useSupabaseImages();

  return (
    <ImageContext.Provider value={supabaseHook}>
      {children}
    </ImageContext.Provider>
  );
}

export function useImages() {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
}