import AWS from 'aws-sdk'
import config from '../config'
import fs from 'fs'

AWS.config.update(config.aws.credentials)

let s3 = new AWS.S3()

function pubObjectAcl(Key) {
  let params = {
    Bucket: 'nukr-images',
    Key: Key,
    ACL: 'public-read'
  }
  return new Promise((resolve, reject) => {
    s3.putObjectAcl(params, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

function listObjects (bucket, prefix) {
  let params = {
    Bucket: bucket,
    Prefix: prefix
  }
  return new Promise((resolve, reject) => {
    s3.listObjects(params, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

function getBucketLocation (bucket) {
  let params = {
    Bucket: bucket
  }

  return new Promise((resolve, reject) => {
    s3.getBucketLocation(params, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

async () => {
  const BUCKET = 'nukr-images'
  const FOLDER = 'proxies'
  let location = await getBucketLocation(BUCKET)
  let payload = await listObjects(BUCKET, FOLDER)
  let cards = payload.Contents
  cards.shift()
  let urls = cards.map(card => {
    return `https://s3-${location.LocationConstraint}.amazonaws.com/${BUCKET}/${card.Key}`
  })
  fs.writeFileSync('./public/build/urls.json', JSON.stringify(urls), 'utf8')
}()
