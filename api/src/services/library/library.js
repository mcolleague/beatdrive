const { Storage } = require('@google-cloud/storage')

const bucketName = 'beatdrive-test-1'
const storage = new Storage()
// const storage = new Storage({keyFilename: 'key.json'})

async function listFiles() {
  // Lists files in the bucket
  const [files] = await storage.bucket(bucketName).getFiles()

  console.log('Files:')
  files.forEach((file) => {
    console.log(file.name)
  })
}

listFiles().catch(console.error)
