import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  addImage: (image: Omit<GalleryImage, 'id'>) => void;
  removeImage: (id: string) => void;
  addCategory: (category: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

// Initial sample data
const initialImages: GalleryImage[] = [
  {
    id: "1",
    url: "/lovable-uploads/a8c93d2f-e166-43de-8f0c-d2c70cb3da24.png",
    title: "The Big Billion Days Campaign",
    category: "advertising",
    description: "Creative advertising campaign design for e-commerce platform"
  },
  {
    id: "2",
    url: "/lovable-uploads/f3a28e5c-a743-40f4-9764-1a391369cd90.png", 
    title: "Digital Art Collection",
    category: "digital-art",
    description: "Various digital art pieces showcasing different themes and styles"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&h=600&fit=crop",
    title: "Brand Identity Design",
    category: "branding",
    description: "Complete brand identity package with logo and visual elements"
  }
];

const initialCategories = ["advertising", "digital-art", "branding", "ui-design", "print-design"];

// Load data from localStorage or use initial data
const loadStoredData = () => {
  try {
    const storedImages = localStorage.getItem('portfolio-images');
    const storedCategories = localStorage.getItem('portfolio-categories');
    
    return {
      images: storedImages ? JSON.parse(storedImages) : initialImages,
      categories: storedCategories ? JSON.parse(storedCategories) : initialCategories
    };
  } catch (error) {
    console.error('Error loading stored data:', error);
    return {
      images: initialImages,
      categories: initialCategories
    };
  }
};

export function ImageProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<GalleryImage[]>(() => loadStoredData().images);
  const [categories, setCategories] = useState<string[]>(() => loadStoredData().categories);

  const addImage = (newImage: Omit<GalleryImage, 'id'>) => {
    const image: GalleryImage = {
      ...newImage,
      id: Date.now().toString(),
      description: newImage.description || "",
    };
    setImages(prev => {
      const updated = [...prev, image];
      localStorage.setItem('portfolio-images', JSON.stringify(updated));
      return updated;
    });
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const updated = prev.filter(img => img.id !== id);
      localStorage.setItem('portfolio-images', JSON.stringify(updated));
      return updated;
    });
  };

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories(prev => {
        const updated = [...prev, category];
        localStorage.setItem('portfolio-categories', JSON.stringify(updated));
        return updated;
      });
    }
  };

  return (
    <ImageContext.Provider value={{
      images,
      categories,
      addImage,
      removeImage,
      addCategory
    }}>
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