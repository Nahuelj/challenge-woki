interface EnvObject {
  api_url?: string;
  api_key?: string;
  image_url_base?: string;
}
export const env: EnvObject = {
  api_url: process.env.NEXT_PUBLIC_API_URL,
  api_key: process.env.NEXT_PUBLIC_API_KEY,
  image_url_base: process.env.URL_IMG_BASE,
};
