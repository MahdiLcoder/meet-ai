"server only"

import { StreamClient } from "@stream-io/node-sdk";
// or
// const { StreamClient } = require("@stream-io/node-sdk");

const apiKey = process.env.NEXT_STREAM_VIDEO_API_KEY!;
const secret = process.env.NEXT_STREAM_VIDEO_SECRET_KEY!;

export const streamVideo = new StreamClient(apiKey, secret);

// optionally add timeout to API requests
// the default timeout is 3000ms
