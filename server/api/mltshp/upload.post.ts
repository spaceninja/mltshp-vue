import fs from 'fs';
import formidable from 'formidable';
import { getToken } from '#auth';
import { JWTWithAccessToken } from '~/types/JWTWithAccessToken';

/**
 * @see https://nuxt.com/docs/guide/concepts/server-engine
 * @see https://github.com/unjs/h3
 */
const parseMultipartNodeRequest = (req) =>
  new Promise((resolve, reject) => {
    /** @see https://github.com/node-formidable/formidable/ */
    const form = formidable();
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ ...fields, ...files });
    });
  });

export default defineEventHandler(async (event) => {
  const { path } = getQuery(event);
  if (!path) throw Error('Missing Path!');
  const token = await getToken({ event });
  if (!token) throw Error(`Missing Token for path ${path}`);
  const authString = generateMltshpAuthString(
    token as JWTWithAccessToken,
    path as string,
    'POST'
  );

  const body = await parseMultipartNodeRequest(event.node.req);
  console.log('BODY', body);

  const buffer = fs.readFileSync(body.file.filepath);
  const blob = new Blob([buffer], { type: body.file.mimetype });

  // create FormData
  const formData = new FormData();
  formData.append('file', blob, body.file.originalFilename);
  if (body.title) {
    formData.append('title', body.title);
  }
  if (body.description) {
    formData.append('description', body.description);
  }
  if (body.shake_id) {
    formData.append('shake_id', body.shake_id);
  }
  console.log('FORM DATA');
  for (const pair of formData.entries()) {
    console.log(pair);
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
