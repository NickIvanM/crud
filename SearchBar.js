function SearchBar({ setSearchTerm }) {
  return (
    <input
      placeholder="Search..."
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;
