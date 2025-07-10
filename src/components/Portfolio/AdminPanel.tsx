import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Upload, Eye, EyeOff, Images } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  description?: string;
}

interface AdminPanelProps {
  images: GalleryImage[];
  categories: string[];
  onAddImage: (image: Omit<GalleryImage, 'id'>) => void;
  onRemoveImage: (id: string) => void;
  onAddCategory: (category: string) => void;
}

export default function AdminPanel({ images, categories, onAddImage, onRemoveImage, onAddCategory }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showImages, setShowImages] = useState(true);
  const { toast } = useToast();

  // Form states
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [newImageData, setNewImageData] = useState({
    title: "",
    category: "",
    description: ""
  });
  const [newCategory, setNewCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleLogin = () => {
    // Simple password check - in production, use proper authentication
    if (password === "admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Welcome to Admin Panel",
        description: "You can now manage your portfolio images.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleAddImages = async () => {
    if (selectedFiles.length === 0 || !newImageData.category.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select files and enter a category.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Process each selected file
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        
        // Create object URL for preview (in production, upload to cloud storage)
        const imageUrl = URL.createObjectURL(file);
        
        const imageData = {
          url: imageUrl,
          title: newImageData.title || file.name.split('.')[0],
          category: newImageData.category.trim().toLowerCase(),
          description: newImageData.description || `Image ${i + 1} from ${newImageData.category} category`
        };

        onAddImage(imageData);
      }

      // Add category if it doesn't exist
      const categoryLower = newImageData.category.trim().toLowerCase();
      if (!categories.includes(categoryLower)) {
        onAddCategory(categoryLower);
      }

      // Reset form
      setSelectedFiles([]);
      setNewImageData({ title: "", category: "", description: "" });
      
      toast({
        title: "Images Added Successfully",
        description: `${selectedFiles.length} image(s) added to your portfolio.`,
      });
    } catch (error) {
      toast({
        title: "Upload Failed", 
        description: "Something went wrong while uploading images.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (id: string) => {
    onRemoveImage(id);
    toast({
      title: "Image Removed",
      description: "Image has been removed from your portfolio.",
    });
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    onAddCategory(newCategory.trim().toLowerCase());
    setNewCategory("");
    toast({
      title: "Category Added",
      description: "New category has been created.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <Card className="w-full max-w-md shadow-elegant">
          <CardHeader>
            <CardTitle className="text-center text-2xl bg-gradient-creative bg-clip-text text-transparent">
              Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter admin password"
                className="mt-2"
              />
            </div>
            <Button onClick={handleLogin} className="w-full" variant="creative">
              Login
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Demo password: admin123
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-creative bg-clip-text text-transparent">
          Portfolio Admin Panel
        </h1>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {images.length} images
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Add New Images */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Plus className="w-6 h-6" />
            Add Multiple Images from PC
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload */}
          <div>
            <Label htmlFor="imageFiles" className="text-base font-medium">
              Select Images from PC *
            </Label>
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
              <input
                id="imageFiles"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <label
                htmlFor="imageFiles"
                className="cursor-pointer flex flex-col items-center gap-4"
              >
                <Images className="w-12 h-12 text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">Click to select images</p>
                  <p className="text-sm text-muted-foreground">
                    Select multiple images at once (PNG, JPG, GIF)
                  </p>
                </div>
              </label>
            </div>
            
            {selectedFiles.length > 0 && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-medium mb-2">Selected {selectedFiles.length} file(s):</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="text-sm p-2 bg-background rounded border truncate">
                      {file.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Category Input */}
          <div>
            <Label htmlFor="imageCategory" className="text-base font-medium">
              Category * (all selected images will go here)
            </Label>
            <Input
              id="imageCategory"
              value={newImageData.category}
              onChange={(e) => setNewImageData(prev => ({ ...prev, category: e.target.value }))}
              placeholder="e.g., branding, digital-art, logo-design"
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Enter a category name (will create if doesn't exist)
            </p>
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="imageTitle" className="text-base font-medium">
                Title Template (optional)
              </Label>
              <Input
                id="imageTitle"
                value={newImageData.title}
                onChange={(e) => setNewImageData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Leave empty to use filename"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="imageDescription" className="text-base font-medium">
                Description Template (optional)
              </Label>
              <Textarea
                id="imageDescription"
                value={newImageData.description}
                onChange={(e) => setNewImageData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Leave empty for auto description"
                className="mt-2 h-24"
              />
            </div>
          </div>

          <Button 
            onClick={handleAddImages} 
            variant="creative" 
            size="lg"
            disabled={isUploading || selectedFiles.length === 0}
            className="w-full"
          >
            <Upload className="w-5 h-5 mr-2" />
            {isUploading ? "Uploading..." : `Upload ${selectedFiles.length} Image(s)`}
          </Button>
        </CardContent>
      </Card>

      {/* Manage Categories */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>Manage Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            />
            <Button onClick={handleAddCategory} variant="outline">
              Add Category
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category} variant="secondary" className="text-sm px-3 py-1">
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Manage Images */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Manage Images
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowImages(!showImages)}
            >
              {showImages ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showImages ? 'Hide' : 'Show'} Images
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showImages && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square rounded-xl overflow-hidden bg-muted shadow-hover">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveImage(image.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="font-medium text-sm truncate">{image.title}</h3>
                    <Badge variant="outline" className="text-xs mt-1">
                      {image.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}