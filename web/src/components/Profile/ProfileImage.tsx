import { toast } from "@redwoodjs/web/dist/toast";
import { useState } from "react"
import { supabase } from "src/lib/supabase";

export function ProfileImage({image, onSave}: {image: string, onSave: (image: string) => void}) {
  const [imageSrc, setImageSrc] = useState(image);
  const [imageFile, setImageFile] = useState<File>();
  const [loading, setLoading] = useState(false);

  const bucketUrl = 'https://orzynjfzqvaqslllunuk.supabase.co/storage/v1/object/public/user-images/'

  function handleChange(e) {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setImageFile(e.target.files[0])
    setImageSrc(imageUrl);
  }

  async function save() {
    setLoading(true);
    const {data, error} = await supabase.storage
      .from('user-images')
      .upload(imageFile.name, imageFile, {cacheControl: '3600', upsert: true})

    if(!error) {
      onSave(`${bucketUrl}${data.path}`)
    }
    else toast.error(error.message);

    setLoading(false);
  }

  return <div className="flex flex-col gap-2">
    <img src={imageSrc} alt="Profile Image" className="w-96" />
    <input type="file" accept="image/*" onChange={e => handleChange(e)} />

    <button disabled={loading} onClick={e => save()} className="btn">
      {loading ? 'Saving...' : 'Save'}
    </button>
  </div>
}