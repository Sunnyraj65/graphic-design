import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  description?: string;
}

export function useSupabaseImages() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch images from Supabase
  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast({
        title: "Error",
        description: "Failed to load images from database",
        variant: "destructive",
      });
    }
  };

  // Fetch categories from Supabase
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_categories')
        .select('name')
        .order('name');

      if (error) throw error;

      setCategories(data?.map(cat => cat.name) || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error",
        description: "Failed to load categories from database",
        variant: "destructive",
      });
    }
  };

  // Add image to Supabase
  const addImage = async (newImage: Omit<GalleryImage, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('portfolio_images')
        .insert([{
          url: newImage.url,
          title: newImage.title,
          category: newImage.category,
          description: newImage.description || null,
        }])
        .select()
        .single();

      if (error) throw error;

      setImages(prev => [data, ...prev]);
      
      toast({
        title: "Success",
        description: "Image added successfully",
      });

      return data;
    } catch (error) {
      console.error('Error adding image:', error);
      toast({
        title: "Error",
        description: "Failed to add image to database",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Remove image from Supabase
  const removeImage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('portfolio_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setImages(prev => prev.filter(img => img.id !== id));
      
      toast({
        title: "Success",
        description: "Image removed successfully",
      });
    } catch (error) {
      console.error('Error removing image:', error);
      toast({
        title: "Error",
        description: "Failed to remove image from database",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Add category to Supabase
  const addCategory = async (categoryName: string) => {
    try {
      // Check if category already exists
      if (categories.includes(categoryName)) {
        return;
      }

      const { error } = await supabase
        .from('portfolio_categories')
        .insert([{ name: categoryName }]);

      if (error) throw error;

      setCategories(prev => [...prev, categoryName].sort());
      
      toast({
        title: "Success",
        description: "Category added successfully",
      });
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        title: "Error",
        description: "Failed to add category to database",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Upload image file to Supabase Storage
  const uploadImageFile = async (file: File): Promise<string> => {
    try {
      // Check if file is valid
      if (!file || file.size === 0) {
        throw new Error('Invalid file');
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size too large (max 10MB)');
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `portfolio/${fileName}`;

      console.log('Uploading file:', fileName, 'Size:', file.size, 'Type:', file.type);

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      console.log('Upload successful, URL:', data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      
      let errorMessage = "Failed to upload image file";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchImages(), fetchCategories()]);
      setLoading(false);
    };

    loadData();
  }, []);

  // Set up real-time subscriptions
  useEffect(() => {
    const imagesSubscription = supabase
      .channel('portfolio_images_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'portfolio_images' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setImages(prev => [payload.new as GalleryImage, ...prev]);
          } else if (payload.eventType === 'DELETE') {
            setImages(prev => prev.filter(img => img.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setImages(prev => prev.map(img => 
              img.id === payload.new.id ? payload.new as GalleryImage : img
            ));
          }
        }
      )
      .subscribe();

    const categoriesSubscription = supabase
      .channel('portfolio_categories_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'portfolio_categories' },
        () => {
          fetchCategories();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(imagesSubscription);
      supabase.removeChannel(categoriesSubscription);
    };
  }, []);

  return {
    images,
    categories,
    loading,
    addImage,
    removeImage,
    addCategory,
    uploadImageFile,
    refetch: () => Promise.all([fetchImages(), fetchCategories()]),
  };
}