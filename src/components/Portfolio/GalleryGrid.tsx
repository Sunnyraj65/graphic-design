import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  description?: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  categories?: string[];
}

export default function GalleryGrid({ images, categories = [] }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages = useMemo(() => {
    if (selectedCategory === "all") return images;
    return images.filter(img => img.category === selectedCategory);
  }, [images, selectedCategory]);

  const allCategories = ["all", ...categories];

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    const newIndex = direction === "next" 
      ? (currentImageIndex + 1) % filteredImages.length
      : currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {allCategories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "creative" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="group relative aspect-square overflow-hidden rounded-xl bg-muted cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-hover"
            onClick={() => openLightbox(image, index)}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-sm mb-1 truncate">
                  {image.title}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {image.category}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/20 text-white hover:bg-black/40"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 text-white hover:bg-black/40"
              onClick={() => navigateImage("prev")}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 text-white hover:bg-black/40"
              onClick={() => navigateImage("next")}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-full object-contain rounded-lg"
            />
            
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 rounded-lg p-4">
              <h2 className="text-white text-xl font-bold mb-2">{selectedImage.title}</h2>
              {selectedImage.description && (
                <p className="text-gray-300 text-sm mb-2">{selectedImage.description}</p>
              )}
              <Badge variant="secondary">{selectedImage.category}</Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}