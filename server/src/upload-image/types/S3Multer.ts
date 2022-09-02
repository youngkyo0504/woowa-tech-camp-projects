export interface S3MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  contentDisposition: null | string;
  contentEncoding: null | string;
  storageClass: string;
  serverSideEncryption: null | string;
  metadata: null;
  location: string;
  etag: string;
}
