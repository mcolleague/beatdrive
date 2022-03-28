const { Storage } = require('@google-cloud/storage')

// @TODO: figure out why it doesn't use .ENV automatically
const storage = new Storage({ keyFilename: 'gc_key.json' })
const bucketName = 'beatdrive-test-1'

export async function files() {
  const [files] = await storage.bucket(bucketName).getFiles()
  const filesMapped = files.map(({ metadata: { name, mediaLink } }) => {
    return {
      name,
      mediaLink,
    }
  })

  return filesMapped
}
