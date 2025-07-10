import AdminPanel from "@/components/Portfolio/AdminPanel";
import { useImages } from "@/contexts/ImageContext";

export default function Admin() {
  const { images, categories, addImage, removeImage, addCategory } = useImages();

  return (
    <AdminPanel
      images={images}
      categories={categories}
      onAddImage={addImage}
      onRemoveImage={removeImage}
      onAddCategory={addCategory}
    />
  );
}