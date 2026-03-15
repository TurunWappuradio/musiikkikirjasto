require('dotenv').config(); // Need to manually load env file

const fs = require('fs');
const path = require('path');
const NodeID3 = require('node-id3');

const fetch = require('node-fetch');

// Make sure to set your lambda URL here or through environment variables
const LAMBDA_URL =
  process.env.REACT_APP_MUSIC_LAMBDA_URL || 'YOUR_LAMBDA_ENDPOINT';

const UPLOAD_COUNT = 500;
const UPLOAD_DATA_DIR = path.join(__dirname, 'src', 'test_dev_data');
const BASE_FILE_NAME = 'ai_generated_test_bop.mp3';

// Delay function to prevent overwhelming the server
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const loopDelay = 10; // Short delay for LOCAL testing, increase if you encounter rate limits in production

const uploadSingleTrack = async (buffer, index) => {
  // 1. Get Presigned S3 Link
  const linkRes = await fetch(LAMBDA_URL, {
    method: 'POST',
    body: JSON.stringify({ operation: 'get-upload-link', file_ext: 'mp3' }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!linkRes.ok) throw new Error(`Failed to get link for index ${index}`);
  const { uploadURL, filename } = await linkRes.json();

  // 2. Put file to S3
  await fetch(uploadURL, {
    method: 'PUT',
    body: buffer,
  });

  // 3. Validate Song (reads ID3 tags via lambda)
  const validateRes = await fetch(LAMBDA_URL, {
    method: 'POST',
    body: JSON.stringify({ operation: 'validate-song', filename }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!validateRes.ok) throw new Error(`Validation failed for index ${index}`);

  return filename;
};

const submitBatch = async (filenames) => {
  const res = await fetch(LAMBDA_URL, {
    method: 'POST',
    body: JSON.stringify({
      operation: 'submit-songs',
      filenames,
      ripper_name: 'Test Generator',
      ripper_email: 'test@example.com',
      music_source: 'Other',
      source_description: 'Test Generation Tool',
      message: 'Generated Test Data',
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) throw new Error('Submission failed');
  return res.json();
};

const run = async () => {
  if (!LAMBDA_URL || LAMBDA_URL === 'YOUR_LAMBDA_ENDPOINT') {
    console.error(
      'Please set process.env.REACT_APP_MUSIC_LAMBDA_URL before running.'
    );
    process.exit(1);
  }

  const filePath = path.join(UPLOAD_DATA_DIR, BASE_FILE_NAME);
  const baseBuffer = fs.readFileSync(filePath);

  console.log(`Starting generation of ${UPLOAD_COUNT} tracks...`);

  for (let i = 1; i <= UPLOAD_COUNT; i++) {
    try {
      // Modify the ID3 Title tag so the backend picks up the incremented name "Song X"
      const tags = {
        title: `Song ${i}`,
        artist: 'Google Gemini 3.1',
        album: 'Test Album',
      };

      const modifiedBuffer = NodeID3.update(tags, baseBuffer);

      console.log(`[${i}/${UPLOAD_COUNT}] Uploading "Song ${i}"...`);
      const filename = await uploadSingleTrack(modifiedBuffer, i);

      await submitBatch([filename]);
      console.log(`[${i}/${UPLOAD_COUNT}] Successfully submitted "Song ${i}".`);

      await delay(loopDelay);
    } catch (err) {
      console.error(`Error on index ${i}:`, err);
    }
  }

  console.log('Finished uploading test data!');
};

run();
