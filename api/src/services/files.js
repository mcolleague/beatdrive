const bucketName = 'beatdrive-test-1'
const { Storage } = require('@google-cloud/storage')
const storage = new Storage({
  projectId: 'beatdrive',
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
})

export const getSignedUrl = async (fileName) => {
  // These options will allow temporary read access to the file
  const options = {
    version: 'v4',
    action: 'read',
    expires: Date.now() + 15 * 60 * 10000, // 15 minutes
  }

  // Get a v4 signed URL for reading the file
  const [url] = await storage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl(options)

  return url
}

export const files = async () => {
  const [files] = await storage.bucket(bucketName).getFiles()
  const filesMapped = files.map(({ metadata: { id, name, mediaLink } }) => {
    return {
      id,
      name,
      mediaLink,
      url: getSignedUrl(name),
    }
  })

  return filesMapped
}
