export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='text-center p-4'>
      <p>&copy; {year} Lab 2 - Benjamin Lefebvre</p>
    </footer>
  );
}
