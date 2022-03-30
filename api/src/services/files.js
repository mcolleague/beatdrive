const fetch = require('node-fetch')
const xml2js = require('xml2js')

const { Storage } = require('@google-cloud/storage')
const storage = new Storage({
  projectId: 'beatdrive',
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
})
const bucketName = 'beatdrive-test-1'
const bucket = storage.bucket(bucketName)

export const getSignedUrl = async (fileName) => {
  // These options will allow temporary read access to the file
  const options = {
    version: 'v4',
    action: 'read',
    expires: Date.now() + 15 * 60 * 10000, // 15 minutes
  }

  // Get a v4 signed URL for reading the file
  const [url] = await bucket.file(fileName).getSignedUrl(options)

  return url
}

// Get all audio files
export const files = async () => {
  const [files] = await bucket.getFiles()
  const filesProcessed = files
    .filter(({ metadata: { contentType } }) => contentType.includes('audio/'))
    .map(({ id, name }) => {
      return {
        id,
        name,
        url: getSignedUrl(name),
      }
    })

  return filesProcessed
}

// Library XML
export const itunesLibraryXMLFile = async () => {
  const file = bucket.file('iTunes Library.xml')
  const { id, name } = file
  const url = await getSignedUrl(name)

  const response = await fetch(url)
  const xml = await response.text()
  // const parser = new xml2js.Parser()
  // const parsed = await parser.parseStringPromise(xml, { mergeAttrs: true })

  return {
    id,
    name,
    url,
    data: xml,
  }
}
