export function SearchBar({ search, setSearch }) {
  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <div className="flex justify-center my-4">
      <input
        id="search-input"
        type="text"
        name="name"
        value={search}
        onChange={handleChange}
        placeholder="Procure o aluno pelo nome"
        className="w-3/5 self-center border-2 border-purple rounded-md p-1 pl-2 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
      />
    </div>
  );
}
