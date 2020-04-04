// Tell TypeScript that importing .jpgs with file-loader is OK and those have default export
declare module "*.jpg" {
  const content: string
  export default content
}
