import { Request, Response } from "express";
import crypto from "crypto";
import { config } from "../config";

export function verifyRequestSignature(req: Request, res: Response, buf: Buffer) {
  var signature = req.headers["x-hub-signature"] as string;

  if (!signature) {
    // For testing, let's log an error. In production, you should throw an 
    // error.
    console.error("Couldn't validate the signature.");
  } else {
    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', config.appSecret)
                        .update(buf)
                        .digest('hex');

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}