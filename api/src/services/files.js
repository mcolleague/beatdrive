const { Storage } = require('@google-cloud/storage')

// @TODO: figure out why it doesn't use .ENV automatically
const storage = new Storage({ keyFilename: 'gc_key.json' })
const bucketName = 'beatdrive-test-1'

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
