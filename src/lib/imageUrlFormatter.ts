export default function imageUrlFormatter(imagePath: string) {
  return `${process.env.NEXT_PUBLIC_FIREBASESTORAGE_URL}/${encodeURIComponent(
    imagePath
  )}?alt=media`;
}
