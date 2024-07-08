export const fileUpload = async (file) => {
    if (!file) return null
    const cloudUrl = "https://api.cloudinary.com/v1_1/daniray/upload"
    const formData = new FormData()
    formData.append("upload_preset", "react-journal")
    formData.append("file", file)

    try {
        const response = await fetch(cloudUrl, {
            method: "POST",
            body: formData
        })
        console.log(response)
        if (!response.ok) throw new Error("Error uploading file")
        const cloudResp = await response.json()
        console.log(cloudResp)
        return cloudResp.secure_url
    } catch (error) {
        return null
    }
} 