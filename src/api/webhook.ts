interface SegmentData {
  segment_name: string;
  schema: Array<{ [key: string]: string }>;
}

export const saveSegment = async ({ segment_name, schema }: SegmentData) => {
  await fetch(import.meta.env.VITE_WEBHOOK_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      segment_name,
      schema,
    }),
  });

  //set no-cors , so checking status and response is useless,
};
