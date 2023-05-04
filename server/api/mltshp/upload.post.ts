import fs from 'fs';
import formidable from 'formidable';
import { IncomingMessage } from 'http';
import { getToken } from '#auth';
import { JWTWithAccessToken } from '~/types/JWTWithAccessToken';

interface UploadFormFile {
  filepath: string;
  mimetype: string;
  originalFilename: string;
}

interface UploadFormData {
  title?: string;
  description?: string;
  shake_id?: string;
  file: UploadFormFile;
}

/**
 * Parse Multipart Node Request
 * Takes an incoming multipart form request and passes it to formidible to parse.
 *
 * @see https://github.com/node-formidable/formidable/
 */
const parseMultipartNodeRequest = (req: IncomingMessage) =>
  new Promise((resolve, reject) => {
    const form = formidable();
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ ...fields, ...files });
    });
  });

/**
 * Upload to MLTSHP
 * Takes the multipart form data from the client and re-encodes it as
 * formdata to submit to the API.
 *
 * @see https://stackoverflow.com/q/75349702/363013
 * @see https://www.freecodecamp.org/news/handle-file-uploads-on-the-backend-in-node-js-nuxt/
 */
export default defineEventHandler(async (event) => {
  const { path } = getQuery(event);
  if (!path) throw Error('Missing Path!');
  const token = await getToken({ event });
  if (!token) throw Error(`Missing Token for path ${path}`);
  const body = (await parseMultipartNodeRequest(
    event.node.req
  )) as UploadFormData;
  if (!body) throw Error(`Unabled to parse form data`);
  const authString = generateMltshpAuthString(
    token as JWTWithAccessToken,
    path as string,
    'POST'
  );
  const formData = new FormData();
  if (body.title) formData.append('title', body.title);
  if (body.description) formData.append('description', body.description);
  if (body.shake_id) formData.append('shake_id', body.shake_id);
  if (body.file) {
    const buffer = fs.readFileSync(body.file.filepath);
    const blob = new Blob([buffer], { type: body.file.mimetype });
    formData.append('file', blob, body.file.originalFilename);
  }
  return fetch(`https://mltshp.com${path}`, {
    method: 'POST',
    headers: {
      Authorization: authString,
    },
    body: formData,
  }).then(async (response) => {
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    }
    return response.json();
  });
});
