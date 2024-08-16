import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin) {
  // 1. create a cabin

  // https://jdiuygwedngugfqgngeq.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // generate image name , path

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("cabins could not be craeted");
  }
  // 2. upload image

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. delete a cabin if there was an error uploading image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(error);
    throw new Error(
      "cabins image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabins could not be deleted");
  }

  return data;
}
