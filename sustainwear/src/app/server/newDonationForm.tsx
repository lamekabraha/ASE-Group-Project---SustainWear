'use Server';

export async function CreateDonation(
    previousState: string,
    formData: FormData
){
    await new Promise((resolve)) => setTimeout(resolve, 2000);

    const category = formData.get('category');
    const size = formData.get('size');
    const gender = formData.get('gender');
    const condition = formData.get('condition');
    const description = formData.get('description');
    const image = formData.get('image');

    return {
        category,
        size,
        gender,
        condition,
        description,
        image,
        previousState
    
    }
}