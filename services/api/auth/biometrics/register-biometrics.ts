import { REGISTER_FACE } from '@/constants/api'
import { authFetch } from '../../auth-fetch'

// TODO: make separate interface fo this sheet
interface RegisterFaceResponse {
    success: boolean
    message?: string
}

export async function registerFaceEncoding(
    imageUris: string[],
): Promise<RegisterFaceResponse> {
    try {
        if (imageUris.length < 5) {
            return {
                success: false,
                message: 'At least 5 images required for registration',
            }
        }

        if (imageUris.length > 5) {
            return {
                success: false,
                message: 'Maximum 5 images allowed',
            }
        }

        const formData = new FormData()

        // Add all images to FormData with key "images"
        for (let i = 0; i < imageUris.length; i++) {
            const imageUri = imageUris[i]
            const fileExtension = imageUri.split('.').pop() || 'jpg'
            const mimeType = `image/${fileExtension}`

            formData.append('images', {
                uri: imageUri,
                type: mimeType,
                name: `face_${i + 1}.${fileExtension}`,
            } as any)
        }

        console.log(
            `Uploading ${imageUris.length} images for face registration`,
        )

        const uploadResponse = await authFetch(REGISTER_FACE, {
            method: 'POST',
            body: formData,
        })

        const result = await uploadResponse.text()

        if (uploadResponse.ok) {
            return { success: true, message: result }
        } else {
            return { success: false, message: result || 'Registration failed' }
        }
    } catch (error) {
        console.error('Image upload error:', error)
        return { success: false, message: 'Network error. Check connection.' }
    }
}
