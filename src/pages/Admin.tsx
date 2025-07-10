import AdminPanel from "@/components/Portfolio/AdminPanel";
import { useImages } from "@/contexts/ImageContext";

export default function Admin() {
  const { images, categories, loading, addImage, removeImage, addCategory, uploadImageFile } = useImages();

  return (
    <AdminPanel
      images={images}
      categories={categories}
      loading={loading}
      onAddImage={addImage}
      onRemoveImage={removeImage}
      onAddCategory={addCategory}
      uploadImageFile={uploadImageFile}
    />
  );
}