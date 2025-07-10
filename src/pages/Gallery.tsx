import GalleryGrid from "@/components/Portfolio/GalleryGrid";
import { Badge } from "@/components/ui/badge";
import { useImages } from "@/contexts/ImageContext";

export default function Gallery() {
  const { images, categories, loading } = useImages();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <div className="text-xl text-muted-foreground">Loading gallery...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="mb-4">
            Portfolio Gallery
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-creative bg-clip-text text-transparent">
              Creative
            </span>{" "}
            Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore my diverse portfolio of graphic design works, from digital art to brand identities.
          </p>
          <div className="flex justify-center">
            <Badge variant="outline">{images.length} artworks</Badge>
          </div>
        </div>

        <GalleryGrid images={images} categories={categories} />
      </div>
    </div>
  );
}