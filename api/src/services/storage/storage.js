const { Storage } = require('@google-cloud/storage')

// @TODO: figure out why it doesn't use .ENV automatically
const storage = new Storage({ keyFilename: 'gc_key.json' })
const bucketName = 'beatdrive-test-1'

// export async function getFiles() {
//   const [files] = await storage.bucket(bucketName).getFiles()
//   return files
// }

export const files = () => {
  return [
    {
      id: 1,
      title: 'Supafile',
    },
  ]
}
