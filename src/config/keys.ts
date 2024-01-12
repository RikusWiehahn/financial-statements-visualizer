export let serverURL: string = "";
export let clientURL: string = "";
export const isBrowser = typeof window !== "undefined";
export const isDev =
  isBrowser && window.location.hostname === "localhost"
    ? true
    : !isBrowser && process.env.NODE_ENV === "development"
    ? true
    : false;

if (isDev) {
  clientURL = "http://localhost:3000";
} else {
  clientURL = "https://stonkvisualizer.com";
}
