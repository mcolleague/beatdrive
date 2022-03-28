const { Storage } = require('@google-cloud/storage')

// @TODO: figure out why it doesn't use .ENV automatically
const storage = new Storage({ keyFilename: 'gc_key.json' })
const bucketName = 'beatdrive-test-1'

export const files = async () => {
  const [files] = await storage.bucket(bucketName).getFiles()
  const filesMapped = files.map(({ metadata: { id, name, mediaLink } }) => {
    return {
      id,
      name,
      mediaLink,
    }
  })

  return filesMapped
}
