export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='text-center p-4'>
      <p>
        &copy; {year} Lab 3 - Fatimah Binti Yasin, Joshua Stephens & Benjamin
        Lefebvre
      </p>
    </footer>
  );
}
