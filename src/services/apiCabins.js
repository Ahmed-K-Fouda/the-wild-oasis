import supabase, { supabaseUrl } from "./supabase";

async function handleSupabaseError(operation, error) {
  console.error(`Error during ${operation}:`, error);
  throw new Error(`${operation} failed`);
}

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    handleSupabaseError("loading cabins", error);
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = hasImagePath
    ? newCabin.image
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    const { image, ...updatedCabin } = newCabin;
    query = query.update({ ...updatedCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();
  if (error) {
    handleSupabaseError(id ? "updating cabin" : "creating cabin", error);
  }

  if (hasImagePath) return data;

  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);
    if (storageError) {
      if (!id) {
        await supabase.from("cabins").delete().eq("id", data.id);
      }
      handleSupabaseError("uploading cabin image", storageError);
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    handleSupabaseError("deleting cabin", error);
  }
  return data;
}
